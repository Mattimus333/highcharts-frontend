$.get('https://highcharts-basic-demo-api.herokuapp.com/data', function (data) {

  var lines = data.split('\n');
  lines.pop()
  var categoriesArr = [];
  var seriesArr = [];
  lines.forEach((line, index) => {
    if (index == 0) {
      categoriesArr = line.split(',').slice(2);
    } else {
      var series = {
        data: []
      };
      line.split(',').forEach((item, index) => {
        if (index == 0) {
          series.name = item;
          series.id = item;
        } else if (index == 1) {
          //DO NOTHING
        } else {
          series.data.push(parseInt(item));
        }
      });
      seriesArr.push(series);
    }
  });

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
      startColumn: 0,
      endColumn: 1,
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
              series = highcharts.series[1];
              console.log(series)
              if(series.visible == true){
                console.log('here')
                series.setVisible(false);
              } else {
                series.setVisible(true);
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
    // data: {
    //   csv: data,
    //   startColumn: 0,
    //   endColumn: 4,
    //   parsed: function(columns){
    //     console.log(columns)
    //     console.log(data)
    //     columns = data.split('\n')[0].split(',');
    //     console.log(columns)
    //     // columns.splice(1, 1)
    //   },
    //   firstRowAsNames: true,
    // },
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
      headerFormat: '<b>{point.name}</b><br/>',
      pointFormat: '${point.y}'
    },
    xAxis: {
      categories: categoriesArr,
    },
    legend: {
      enabled: true,
    },
    yAxis: {
      title: {
        style: {
          fontSize: '14px'
        },
        text: 'Dollars ($)'
      }
    },
    series: seriesArr,
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
    // series: [{
    //   colorByPoint: true,
    // }]
  });
});
