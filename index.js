const grafana = require('grafana-dash-gen');
const swagger = require('./swagger.example');
const apis = swagger();

const Row = grafana.Row;
const Dashboard = grafana.Dashboard;
const Graph = grafana.Panels.Graph;

// Hack: use customized target object
Graph.prototype.addTarget = function addTarget(target) {
  this.state.targets.push(target);
};

const dashboard = new Dashboard({
	title: 'My Dashboard'
});

const rows = {};

const panels = {};

const BASE_PATH = apis.basePath;

const paths = apis.paths;
Object.entries(paths).forEach(([path, methods]) => {
  Object.entries(methods).forEach(([method, content]) => {
    if (!path.startsWith('http')) {
      const filterPath = `${BASE_PATH}${path.replace(/{[a-zA-Z0-9_-]{1,}\}/g, '.*')}`
      content.tags.forEach(tag => {
        const target = { // @TODO
          filterPath,
        };
        if (!panels[tag]) {
          panels[tag] = [
            new Graph({
              title: `${tag} graph`,
              datasource: 'datasource1',
              targets: [target],
            }),
          ];
        } else {
          panels[tag][0].addTarget(target);
        }
        if (!rows[tag]) {
          rows[tag] = new Row({
            title: tag,
            editable: true,
            collapse: true,
          });
        }
      });
    }
  });
});

Object.entries(rows).forEach(([tagName, row]) => {
  row.addPanel(...panels[tagName]);
  dashboard.addRow(row);
});

console.log(JSON.stringify(dashboard.generate()));