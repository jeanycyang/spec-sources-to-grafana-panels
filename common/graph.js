const grafana = require('grafana-dash-gen');

const { Graph } = grafana.Panels;

// Hack: use customized target object
Graph.prototype.addTarget = function addTarget(target) {
  this.state.targets.push(target);
};

module.exports = {
  default: Graph,
  Graph,
};
