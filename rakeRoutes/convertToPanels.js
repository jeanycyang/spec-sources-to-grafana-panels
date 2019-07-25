const grafana = require('grafana-dash-gen');

const { Row } = grafana;

const { createDashboard } = require('../common/dashboard');
const { PANEL_TYPES } = require('../common/panelTypes');

function convertToPanels({
  dashboard: dashboardOpt,
  datasource,
  groups,
  row: rowOpt = { editable: true, collapse: true },
  panelModels,
}) {
  const dashboard = createDashboard(dashboardOpt);
  Object.entries(groups).forEach(([groupName, routes]) => {
    const row = new Row({
      title: groupName,
      ...rowOpt,
    });
    panelModels.forEach((panelModel) => {
      const targets = routes.map(route => panelModel.target(route));
      const PanelType = PANEL_TYPES[panelModel.type];
      if (!PanelType) throw Error('unsupported panel type!');
      const panel = new PanelType(panelModel.panel({
        datasource,
        dashboard: dashboardOpt,
        groupName,
        targets,
      }));
      row.addPanel(panel);
    });
    dashboard.addRow(row);
  });
  return dashboard.generate();
}

module.exports = {
  default: convertToPanels,
  convertToPanels,
};
