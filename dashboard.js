const grafana = require('grafana-dash-gen');

const { Dashboard } = grafana;

function createDashboard(opts) {
  const dashboard = new Dashboard(opts);
  return dashboard;
}

module.exports = {
  createDashboard,
};
