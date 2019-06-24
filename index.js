const grafana = require('grafana-dash-gen');
const swagger = require('./swagger.example');
const apis = swagger();

const Row = grafana.Row;
const Dashboard = grafana.Dashboard;
const Graph = grafana.Panels.Graph;

const dashboard = new Dashboard({
	title: 'My Dashboard'
});

const rows = {};

const BASE_PATH = apis.basePath;

const paths = apis.paths;

Object.entries(paths).forEach(([path, methods]) => {
  Object.entries(methods).forEach(([method, content]) => {
    if (!path.startsWith('http')) {
      const panel = new Graph({
        title: `${method} ${BASE_PATH}${path}`,
        datasource: 'datasource1',
      });
      content.tags.forEach(tag => {
        if (!rows[tag]) {
          rows[tag] = new Row({
            title: tag,
            editable: true,
            collapse: true,
          });
        }
        rows[tag].addPanel(panel)
      });
    }
  });
});

Object.values(rows).forEach(row => {
  dashboard.addRow(row);
});

console.log(JSON.stringify(dashboard.generate()));