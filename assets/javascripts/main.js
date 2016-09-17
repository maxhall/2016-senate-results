var pymChild = new pym.Child();

// President
const presSummaryHeight = 40;
var presSummaryWidth = $(".js-pres-summary").width();

// Set up the pres summary
function init() {
  var bar = d3.select(".js-pres-summary")
    .append("svg")
    .attr("height", presSummaryHeight)
    .attr("width", presSummaryWidth);

  var circle = bar.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", presSummaryWidth*0.66)
    .attr("height", presSummaryHeight)
    .style("fill", "#008938");

  var circleTwo = bar.append("rect")
    .attr("x", presSummaryWidth*0.66)
    .attr("y", 0)
    .attr("width", presSummaryWidth*0.44)
    .attr("height", presSummaryHeight)
    .style("fill", "#753da6");

  var midline = bar.append("line")
    .attr("x1", presSummaryWidth/2)
    .attr("y1", 0)
    .attr("x2", presSummaryWidth/2)
    .attr("y2", presSummaryHeight)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  var segmentLabel = bar.append("text")
    .attr("x", presSummaryHeight/4)
    .attr("y", presSummaryHeight/4)
    .attr("dy", presSummaryHeight/2)
    .classed("pres__summary-segment-label", true)
    .text("66%");

  var segmentLabelTwo = bar.append("text")
    .attr("x", presSummaryWidth - 70)
    .attr("y", presSummaryHeight/4)
    .attr("dy", presSummaryHeight/2)
    .classed("pres__summary-segment-label", true)
    .text("44%");
};

init();

$(document).ready(function(){

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('tabs__tab--current');
		$('.tabs__content').removeClass('tabs__content--current');

		$(this).addClass('tabs__tab--current');
		$("#"+tab_id).addClass('tabs__content--current');
	})

})
