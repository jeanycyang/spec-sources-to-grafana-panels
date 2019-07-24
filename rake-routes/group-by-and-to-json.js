const readline = require('readline');
const fs = require('fs');
const { once } = require('events');

function getGroupNameBy(controller) {
  const GENERAL_GROUP_FORMAT = /^([a-z_]+)[\/#]{1}/;
  const ADMIN_GROUP_FORMAT = /^admin\/([a-z_]+)/;
  if (controller.startsWith('admin')) {
    const subGroup = ADMIN_GROUP_FORMAT.exec(controller)[1];
    return subGroup;
  }
  const groupMatch = GENERAL_GROUP_FORMAT.exec(controller);
  const group = groupMatch[1];
  return group;
}

const ROUTE_FORMAT = /^([a-z_0-9]+)?\s?([A-Z|\|]+)\s+([a-z0-9/(.:_@*)]+)\s+([a-z0-9/(.:_"#{}=>\s/,)]+)$/;

const groups = {};

(async function processLineByLine() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./routes.example.txt'),
    console: false,
  });

  readInterface.on('line', (line) => {
    const currentRoute = line.trim();
    const match = ROUTE_FORMAT.exec(currentRoute);
    if (!match) {
      return;
    }
    const route = {
      prefix: match[1],
      verb: match[2],
      path: match[3],
      controller: match[4],
    };
    if (
      route.path.startsWith('/rails/')
      || route.controller.startsWith('redirect')
    ) {
      return;
    }
    const parameterizedPath = route.path.replace('(.:format)', '');
    route.parameterizedPath = parameterizedPath;
    const filterPath = parameterizedPath.replace(/:[a-z_]+/g, '.*');
    route.filterPath = filterPath;
    const group = getGroupNameBy(route.controller);
    groups[group] = [
      ...(groups[group] || []),
      route,
    ];
  });

  await once(readInterface, 'close');
  console.log(groups);

  fs.writeFileSync('groups.json', JSON.stringify(groups), 'utf8');
  console.log('saved!');
}());
