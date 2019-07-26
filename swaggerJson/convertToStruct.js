const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

function defaultFilter({ path, verb, details }) { // eslint-disable-line no-unused-vars
  if (path.startsWith('http')) return false;
  return true;
}

function groupByTags({ path, verb, details }) { // eslint-disable-line no-unused-vars
  return details.tags;
}

function defaultMapper({
  host, basePath, path, verb, details, // eslint-disable-line no-unused-vars
}) {
  const regexPath = basePath + path.replace(/\{[a-zA-Z0-9_-]+\}/g, '.*');
  return {
    fullPath: `${basePath}${path}`,
    path,
    verb,
    regexPath,
  };
}

async function convertToStruct({
  specFile,
  filter = defaultFilter,
  groupBy = groupByTags,
  mapper = defaultMapper,
}) {
  const file = await readFileAsync(specFile, 'utf8');
  const spec = JSON.parse(file);

  const { host, paths, basePath } = spec;

  const groupBys = {};

  Object.entries(paths).forEach(([path, verbs]) => {
    Object.entries(verbs).forEach(([verb, details]) => {
      if (!filter({ path, verb, details })) { return; }
      const groups = groupBy({ path, verb, details });
      const mapped = mapper({
        host, basePath, path, verb, details,
      });
      groups.forEach((group) => {
        groupBys[group] = [
          ...(groupBys[group] || []),
          mapped,
        ];
      });
    });
  });
  return groupBys;
}

module.exports = {
  default: convertToStruct,
  convertToStruct,
};
