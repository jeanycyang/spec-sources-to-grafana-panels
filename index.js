const grafana = require('grafana-dash-gen');

const Row = grafana.Row;
const Dashboard = grafana.Dashboard;
const Panels = grafana.Panels;
const Graph = grafana.Panels.Graph;

const dashboard = new Dashboard({
	title: 'My Dashboard'
});

console.log(dashboard.generate());