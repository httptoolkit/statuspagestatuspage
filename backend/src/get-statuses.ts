import { SERVICES } from './services';

declare const STATUS_KV: any; // API to access our KV store

export async function getServiceStatus(): Promise<Response> {
  const serviceStatusData = await Promise.all(Object.keys(SERVICES).map((service) => {
    return STATUS_KV.get(service);
  }));

  const serviceStatuses = serviceStatusData.map((statusData) => JSON.parse(statusData));

  const serviceStatusIndex = Object.keys(SERVICES).reduce((result, key, index) => ({
    ...result,
    [key]: serviceStatuses[index]
  }), {});

  return new Response(JSON.stringify(serviceStatusIndex), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60, stale-while-revalidate=60'
    }
  });
}