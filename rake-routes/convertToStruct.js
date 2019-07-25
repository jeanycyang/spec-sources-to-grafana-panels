const readline = require('readline');
const fs = require('fs');
const { once } = require('events');

function groupByController(route) {
  const GENERAL_GROUP_FORMAT = /^([a-z_]+)[/#]{1}/;
  const groupMatch = GENERAL_GROUP_FORMAT.exec(route.controller);
  return groupMatch[1];
}

function routeMapper(route) {
  const mappedRoute = { ...route };
  const parameterizedPath = route.path.replace('(.:format)', '');
  mappedRoute.parameterizedPath = parameterizedPath;
  const regexPath = parameterizedPath.replace(/:[a-z_]+/g, '.*');
  mappedRoute.regexPath = regexPath;
  return mappedRoute;
}

function railsDefaultRoutesFilter(route) {
  if (
    route.path.startsWith('/rails/')
    || route.controller.startsWith('redirect')
  ) {
    return false;
  }
  return true;
}

const ROUTE_FORMAT = /^([a-z_0-9]+)?\s?([A-Z|\|]+)\s+([a-z0-9/(.:_@*)]+)\s+([a-z0-9/(.:_"#{}=>\s/,)]+)$/;


async function convertToStruct({
  specFile,
  groupBy = groupByController,
  filter = railsDefaultRoutesFilter,
  mapper = routeMapper,
}) {
  const groups = {};

  const readInterface = readline.createInterface({
    input: fs.createReadStream(specFile),
    console: false,
  });
  readInterface.on('line', (line) => {
    const currentRoute = line.trim();
    const match = ROUTE_FORMAT.exec(currentRoute);
    if (!match) { return; }
    const route = {
      prefix: match[1],
      verb: match[2],
      path: match[3],
      controller: match[4],
    };
    if (!filter(route)) { return; }
    const mappedRoute = mapper(route);
    const group = groupBy(route);
    groups[group] = [
      ...(groups[group] || []),
      mappedRoute,
    ];
  });

  await once(readInterface, 'close');
  return groups;
}

module.exports = {
  default: convertToStruct,
  convertToStruct,
};
