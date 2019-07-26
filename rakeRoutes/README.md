# Rake Routes to Grafana Panels

## `convertToStruct({ specFile, filter, groupBy, mapper })`
### Parameters
`route` object: parsed from rake routes, includes 4 properties: `prefix`, `verb`, `path`, `controller`

- `specFile` (required): path to the rake routes result file

- `filter(route)` (optional)
  - default: `railsDefaultRoutesFilter` - exclude rails uilities & redirect paths

-  `groupBy(route)` (optional)
  - default: `groupByController` - group by the route's controller

- `mapper(route)` (optional)
  - you can map the properties you want from `route` object
  - default: `routeMapper` - add 2 extra properties `regexPath` and `parameterizedPath` to every route

### Example
```js
const { convertToStruct } = require
(async () => {
  const groups = await convertToStruct({
    specFile: './routes.example.txt',
    filter: () => true, // include all routes
    groupBy: route => route.verb, // group routes by HTTP Verbs
    mapper: route => ({ ...route, name: `${route.verb} ${route.path}` }), // add an extra property "name" for every route
  });
  console.log(groups);
})();
```
See: `examples/rakeRoutes/index.js`