# Spec Sources to Grafana Panels

## How does it work?
Choose your spec (e.g. `swagger-json`), and this package will convert your spec file (e.g. `swagger.example.json`) to a usable JSON struct. Then the package will map this JSON struct to Grafana `row`s and `panel`s.

### Groups -> Rows
This JSON struct contains multiple `groups`. While the convert function has its default `groupBy` function, you can also pass your own `groupBy` function to it.

Every `group` is mapped into a Grafana `row`.

### Panel's JSON Models -> Panels
Every group item of each group is mapped into one or more Grafana `panel`(s). Pass your panels/graphs JSON models in order for the package to generate Grafana `panel`s for you.