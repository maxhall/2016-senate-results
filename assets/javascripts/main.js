// Straight up get pym.js working
var pymChild = new pym.Child();

/**
 * Grab the data from our Google Sheet
 */
var sheetURL = 'https://docs.google.com/spreadsheets/d/1YrPVj8O8ZrZaByz8wMhS56N8rL7e2hK-in_cyWlrq4I/pubhtml';
var rawSheetData = {};
var constants = {};

var tabletopInit = function tabletopInit() {
  Tabletop.init({
    key: sheetURL,
    callback: logTabletopData,
    simpleSheet: false,
  })
};

var logTabletopData = function logTabletopData(data, tabletop) {
  rawSheetData = data;
  constants = rawSheetData.constants.elements['0'];
  d3.select('.header__standfirst').html(constants.standfirst);
};

/**
 * President
 */
var presWinningPercentage = 48;
var presSummaryHeight = 40;
var presSummaryWidth = $('.js-pres-summary').width();

// Set up the pres summary
var presSummaryInit = function presSummaryInit() {
  var presSummary = d3.select('.js-pres-summary')
    .append('svg')
    .attr('height', presSummaryHeight)
    .attr('width', presSummaryWidth);

  var presSummarySegmentOne = presSummary.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', presSummaryWidth * presWinningPercentage / 100)
    .attr('height', presSummaryHeight)
    .style('fill', '#008938');

  var presSummarySegmentTwo = presSummary.append('rect')
    .attr('x', presSummaryWidth * (presWinningPercentage / 100))
    .attr('y', 0)
    .attr('width', presSummaryWidth * (100 - presWinningPercentage) / 100)
    .attr('height', presSummaryHeight)
    .style('fill', '#753da6');

  var presSummaryMidline = presSummary.append('line')
    .attr('x1', presSummaryWidth/2)
    .attr('y1', 0)
    .attr('x2', presSummaryWidth/2)
    .attr('y2', presSummaryHeight)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  var segmentLabel = presSummary.append('text')
    .attr('x', presSummaryHeight/4)
    .attr('y', presSummaryHeight/4)
    .attr('dy', presSummaryHeight/2)
    .classed('pres__summary-segment-label', true)
    .text(presWinningPercentage + '%');

  var segmentLabelTwo = presSummary.append('text')
    .attr('x', presSummaryWidth - 70)
    .attr('y', presSummaryHeight/4)
    .attr('dy', presSummaryHeight/2)
    .classed('pres__summary-segment-label', true)
    .text(100 - presWinningPercentage + '%');
};

var presSummaryUpdate = function presSummaryUpdate() {
  console.log('Updating pres summary');
};

var tabsInit = function tabsInit() {
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('tabs__tab--current');
    $('.tabs__content').removeClass('tabs__content--current');

    $(this).addClass('tabs__tab--current');
    $('#'+tab_id).addClass('tabs__content--current');

    // Update the height of the parent iframe
    pymChild.sendHeight()
  })
};

var sirenInit = function sirenInit() {
  $('.js-header-siren').click(function() {
    presSummaryUpdate();
  })
}

// Initialise everything
$(document).ready(function(){
  tabsInit();
  sirenInit();
  presSummaryInit();
  // tabletopInit();
})
