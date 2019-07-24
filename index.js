// For import syntax
Object.defineProperty(exports, '__esModule', {
  value: true,
});

const { createDashboard } = require('./dashboard');
const { convert: rakeRoutesConvert } = require('./rake-routes/group-by-and-to-json');
const { convert: swaggerJsonConvert } = require('./swagger-json');

const SUPPORTED_SPECS = {
  'swagger-json': {
    convert: swaggerJsonConvert,
  },
  'rake-routes': {
    convert: rakeRoutesConvert,
  },
};

async function generate({
  dashboard: dashboardOpt,
  spec,
  specFile,
}) {
  const dashboard = createDashboard(dashboardOpt);
  if (!SUPPORTED_SPECS[spec]) {
    throw Error('unsupported spec');
  }
  const groups = await SUPPORTED_SPECS[spec].convert(specFile);
  console.log(groups);
  return dashboard.generate();
}

exports.generate = generate;
exports.default = generate;

module.exports = exports;
