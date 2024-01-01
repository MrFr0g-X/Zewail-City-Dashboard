function fetchDataAndUpdateTable() {
    fetch('/get-pieChart')
        .then(response => response.json())
        .then(data => {
            updateDataTable(data);
        })
        .catch(error => console.error('Error:', error));
}
function updateDataTable(data) {
  am5.ready(function() {

    var root = am5.Root.new("pieChartDiv");


    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );
    
    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270
      })
    );
    
    series.states.create("hidden", {
      endAngle: -90
    });
    
    // Set data
    series.data.setAll(data);
  
    });


  } 


document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateTable()
});