$.get('http://localhost:3000/data', function (data) {
  // var itemValueArr = [];
  // for (var item in data){
  //   itemName = item.charAt(0).toUpperCase() + item.slice(1);
  //   itemValueArr.push({
  //     id: itemName,
  //     name: itemName,
  //     data: [data[item]],
  //     y: data[item],
  //   });
  // }
  console.log(data)

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
        name: 0,
        x: 0, // X values are pulled from column 0 by default
        y: 1, // Y values are pulled from column 1 by default
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
              point = highcharts.get(this.options.id);
              console.log(point.visible)
              if (point) {
                point.setVisible(!this.visible);
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
    // series: [{
    //   data: itemValueArr
    // }]
  });


  Highcharts.chart('histogram-container', {
    data: {
      csv: data,
      seriesMapping: [{
        id: 0,
        name: 0,
        x: 0, // X values are pulled from column 0 by default
        y: 1, // Y values are pulled from column 1 by default
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
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '${point.y}'
    },
    // xAxis: {
    //   categories: itemValueArr.map((item) => {
    //     return item.name
    //   }),
    //   labels: {
    //     enabled: false,
    //   },
    // },
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
        allowPointSelect: true
      },
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
    },
    // series: itemValueArr
  });
});
