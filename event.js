
function nodeMouseOver(selection){

    if ( selection.attr('opacity') >= 1  ){
        
    var d = selection.datum(),
        x = x_ + d.x + 10, y = y_ + d.y - 30;
        
    tooltip = tooltips.append('g').attr('transform', 'translate('+x+','+y+')')
    
    tooltip.append('rect')
           .attr('class', 'tooltip')
           .attr('fill', 'black')
           .attr('height', 30)
           .attr('width', l(d.id.length) )
           .attr('y', - 20)
           .attr('x', - 5)
           .attr('rx', 5).attr('ry', 5)
           .attr('opacity', 0)
           .transition().duration(400)
           .attr('opacity', 1)
           
    tooltip.append('text')
           .attr('class', 'tooltip')
           .attr('text-anchor', 'middle')
           .attr('fill', 'black')
           .text(d.id)
           .attr('fill', 'white')
           .attr('x', l(d.id.length)*0.5 - 5)
           .attr('textLength', l(d.id.length)*0.9 )
           .attr('opacity', 0)
           .transition().duration(400)
           .attr('opacity', 1)
    }
}

function MouseOut(){
    d3.selectAll('.tooltip').remove()
}

function l(x){
    return Math.max( x*12 , 55)
}

linkMouseOver = function(d){
    if ( d3.select(this).attr('opacity') >= 1  ){

    var x = x_ + d3.mouse(this)[0] + 10, y = y_ + d3.mouse(this)[1] - 30;
    tooltip = tooltips.append('g').attr('transform', 'translate('+x+','+y+')')
    
    var s = d3.sum(d.victorySource
             .filter( function(e, i){return (d.years[i] <= dateTo ) & (d.years[i] >= dateFrom )}))

        t = d3.sum(d.victoryTarget
             .filter( function(e, i){return (d.years[i] <= dateTo ) & (d.years[i] >= dateFrom )}))

    text =  '(' + s + ') ' + d.source.id+ ' - ' + d.target.id + ' (' + t +')'
    
    tooltip.append('rect').attr('class', 'tooltip')
           .attr('fill', 'black')
           .attr('height', 30)
           .attr('width', l(text.length) )
           .attr('y', - 20)
           .attr('x', - 5)
           .attr('rx', 5).attr('ry', 5)
           
           
    tooltip.append('text').attr('class', 'tooltip')
           .attr('text-anchor', 'middle')
           .attr('fill', 'black')
           .text(text)
           .attr('fill', 'white')
           .attr('x', l(text.length)*0.5 - 5)
           .attr('textLength', l(text.length)*0.9 )
    }
}

var hidden = false;

clickNode = function(d){

    var linkFilter = graph.selectAll('line').data()
                          .filter( function(d_){ return(games(d_) > 0) } )
                          .filter(function(d_){ return (d_.source == d || d_.target == d) }),
                          
        nodeFilter = linkFilter.map(function(d_){return d_.source})
                               .concat(linkFilter.map(function(d_){return d_.target}));
        
    if(hidden){
        //opacity 
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(500)
          .attr("opacity", 1)
          
        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(500)
          .attr("opacity", 1)
        hidden = false;
        
        info.text(' ')
        
    }

    else{
        //opacity
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(10)
          .attr("opacity", 1)

        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(10)
          .attr("opacity", 1)
        
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(500)
          .filter(function(d_){ return( !nodeFilter.includes(d_) ) })
          .attr("opacity", 0.05)
          
        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(500)
          .filter(function(d_){ return !linkFilter.includes(d_) })
          .attr("opacity", 0.05)
 
        hidden = true;
        
        
        info.html(displayInfoNode(d))
        
    }
}

clickLink = function(d){

    var linkFilter = [d],                              
        nodeFilter = linkFilter.map(function(d_){return d_.source})
                               .concat(linkFilter.map(function(d_){return d_.target}));
        
    if(hidden){
        //opacity 
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(500)
          .attr("opacity", 1)
          
        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(500)
          .attr("opacity", 1)
        
        hidden = false;
        info.text(' ')
    }

    else{
        //opacity
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(10)
          .attr("opacity", 1)

        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(10)
          .attr("opacity", 1)
        
        d3.selectAll('.nodes')
          .filter( function(d_){ return(participation(d_) > 0) } )
          .transition()
          .duration(500)
          .filter(function(d_){ return( !nodeFilter.includes(d_) ) })
          .attr("opacity", 0.05)
          
        d3.selectAll('.links')
          .filter( function(d_){ return(games(d_) > 0) } )
          .transition()
          .duration(500)
          .filter(function(d_){ return !linkFilter.includes(d_) })
          .attr("opacity", 0.05)

        hidden = true;
        info.html(displayInfoLink(d))
    }
    
}

function displayInfoNode(d){

    var linkFilter = graph.selectAll('line').data()
                          .filter( function(d_){ return(games(d_) > 0) } )
                          .filter(function(d_){ return (d_.source == d || d_.target == d) })

    var t = '';

    t = t + "<span id= 'p'>" +  d.id + '</span>' + '<br>'

    y = d.years.filter(function(d_){return (d_ <= dateTo)&(d_ >= dateFrom) })
    y = y.sort()

    for(i=0; i< y.length; i++){
        source = linkFilter.filter(function(d_){ return (d_.source == d)  & (d_.years.includes(y[i]) ) })
        target = linkFilter.filter(function(d_){ return (d_.target == d)  & (d_.years.includes(y[i]) ) })
        
        t = t + y[i] + ' : '
        for(j=0; j< source.length; j++){
            t = t + source[j].target.id + ' ';
        }
        for(j=0; j< target.length; j++){
            t = t + target[j].source.id + ' ';
        }

        nv = d.victory[ d.years.findIndex( function(x){ return x== y[i] } ) ]
        
        if(nv == 0){
            t = t + ' - Eliminé en quart';
        }
        if(nv == 1){
            t = t + ' - Eliminé en demi';
        }
        if(nv == 2){
            t = t + ' - Finaliste'
        }
        if(nv ==3){
            t = t + ' - Vainqueur'
        }        
        t = t + '<br>'
    }

    return t

}


function displayInfoLink(d){
    
    var s = d3.sum(d.victorySource
             .filter( function(e, i){return (d.years[i] <= dateTo ) & (d.years[i] >= dateFrom )}))

        tt = d3.sum(d.victoryTarget
             .filter( function(e, i){return (d.years[i] <= dateTo ) & (d.years[i] >= dateFrom )}))

    t = "<span id= 'p'>" + '(' + s + ') ' + d.source.id+ ' - ' + d.target.id + ' (' + tt +')' + '</span>' + '<br>'
    
    return t

}








