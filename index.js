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
          series.name = item.replace(/"/g, '');
          series.id = item.replace(/"/g, '');
        } else if (index == 1) {
          //DO NOTHING
        } else {
          series.data.push(parseInt(item));
        }
      });
      seriesArr.push(series);
    }
  });
  categoriesArr = categoriesArr.map((item) => {
    return item.replace(/"/g, '');
  });
  console.log(categoriesArr)
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
      // seriesMapping: [{
      //   name: 0,
      //   id: 0,
      //   x: 0,
      //   y: 1,
      // }]
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
              console.log(this);
              var highcharts = $('#histogram-container').highcharts(),
              series = highcharts.series[getSeriesIndex(this.options.name)];
              if(series.visible == true){
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
        events: {
          legendItemClick: function (event) {
            var highcharts = $('#pie-container').highcharts(),
            point = highcharts.get(this.options.id);
            if (point) {
              point.setVisible(!this.visible);
            }
          }
        },
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
    },
  });
});

function getSeriesIndex(name){
  if (name=='bond') {
    return 0;
  } else if (name=='swaps') {
    return 1;
  }  else if (name=='fx') {
    return 2;
  }  else if (name=='fx options') {
    return 3;
  }  else if (name=='equities') {
    return 4;
  }
}
