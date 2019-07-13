export class Dashboard {
  constructor({
    users = [],
    statistics = []
  } = {}) {
    this.users = users;
    this.statistics = statistics;
  }
}

export function createDashboard(data) {
  return Object.freeze(new Dashboard(data));
}
