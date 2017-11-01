$.getJSON('https://highcharts-basic-demo-api.herokuapp.com/data', function (data) {
  var APIdata = data[0];
  var itemValueArr = [];

  for (var item in APIdata){
    if(item !== 'id'){
      itemName = item.charAt(0).toUpperCase() + item.slice(1);
      itemValueArr.push([itemName, APIdata[item]]);
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
      data: itemValueArr
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
      type: "category"
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
      column: {
          colorByPoint: true,
          pointPadding: 0.2,
          borderWidth: 0
      }
    },
    series: [{
      data: itemValueArr
    }]
  });
});
