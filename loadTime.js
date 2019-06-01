
function loadTime(){ // Main function

    // ticks of the time line
    time.append('g')
        .selectAll('line')
        .data(data.dates)
        .enter()
        .append('line')
        .attr('class','timeLine')
        .attr('x1', dateToX )
        .attr('x2', dateToX )
        .attr('y1', function(d){ return height-timeHeightMargin*(0.75+0.25*(d%10==0) ) } )
        .attr('y2', height-timeHeightMargin*0.5)
        .attr('opacity', setOpacity)

    // label on stick (every 10 years)
    time.append('g')
        .selectAll('text')
        .data(data.dates.filter(function(d){return d%10==0}))
        .enter()
        .append('text')
        .attr('class','timeLabel')
        .attr('text-anchor','middle')
        .attr('x', dateToX )
        .attr('y', height-timeHeightMargin )
        .text(function(d){return d+''})
        .attr('opacity', setOpacity)

    // first marker
    time.append('circle')
        .attr('id', 'from' )
        .attr('class', 'timeMarker' )
        .text(dateFrom)
        .attr('r', 7)
        .attr('cx', dateToX(dateFrom) )
        .attr('cy', height-10 )
        //.call(dragTime)
        
    // second marker
    time.append('circle')
        .attr('id', 'to' )
        .attr('class', 'timeMarker' )
        .text(dateTo)
        .attr('r', 7)
        .attr('cx', dateToX(dateTo) )
        .attr('cy', height-10 )
        //.call(dragTime)
        
    date.html(dateFrom+ ' - ' + dateTo)
}


function updateTime(){
    pseudoDateFrom = dateFrom;
    pseudoDateTo = dateTo;
    
    time.select('#to').transition().duration(1000).attr('cx', dateToX(dateTo) )
    time.select('#from').transition().duration(1000).attr('cx', dateToX(dateFrom) )
    d3.selectAll('.timeLine').transition().duration(1000).attr('opacity', setOpacity);
    d3.selectAll('.timeLabel').transition().duration(1000).attr('opacity', setOpacity);
    date.html(dateFrom+ ' - ' + dateTo);
}


// Fonctions utiles
function dateToX(date){
    return timeWidthMargin+(date-1980)*(width-timeWidthMargin*2)/(2017-1980)
}

function xToDate(x){
    return Math.max(Math.min(Math.round((x-timeWidthMargin)*(2017-1980)/(width-timeWidthMargin*2)+1980), 2017),1980)
}

function setOpacity(d){
    if( (d<=pseudoDateTo) & (d>=pseudoDateFrom) ){ return 1 }
    else{ return 0.1 }
}

// Fonction drag
var delta;
function dragstarted_(d) {
	 delta = d3.select(this).attr('cx') - d3.event.x
}

function dragged_(d) {

    d3.select(this)
      .attr('cx',  d3.event.x + delta )
      .text( xToDate(d3.event.x+delta) )
    
    if(d3.select(this).attr('id') == 'from'){ pseudoDateFrom = xToDate(d3.event.x+delta) }
    if(d3.select(this).attr('id') == 'to'){ pseudoDateTo = xToDate(d3.event.x+delta) }
    
    d3.selectAll('.timeLine').attr('opacity', setOpacity);
    d3.selectAll('.timeLabel').attr('opacity', setOpacity);
    
    date.text(pseudoDateFrom+ ' - ' + pseudoDateTo);
}

function dragended_(d){
    var a;
    if(d3.select(this).attr('id') == 'from'){ a = xToDate(d3.event.x+delta) }
    if(d3.select(this).attr('id') == 'to'){ a = xToDate(d3.event.x+delta) }
	d3.select(this).attr('cx', dateToX(a) )
    dateFrom = pseudoDateFrom;
    dateTo = pseudoDateTo;
	update();
}

var dragTime = d3.drag()
              .on("start", dragstarted_)
              .on("drag", dragged_)
              .on("end", dragended_)





