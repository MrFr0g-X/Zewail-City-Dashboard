function fetchDataAndUpdateTable4(event) {
    event.preventDefault();

    // Get the form data
    let form = document.getElementById('Number of Students');
    let formData = new FormData(form);

    fetch('/get-studentsCount', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        updateDataTable4(data);
    })
    .catch(error => console.error('Error:', error));
}


function updateDataTable4(data) {
    am5.ready(function() {

        // Create root element
        var root = am5.Root.new("studentsCount");

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
            paddingLeft:0,
            paddingRight:1
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
            centerY: am5.p100,
            centerX: am5.p50,
            paddingTop: 5 
        });

        xRenderer.grid.template.setAll({
            location: 1
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
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
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return am5.color("#add8e6"); 
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return am5.color("#add8e6"); 
        });

        xAxis.data.setAll(data);
        series.data.setAll(data);

        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);

    });
}

document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('Number of Students');
    form.addEventListener('submit', fetchDataAndUpdateTable4);
});
