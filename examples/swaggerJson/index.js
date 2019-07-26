const { convertToStruct } = require('../../swaggerJson/convertToStruct.js');

const { convertToPanels } = require('../../swaggerJson/convertToPanels');

const { panel, target } = require('./statusesGraph');

(async () => {
  const groups = await convertToStruct({
    specFile: './examples/swaggerJson/swagger.example.json',
  });
  console.log(groups);
  const result = convertToPanels({
    dashboard: { title: 'auto generated using swagger json' },
    groups,
    panelModels: [{
      name: 'Statuses',
      panel,
      type: 'graph',
      target,
    }],
  });
  console.log(JSON.stringify(result));
})();
