
function nodeMouseOver(selection) {
  
  tooltips.select(`#tooltip-${selection.attr('id')}`).remove()

  if (selection.style('opacity') >= 1) {

    var d = selection.datum(),
      x = x_ + d.x + 10, y = y_ + d.y - 30;

    var tooltip = tooltips.append('g')
    
    tooltip
    .attr('id', `tooltip-${selection.attr('id')}`)
    .attr('transform', 'translate(' + x + ',' + y + ')')

    tooltip.append('rect')
      .attr('class', 'tooltip')
      .attr('fill', 'black')
      .attr('height', 30)
      .attr('width', l(d.id.length))
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
      .attr('x', l(d.id.length) * 0.5 - 5)
      .attr('textLength', l(d.id.length) * 0.9)
      .attr('opacity', 0)
      .transition().duration(400)
      .attr('opacity', 1)
  }
}

function MouseOut() {
  // d3.select(`#tooltip-${d3.select(this).attr('id')}`).remove()
  removeTooltip()
}

function removeTooltip() {
  tooltips.selectAll('*').remove();
}

function l(x) {
  return Math.max(x * 12, 55)
}

linkMouseOver = function (d) {
  if (d3.select(this).attr('opacity') >= 1) {

    var x = x_ + d3.mouse(this)[0] + 10, y = y_ + d3.mouse(this)[1] - 30;
    tooltip = tooltips
    .append('g')
    .attr('transform', 'translate(' + x + ',' + y + ')')
    .attr('id', `tooltip-${d3.select(this).attr('id')}`)

    var s = d3.sum(d.victorySource
      .filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) }))

    t = d3.sum(d.victoryTarget
      .filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) }))

    text = '(' + s + ') ' + d.source.id + ' - ' + d.target.id + ' (' + t + ')'

    tooltip
    .append('rect').attr('class', 'tooltip')
    .attr('fill', 'black')
    .attr('height', 30)
    .attr('width', l(text.length))
    .attr('y', - 20)
    .attr('x', - 5)
    .attr('rx', 5).attr('ry', 5)


    tooltip
    .append('text').attr('class', 'tooltip')
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .text(text)
    .attr('fill', 'white')
    .attr('x', l(text.length) * 0.5 - 5)
    .attr('textLength', l(text.length) * 0.9)
  }
}

var hidden = false;
var isInfoHidden = true;

var wait=true;
clickNodeV2 = function(d){
  info.transition().duration(500).style('opacity', '1').on('end', function(){
    container.style('filter', 'blur(2px)')
  })
  info.style('display', 'unset');
  info.html(displayInfoNode(d))
  info
  .append('span')
  .attr('id', 'close-time')
  .append('i')
  .attr('class', 'fas fa-times')
  .on('click', toogleInfoVisibility)

  info.append('img')
  .attr('src', `players_img/${d.id}.jpg`)
  .attr('class', `players_img`)
  
  info.append('div').attr('id', 'legend').html(
    '<i class="fas fa-sad-tear"></i> = Elimine en quart <br> \
    <i class="fas fa-meh"></i> = Elimine en demi <br> \
    <i class="fas fa-medal"></i> = Finaliste <br> \
    <i class="fas fa-trophy"></i> = Vainqueur'
  )

  bg.transition().duration(200).style('opacity', 1)

  wait = true
}

clickLinkV2 = function(d){
  info.transition().duration(500).style('opacity', '1').on('end', function(){
    container.style('filter', 'blur(2px)')
  });
  info.style('display', 'unset');
  info.html(displayInfoLink(d))
  info.append('i').attr('class', 'fas fa-times').on('click', toogleInfoVisibility)

  bg.transition().duration(200).style('opacity', 1)
  wait = true
}

function displayInfoNode(d) {

  var linkFilter = graph.selectAll('line').data()
    .filter(function (d_) { return (games(d_) > 0) })
    .filter(function (d_) { return (d_.source == d || d_.target == d) })

  var resultHtmlDisplay = '';

  resultHtmlDisplay = resultHtmlDisplay + "<div id= 'p'>" + d.id + '</div>'

  y = d.years.filter(function (d_) { return (d_ <= dateTo) & (d_ >= dateFrom) })
  y = y.sort()

  tab = []
  previous = 0
  for (i = 0; i < y.length; i++) {
      row = {}

      source = linkFilter.filter(function (d_) { return (d_.source == d) & (d_.years.includes(y[i])) })
      target = linkFilter.filter(function (d_) { return (d_.target == d) & (d_.years.includes(y[i])) })

      row['year'] = y[i]
      
      row['players'] = []
      for (j = 0; j < source.length; j++) {
        row['players'].push(source[j].target.id)
      }
      for (j = 0; j < target.length; j++) {
        row['players'].push(target[j].source.id)
      }

      nv = d.victory[d.years.findIndex(function (x) { return x == y[i] })]

      if (nv == 0) {
       row['result'] = '<i class="fas fa-sad-tear"></i>';
      }
      if (nv == 1) {
        row['result'] = '<i class="fas fa-meh"></i><br><i class="fas fa-square"></i>';
      }
      if (nv == 2) {
        row['result'] ='<i class="fas fa-medal"></i><br><i class="fas fa-square"></i><br><i class="fas fa-square"></i>';
      }
      if (nv == 3) {
        row['result'] = '<i class="fas fa-trophy"></i><br><i class="fas fa-square"></i><br><i class="fas fa-square"></i><br><i class="fas fa-square"></i>';
      }

    tab.push(row)
  }

  resultHtmlDisplay += '<center><table id=node-resume>'
      resultHtmlDisplay += "<tr class=cells>"
      for (var i = 0; i < tab.length; i++){resultHtmlDisplay+=`<td>${tab[i].result}</td>`}
      resultHtmlDisplay += "</tr>"

      resultHtmlDisplay += "<tr class=cells>"
      for (var i = 0; i < tab.length; i++){resultHtmlDisplay+=`<td class=year-cells>${tab[i].year}</td>`}
      resultHtmlDisplay += "</tr>"
  resultHtmlDisplay += '</table></center>'

  return resultHtmlDisplay
}

function displayInfoLink(d) {

  var s = d3.sum(d.victorySource
    .filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) }))

  tt = d3.sum(d.victoryTarget
    .filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) }))

  resultHtmlDisplay = "<div id='link-title'>" + d.source.id + ' - ' + d.target.id + '</div>'

  tab = []
  for (var i = 0; i < d.years.length; i++){
    tab.push({
      'year': d.years[i],
      'victoryTarget': d.victoryTarget[i],
    })
  }

  tab = _.sortBy(tab, 'year')

  resultHtmlDisplay += "<div>Vainqueur:</div> <center><table id=resume_link >"

    resultHtmlDisplay += "<tr>"
    for (var i = 0; i < tab.length; i++){
      if(tab[i].victoryTarget==1){
        resultHtmlDisplay+=`<td>${d.target.id}</td>`
      }else{
        resultHtmlDisplay+=`<td>${d.source.id}</td>`
      }
    }
    resultHtmlDisplay += "</tr>"

    yearSorted= d.years.slice(0).sort();
    resultHtmlDisplay += "<tr>"
    for (var i = 0; i < tab.length; i++){
      resultHtmlDisplay+=`<td class=year-cells>${tab[i].year}</td>`
    }
    resultHtmlDisplay += "</tr>"

  resultHtmlDisplay += "</table></center>"

  return resultHtmlDisplay

}

toogleInfoVisibility = function(){
  if(wait){
    wait=false;
  }else{
    wait=true;
    info.transition().duration(500).style('opacity', '0')
    info.style('display', 'none');
    container.style('filter', 'unset')

    if (STATE.currentStep>=1){
      bg.transition().duration(500).style('opacity', 0.3)
      
    }
  }
};