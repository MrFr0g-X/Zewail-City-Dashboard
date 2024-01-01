function fetchDataAndUpdateTable1() {
  fetch('/get-BarChart')
    .then(response => response.json())
    .then(data => {
      updateDataTable1(data);
    })
    .catch(error => console.error('Error:', error));
}
function updateDataTable1(data) {
    am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("barChartDiv");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft:0,
      paddingRight:1
    }));
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    
    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, { 
      minGridDistance: 30, 
      minorGridEnabled: true
    });
    
    xRenderer.labels.template.setAll({
      rotation: -30,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });
    
    xRenderer.grid.template.setAll({
      location: 1
    })
    
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));
    
    // Create series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "country",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return am5.color("#ADD8E6");
    });
    
    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return am5.color("#ADD8E6");
    });
    
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    
    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
    
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndUpdateTable1()
});