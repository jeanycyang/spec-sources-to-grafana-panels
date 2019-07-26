const panel = ({
  datasource,
  targets,
  groupName,
}) => ({
  span: 4,
  aliasColors: {},
  bars: false,
  datasource,
  editable: true,
  error: false,
  fill: 0,
  grid: {},
  legend: {
    avg: true,
    current: true,
    max: true,
    min: false,
    show: true,
    total: true,
    values: true,
    alignAsTable: true,
    rightSide: false,
    hideEmpty: false,
    hideZero: false,
  },
  lines: true,
  linewidth: 1,
  links: [],
  nullPointMode: 'null as zero',
  percentage: false,
  pointradius: 5,
  points: false,
  renderer: 'flot',
  seriesOverrides: [
    {},
  ],
  stack: false,
  steppedLine: false,
  targets,
  title: `${groupName} Statuses`,
  tooltip: {
    shared: true,
    value_type: 'cumulative',
    sort: 0,
  },
  type: 'graph',
  gridPos: {
    x: 0,
    y: 23,
    w: 24,
    h: 7,
  },
  yaxes: [
    {
      show: true,
      min: '0',
      max: null,
      logBase: 1,
      format: 'short',
      decimals: 0,
    },
    {
      show: true,
      min: '0',
      max: null,
      logBase: 1,
      format: 'short',
      decimals: 0,
    },
  ],
  xaxis: {
    show: true,
    mode: 'time',
    name: null,
    values: [],
    buckets: null,
  },
  thresholds: [],
  options: {},
  yaxis: {
    align: false,
    alignLevel: null,
  },
  dashes: false,
  dashLength: 10,
  spaceLength: 10,
  timeFrom: null,
  timeShift: null,
  timeRegions: [],
  decimals: 0,
});

const target = ({ verb, path, regexPath }) => ({
  aliasBy: `${verb} ${path} {{metric.label.status}}`,
  alignOptions: [
    {
      expanded: true,
      options: [
        {
          label: 'delta',
          metricKinds: [
            'CUMULATIVE',
            'DELTA',
          ],
          text: 'delta',
          value: 'ALIGN_DELTA',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
            'DISTRIBUTION',
          ],
        },
        {
          label: 'rate',
          metricKinds: [
            'CUMULATIVE',
            'DELTA',
          ],
          text: 'rate',
          value: 'ALIGN_RATE',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
        {
          label: 'min',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'min',
          value: 'ALIGN_MIN',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
        {
          label: 'max',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'max',
          value: 'ALIGN_MAX',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
        {
          label: 'mean',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'mean',
          value: 'ALIGN_MEAN',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
        {
          label: 'count',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'count',
          value: 'ALIGN_COUNT',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
            'BOOL',
          ],
        },
        {
          label: 'sum',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'sum',
          value: 'ALIGN_SUM',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
            'DISTRIBUTION',
          ],
        },
        {
          label: 'stddev',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'stddev',
          value: 'ALIGN_STDDEV',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
        {
          label: 'percent change',
          metricKinds: [
            'GAUGE',
            'DELTA',
          ],
          text: 'percent change',
          value: 'ALIGN_PERCENT_CHANGE',
          valueTypes: [
            'INT64',
            'DOUBLE',
            'MONEY',
          ],
        },
      ],
    },
  ],
  alignmentPeriod: 'stackdriver-auto',
  crossSeriesReducer: 'REDUCE_SUM',
  filters: [
    'metric.label.method',
    '=',
    verb,
    'AND',
    'metric.label.path',
    '=~',
    regexPath,
  ],
  groupBys: [
    'metric.label.status',
  ],
  metricKind: 'DELTA',
  metricType: 'logging.googleapis.com/user/rest/request_count',
  perSeriesAligner: 'ALIGN_DELTA',
  usedAlignmentPeriod: 60,
  valueType: 'INT64',
});

module.exports = {
  panel,
  target,
};