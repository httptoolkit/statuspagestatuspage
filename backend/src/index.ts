import { checkServiceStatuses } from './check-status';
import { getServiceStatus as getServiceStatuses } from './get-statuses';

addEventListener('scheduled', () => {
  checkServiceStatuses();
});

addEventListener('fetch', (event: any) => {
  event.respondWith(getServiceStatuses());
});