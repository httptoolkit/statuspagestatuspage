export const SERVICES = {
  'aws': {
    detectorId: '10147',
    statusPage: {
      url: "https://status.aws.amazon.com/",
      errorSelectors: [
        "[style*='background-color:#FFCD99']", // Error box at the top
        "#current_events_block img[src*='status3.gif']" // Disruption
      ],
      warningSelectors: [
        "#current_events_block img[src*='status1.gif']", // Info/minor issue
        "#current_events_block img[src*='status2.gif']" // Degradation
      ]
    }
  },
  'github': {
    detectorId: '10004',
    statusPage: {
      url: "https://www.githubstatus.com/",
      errorSelectors: [
        ".components-container .fa-exclamation-triangle", // Partial outage
        ".components-container .fa-times" // Major outage
      ],
      warningSelectors: [
        ".unresolved-incidents .incident-title", // Ongoing incident
        ".components-container .fa-minus-square", // Degraded performance
      ]
    }
  },
  'slack': {
    detectorId: '35437',
    statusPage: {
      url: "https://status.slack.com/",
      errorSelectors: [
        "#services [src*=TableOutage]",
        "#services [src*=TableIncident]"
      ],
      warningSelectors: [
        "#services [src*=TableMaintenance]",
        "#services [src*=TableNotice]",
      ]
    }
  }
};

export type ServiceKey = keyof typeof SERVICES;
export type Service = typeof SERVICES[ServiceKey];