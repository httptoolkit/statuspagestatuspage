export const SERVICES = {
    'aws': {
      detectorId: '10147',
      statusPage: {
        url: "https://status.aws.amazon.com/",
        errorSelectors: [
          "[style*='background-color:#FFCD99']", // Error box at the top
          "#current_events_block img[src*='status1.gif']", // Info/minor issue
          "#current_events_block img[src*='status2.gif']", // Degradation
          "#current_events_block img[src*='status3.gif']" // Disruption
        ]
      }
    }
} as const;

export type ServiceKey = keyof typeof SERVICES;
export type Service = typeof SERVICES[ServiceKey];