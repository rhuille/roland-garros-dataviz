const buildStartPage = function () {
  var startPage = d3.select('#startPage')

  startPage.append('p').style('font-size', '4em').text('Roland Garros Dataviz').style('margin-top', '10px')
    .style('font-family', 'Sofia')
    .style('color', 'rgba(0, 0, 0, 0)').transition().duration(0 * jump).style('color', 'rgba(0, 0, 0, 1)')

  startPage.append('p').style('font-size', '2em').text('Une histoire de champions racontée en data')
    .style('color', 'rgba(0, 0, 0, 0)').transition().delay(1500 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')

  startPage.append('p').style('font-size', '1em').html(' <br> Cliquez sur la flèche ou une touche pour continuer ')
    .style('color', 'rgba(0, 0, 0, 0)').transition().delay(4000 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')

  startPage.append('p').style('font-size', '0.5em').html('<br> <br> dataviz par Raphael Huille, ENSAE')
    .style('color', 'rgba(0, 0, 0, 0)').transition().delay(4500 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')

  var heightIcon = 80;

  startPage.append('a').attr('href', 'https://ensae.fr')
    .append('img').attr('src', 'img/ensae.png').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(4500 * jump).duration(1000 * jump)
    .style('opacity', 1)

  startPage.append('a').attr('href', 'https://github.com/rhuille')
    .append('img').attr('src', 'img/lin.ico').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(4500 * jump).duration(1000 * jump)
    .style('opacity', 1)

  startPage.append('a').attr('href', 'https://www.linkedin.com/in/raphael-huille/')
    .append('img').attr('src', 'img/git.png').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(4500 * jump).duration(1000 * jump)
    .style('opacity', 1)


  fleche.transition().delay(4500 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')
    .on('interrupt', function () { fleche.style('color', 'rgba(0, 0, 0, 1)') })
    .transition().duration(1000 * jump).style('color', 'rgba(0, 0, 0, 0)')
    .on('end', function () { stop = 0; flecheClignote(); })


  reload.transition().delay(4500 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')
  goToEnd.transition().delay(4500 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')

}