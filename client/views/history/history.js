/*****************************************************************************/
/* History: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.History.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.History.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

Template.historyChart.pointsHistoryChart = function() {
  var history = _.pluck(Meteor.user() ? Meteor.user().profile.week_history : [], 'points')
  return {
    chart: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    colors: ['#662343', '#da552f', '#402932'],
    title: {
      text: "Points History"
    },
    subtitle: {
      text: history.length ? '' : '(just a placeholder until you have some history of your own)'
    },
    legend: {
      enabled: false
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>Week {point.x}: {point.y} Points</b>'
    },
    plotOptions: {
    },
    series: [{
      data: history.length ? history : [138, 314, 192, 81, 121, 284, 212],
      lineWidth: 5,
      type: 'column'
    }],
    xAxis: {
      title: {
        text: 'Week',
        style: {
          fontSize: '2em;',
          color: '#444;'
        },
        offset: 45
      },
      lineColor: '#feb331'
    },
    yAxis: {
      title: {
        text: 'Points',
        style: {
          fontSize: '2em;',
          color: '#444;'
        },
        offset: 45
      },
      gridLineColor: '#feb331',
      gridLineDashStyle: 'dot'
    }
  };
};

/*****************************************************************************/
/* History: Lifecycle Hooks */
/*****************************************************************************/
Template.History.created = function() {};

Template.History.rendered = function() {};

Template.History.destroyed = function() {};