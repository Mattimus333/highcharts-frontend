$.getJSON('https://highcharts-basic-demo-api.herokuapp.com/data', function (data) {
  var APIdata = data[0];
  var pieChartData = [];
  var histogramData = [];

  for (var item in APIdata){
    if(item !== 'id'){
      itemName = item.charAt(0).toUpperCase() + item.slice(1);
      var pieObj = {
        name: itemName,
        y: APIdata[item]
      };
      var histoObj = {
        name: itemName,
        data: [APIdata[item]]
      };
      pieChartData.push(pieObj);
      histogramData.push(histoObj);
    }
  }

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
      pie: {
        innerSize: '65%',
        allowPointSelect: true,
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      },
    },
    series: [{
    data: pieChartData
    }]
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
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '${point.y}'
    },
    xAxis: {
        tickPositions: []
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
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
    },
    series: histogramData,
  });
});
