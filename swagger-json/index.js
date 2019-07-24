function convert(specFile) {
    const rows = {};

  const panels = {};

  const json = require(specFile);

  const BASE_PATH = json.apis.basePath;

  const { paths } = json.apis;

  Object.entries(paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, content]) => {
      if (!path.startsWith('http')) {
      }
    });
  });

  Object.entries(rows).forEach(([tagName, row]) => {
    row.addPanel(...panels[tagName]);
  });
}

module.exports = { convert };
