const grafana = require('grafana-dash-gen');
const swagger = require('./swagger.example');

const apis = swagger();

const statusesGraph = require('../graphs/statusesGraph');

const { Row, Dashboard, Graph } = grafana;

// Hack: use customized target object
Graph.prototype.addTarget = function addTarget(target) {
  this.state.targets.push(target);
};

const dashboard = new Dashboard({
  title: 'My Dashboard',
});

const rows = {};

const panels = {};

const BASE_PATH = apis.basePath;

const { paths } = apis;
Object.entries(paths).forEach(([path, methods]) => {
  Object.entries(methods).forEach(([method, content]) => {
    if (!path.startsWith('http')) {
      const filterPath = `${BASE_PATH}${path.replace(/{[a-zA-Z0-9_-]{1,}\}/g, '.*')}`;
      content.tags.forEach((tag) => {
        const targets = [
          statusesGraph.target({
            method,
            path: `${BASE_PATH}${path}`,
            filterPath,
          }),
        ];
        if (!panels[tag]) {
          panels[tag] = [
            new Graph(statusesGraph.graph({
              title: `${tag} statuses`,
              datasource: 'datasource1',
              targets,
            })),
          ];
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
