const { convertToStruct } = require('../../rakeRoutes/convertToStruct');

const { convertToPanels } = require('../../rakeRoutes/convertToPanels');

const { panel, target } = require('./requestCounts');

(async () => {
  const groups = await convertToStruct({
    specFile: './examples/rakeRoutes/routes.example.txt',
    filter: () => true,
    groupBy: route => route.verb,
    mapper: route => ({ ...route, name: `${route.verb} ${route.path}` }),
  });
  console.log(groups);
  const result = convertToPanels({
    dashboard: { title: 'auto generated using rake routes' },
    groups,
    datasource: 'Stackdriver - Production',
    panelModels: [{
      name: 'requestCounts',
      panel,
      type: 'graph',
      target,
    }],
  });
  console.log(JSON.stringify(result));
})();
