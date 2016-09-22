// Straight up get pym.js working
var pymChild = new pym.Child();

data = [{"name":"Alexi Polden","count1":500,"position1":1},
{"name":"Francis Tamer","count1":500,"position1":2},
{"name":"Caitlin Gauci","count1":500,"position1":3},
{"name":"George Bishop","count1":600,"position1":4},
{"name":"Andrew Sekhar","count1":500,"position1":5},
{"name":"Dimitry Palmer","count1":500,"position1":6},
{"name":"George Tamm","count1":500,"position1":7},
{"name":"Colin Whitchurch","count1":500,"position1":8},
{"name":"Finn Keogh","count1":500,"position1":9}]
/*
 * Variables for editing
 */
var highestValue = 600;

/*
 * Variables not for editing
 */
var chartWidth = $(window).width();
var barHeight = 30;
var barSpace = 5;
var xScale = d3.scale.linear().domain([0, highestValue]).range([0, chartWidth]);

/*
 * the works
 */
function init() {
    // create the svg and size it
    var graphic = d3.select(".js-senate-results")
      .append('svg')
        .attr("width", chartWidth)
        .attr("height", (barHeight + barSpace) * data.length);

    var bar = graphic.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + (data[i]["position1"] - 1) * (barHeight + barSpace) + ")"; });

    // set up the round 1 state of the rectangles
    var rectangle = bar
        .append("svg:rect")
        .attr("width", function(d, i) { return xScale(data[i]["count1"]); })
        .attr("height", barHeight)
        .attr("fill", "#999");

    var line = graphic.append("svg:line")
        .attr("x1", xScale(560))
        .attr("y1", 0)
        .attr("x2", xScale(560))
        .attr("y2", 500)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    var candidateName = bar
        .append("text")
        .attr("x", 5)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .classed("candidate__name", true)
        .text( function(d, i) { return data[i].name; });

    var voteLabel = bar
        .append("text")
        .attr("x", function(d, i) {
            if ( xScale(data[i]["count1"]) < 165 ) {
                return 165;
            } else {
                return xScale(data[i]["count1"]) + 5;
            };})
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .classed("candidate__name", true)
        .text( function(d, i) { return data[i]["count1"]; });
};

d3.select(window).on('resize', init()); 
