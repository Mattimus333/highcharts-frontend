$.get('http://localhost:3000/data', function (data) {
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'Georgia'
      }
    },
    legend: {
      itemStyle: {
        fontWeight: '',
      }
    },
    lang: {
      thousandsSep: ','
    },
    colors: ['#8d9091', 'black', '#f4bd0c', '#a18f60', 'purple'],
  });


  Highcharts.chart('pie-container', {
    data: {
      csv: data,
      seriesMapping: [{
        id: 0,
        x: 0,
        y: 1,
      }]
    },
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Mock Data Pie Chart'
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: '${point.y} ({point.percentage:.1f}%)'
    },
    plotOptions: {
      series: {
        point: {
          events: {
            legendItemClick: function (event) {
              var highcharts = $('#histogram-container').highcharts(),
              column = highcharts.get(this.options.id);
              console.log(column)
              if(column.graphic.visibility == 'hidden'){
                column.graphic.show();
              } else {
                column.graphic.hide();
              }
            }
          }
        }
      },
      pie: {
        innerSize: '65%',
        allowPointSelect: true,
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      },
    },
  });


  Highcharts.chart('histogram-container', {
    data: {
      csv: data,
      seriesMapping: [{
        id: 0,
        name: 0,
        x: 0,
        y: 1,
      }]
    },
    chart: {
      type: 'column'
    },
    title: {
      text: 'Random Data'
    },
    subtitle: {
      text: 'A different look'
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: '${point.y}'
    },
    xAxis: {

    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        style: {
          fontSize: '14px'
        },
        text: 'Dollars ($)'
      }
    },
    plotOptions: {
      series: {
        point: {
          // events: {
          //   click: function (event) {
          //     if(this.graphic.visibility == 'hidden'){
          //       this.graphic.show();
          //     } else {
          //       this.graphic.hide();
          //     }
          //   },
          // },
        },
        allowPointSelect: true
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
    },
    series: [{
      colorByPoint: true,
    }]
  });
});
