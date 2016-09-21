// Straight up get pym.js working
var pymChild = new pym.Child();

/**
 * Grab the data from our Google Sheet and clean it up a little
 */
var sheetURL = 'https://docs.google.com/spreadsheets/d/1YrPVj8O8ZrZaByz8wMhS56N8rL7e2hK-in_cyWlrq4I/pubhtml';

var rawData = {};
var constants = {};
var updatesData = {};
var presData = {};
var honiData = {};

var tabletopInit = function tabletopInit() {
  Tabletop.init({
    key: sheetURL,
    callback: logTabletopData,
    simpleSheet: false,
  })
};

var logTabletopData = function logTabletopData(data, tabletop) {
  rawData = data;
  constants = data.constants.elements['0'];
  updatesData = data.updates.elements;
  presData = data.pres.elements;
  honiData = data.honi.elements;

  updateCopy();
};

/**
 * Copy
 */
var updateCopy = function updateCopy() {
  // General
  d3.select('.js-header-title').text(constants.title);
  d3.select('.js-header-standfirst').html(constants.headerStandfirst);
  d3.select('.js-footer-footnotes').html(constants.footnotes);

  // Pres
  d3.select('.js-pres-turnout').text(constants.presTurnout);
  d3.select('.js-pres-booths').text(constants.presBoothsCounted + '/' + constants.numberOfBooths);
  d3.select('.js-pres-standfirst').html(constants.presStandfirst);
  d3.select('.js-pres-footnotes').html(constants.presFootnotes);

  // Honi
  d3.select('.js-honi-turnout').text(constants.honiTurnout);
  d3.select('.js-honi-standfirst').html(constants.honiStandfirst);
  d3.select('.js-honi-footnotes').html(constants.honiFootnotes);
};

/**
 * President
 */

var presWinningPercentage = 48;
var presSummaryHeight = 40;
var presSummaryWidth = $('.js-content-results').width();
// How far from the edge of the graphic should the bar label appear
var presSummaryLabelPadding = 20;

// Elements of the summary graphic
var presSummary = d3.select('.js-pres-summary').append('svg');
var presSummarySegmentOne = presSummary.append('rect');
var presSummarySegmentTwo = presSummary.append('rect');
var presSummaryMidline = presSummary.append('line');
var presSummaryLabelOne = presSummary.append('text');
var presSummaryLabelTwo = presSummary.append('text');


// Initiate the pres summary
var presSummaryInit = function presSummaryInit() {

  presSummary
    .attr('height', presSummaryHeight)
    .attr('width', presSummaryWidth);

  presSummarySegmentOne
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', presSummaryWidth * 10)
    .attr('height', presSummaryHeight)
    .style('fill', '#008938');

  presSummarySegmentTwo
    .attr('x', presSummaryWidth * 0.3)
    .attr('y', 0)
    .attr('width', presSummaryWidth * 0.5)
    .attr('height', presSummaryHeight)
    .style('fill', '#753da6');

  presSummaryMidline
    .attr('x1', presSummaryWidth/2)
    .attr('y1', 0)
    .attr('x2', presSummaryWidth/2)
    .attr('y2', presSummaryHeight)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  presSummaryLabelOne
    .attr('x', presSummaryLabelPadding)
    .attr('y', presSummaryHeight/4)
    .attr('dy', presSummaryHeight/2)
    .classed('pres__summary-segment-label', true)
    .text(constants.presMantlePercentage);

  presSummaryLabelTwo
    .attr('x', presSummaryWidth - presSummaryLabelPadding)
    .attr('y', presSummaryHeight/4)
    .attr('dy', presSummaryHeight/2)
    .attr('text-anchor', 'end')
    .classed('pres__summary-segment-label', true)
    .text(constants.presBrookPercentage);
};

// Update the pres summary after resize or new data
var presSummaryUpdate = function presSummaryUpdate() {
  var presSummaryWidth = $('.js-content-results').width();
  var computedMantleMultiplier = parseInt(constants.presMantlePercentage)/100;
  var computedBrookMultiplier = 100 - computedMantleMultiplier;

  presSummary
    .attr('width', presSummaryWidth);

  presSummarySegmentOne
    .transition()
    .attr('width', presSummaryWidth * computedMantleMultiplier);

  presSummarySegmentTwo
    .transition()
    .attr('x', presSummaryWidth * computedMantleMultiplier)
    .attr('width', presSummaryWidth * computedBrookMultiplier);

  presSummaryMidline
    .attr('x1', presSummaryWidth/2)
    .attr('x2', presSummaryWidth/2);

  presSummaryLabelOne
    .text(constants.presMantlePercentage);

  presSummaryLabelTwo
    .attr('x', presSummaryWidth - presSummaryLabelPadding)
    .text(constants.presBrookPercentage);
};

/**
 * Honi
 */
var honiSummaryNumberOfTickets = 3;
var honiSummaryRowHeight = 30;
var honiSummaryRowSpace = 2;
var honiSummaryHeight = 2 * honiSummaryRowHeight * honiSummaryNumberOfTickets + honiSummaryRowSpace * honiSummaryNumberOfTickets;
var honiSummaryWidth = $('.js-honi-summary').width();

// Set up the summary elements
var honiSummary = d3.select('.js-honi-summary').append('svg');

var honiSummaryInit = function honiSummaryInit(data) {
  var honiSummaryWidth = $('.js-content-results').width();

  honiSummary
    .attr('height', honiSummaryHeight)
    .attr('width', honiSummaryWidth);

  honiSummaryTicket = honiSummary.selectAll('g')
    .data([5, 6, 7])
    .enter().append('g')
    .attr('transform', function(d, i) {
      return 'translate(0,' + (i) * honiSummaryRowHeight *2 + ')';
    });

  honiSummaryLabel = honiSummaryTicket.append('text')
    .text( function(d, i) {
      return 'brand – finalPercentage';
      // return d[i].brand + ' – ' + d[i].finalPercentage;
    })
    .classed('honi__ticket-label', true);

  honiSummaryPrimarySegment = honiSummaryTicket.append('rect')
    .attr('height', honiSummaryRowHeight)
    .attr('width', function(d,i) {
      return 45;
      //return d[i].primaryPercentage / 100 * honiSummaryWidth;
    })
    .attr('transform', 'translate(0,' + (honiSummaryRowHeight + honiSummaryRowSpace) + ')')
    .attr('fill', function(d,i) {
      return '#eeccee';
      //return d[i].colorhex;
    });

}

/**
 * Set up the user interface
 */
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
    honiSummaryInit();
  })
}

/**
 * Initialise everything
 */

var init = function init() {
  tabletopInit();
  tabsInit();
  sirenInit();
  presSummaryInit();
  honiSummaryInit();

  // Listener for the resize
  $(window).resize(function() {
    presSummaryUpdate();
  })
};

$(document).ready(function(){
  init();
})
