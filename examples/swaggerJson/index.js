const { convertToStruct } = require('../../swaggerJson/convertToStruct.js');

// const { convertToPanels } = require('../../swaggerJson/convertToPanels');

(async () => {
  const groups = await convertToStruct({
    specFile: './examples/swaggerJson/swagger.example.json',
  });
  console.log(groups);
})();
