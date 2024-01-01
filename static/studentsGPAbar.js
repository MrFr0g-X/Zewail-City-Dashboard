function fetchDataAndUpdateTable7(event) {
    event.preventDefault();
  
    // Get the form data
    let form = document.getElementById('studentsGPAbar'); 
    let formData = new FormData(form);
  
    fetch('/get-studentsGPAbar', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        updateDataTable7(data);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function updateDataTable7(data) {
    am5.ready(function() {
        // Create root element
        var root = am5.Root.new("chartlast");
  
        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
  
        // Create chart
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,
            paddingRight: 1
        }));
  
        // Add cursor
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
  
        // Create axes
        var xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true
        });
  
        xRenderer.labels.template.setAll({
            rotation: 0,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });
  
        xRenderer.grid.template.setAll({
            location: 1
        });
  
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));
  
        var yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        });
  
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
            categoryXField: "category",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));
  
        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return am5.color("#89CFF0"); 
        });
  
        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return am5.color("#89CFF0"); 
        });
  
        xAxis.data.setAll(data);
        series.data.setAll(data);
  
        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('studentsGPAbar');
    form.addEventListener('submit', fetchDataAndUpdateTable7);
  });
