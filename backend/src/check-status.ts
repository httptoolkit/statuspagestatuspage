import { Parser } from "htmlparser2";
import { DomHandler } from "domhandler";
import * as CSSselect from "css-select";

import { SERVICES, ServiceKey, Service } from './services';

declare const DD_API_KEY: string; // Injected by CF Workers
declare const STATUS_KV: any; // API to access our KV store

async function checkDetectedStatus(service: Service) {
  const statusResponse = await fetch(`https://downdetectorapi.com/v2/companies/${service.detectorId}/status`, {
    headers: {
      "authorization": `Bearer ${DD_API_KEY}`
    }
  });

  const overallStatus = await statusResponse.json();

  if (overallStatus === 'success') {
    return { status: 'ok' };
  } else if (overallStatus === 'warning') {
    return { status: 'warning', message: `Status is ${overallStatus}` }
  } else {
    return { status: 'error', message: `Status is ${overallStatus}` }
  }
}

function parsePage(content: string) {
  return new Promise((resolve, reject) => {
    const domHandler = new DomHandler((error, dom) => {
      if (error) reject(error);
      else resolve(dom);
    });

    const parser = new Parser(domHandler);
    parser.write(content);
    parser.end();
  });
}

async function checkOfficialStatus(service: Service) {
  const statusResponse = await fetch(service.statusPage.url);

  if (!statusResponse.ok) throw new Error(`Request to ${service.statusPage.url} failed with ${statusResponse.status}`);

  const statusPageContent = await statusResponse.text();
  const pageDom = await parsePage(statusPageContent);

  const matchingErrorSelectors = service.statusPage.errorSelectors.filter((selector) => {
    return !!CSSselect.selectOne(selector, pageDom);
  });

  const matchingWarningSelectors = service.statusPage.warningSelectors.filter((selector) => {
    return !!CSSselect.selectOne(selector, pageDom);
  });

  if (matchingErrorSelectors.length > 0) {
    return {
      status: 'error',
      message: `Matched selectors: ${matchingErrorSelectors.join(', ')}`
    };
  } else if (matchingWarningSelectors.length > 0) {
    return {
      status: 'warning',
      message: `Matched selectors: ${matchingWarningSelectors.join(', ')}`
    };
  } else {
    return { status: 'ok' };
  }
}

async function checkServiceStatus(serviceId: ServiceKey) {
  const service = SERVICES[serviceId];

  const [official, detected] = await Promise.all([
    checkOfficialStatus(service),
    checkDetectedStatus(service)
  ]);

  await STATUS_KV.put(serviceId, JSON.stringify({
    statusPage: service.statusPage.url,
    official,
    detected,
    lastUpdate: Date.now()
  }));

  console.log(`Updated status for ${serviceId}:`, { official, detected });
}

export async function checkServiceStatuses() {
  console.log("Updating statuses...");
  const serviceIds = Object.keys(SERVICES) as Array<ServiceKey>;
  await Promise.all(serviceIds.map((serviceId) => checkServiceStatus(serviceId)));
  console.log("Statuses updated");
}