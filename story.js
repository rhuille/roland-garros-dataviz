

var jump = 0.1;

const story = [
  {
    'text': "Les internationaux de France Simple Messieurs - Rolland Garros - <br> est un tournois de tennis parmis les plus prestigieux du monde <br> C'est une longue épopée de champions s'affrontant au tennis sur terre battue ! ",
    'f': function () {}
  },
  {
    'text': 'Considérons un point qui représentera Rafael Nadal <br>   &nbsp',
    'f': function () {
      svg.attr("width", width).attr("height", height);

      graph.select('#NADAL')
        .transition()
        .duration(500 * jump)
        .attr('r', 5)
        .attr('fill', 'black')
        .attr('opacity', 1)
        .on('end', function () { stop = 0; nodeMouseOver(d3.select(this)); })
    }
  },

  {
    'text': 'Faisons le gros car il a beaucoup participé entre 2005 et 2017 <br>   &nbsp',
    'f': function () {
      graph.select('#NADAL')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': 'Et on le colorie en vert foncé car son nombre de victoire est grand ! <br>   &nbsp',
    'f': function () {
      graph.select('#NADAL')
        .transition().duration(500 * jump)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': 'Ajoutons un autre joueur bien connu : Andy Murray <br>   &nbsp',
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('r', 5)
        .attr('fill', 'black')
        .attr('opacity', 1)
        .on('end', function () { stop = 0; nodeMouseOver(d3.select(this)); })
    }
  },
  {
    'text': "Comme il a moins participé aux phases finales que Nadal, on le représente par un point plus petit <br> &nbsp",
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': "En outre, son taux de victoire est moins bon que Rafael Nadal. On utilise donc une couleur plus claire <br>   &nbsp ",
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () { stop = 0; })
    }
  },


  {
    'text': " <strong> Le rayon du point </strong> est proportionel est nombre d'année ou le joueur a atteind les quarts de final  <br><strong> L'intensité de la couleur </strong> du point est proportionel au taux de victoire du joueur ",
    'f': function () { stop = 0; }
  },

  {
    'text': " Par exemple, voici comment on représente le suisse Rodger Federer <br> Il a plus participé que Murray, mais moins que Nadal. Son ratio de victoire est moins bon que Nadal",
    'f': function () {

      graph.select('#FEDERER')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('opacity', 1)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () {
          // **********//

          stop = 0;

          var d = d3.select(this).datum(),
            x = x_ + d.x + 10, y = y_ + d.y - 30;

          tooltip = tooltips.append('g').attr('transform', 'translate(' + x + ',' + y + ')')

          tooltip.append('rect')
            .attr('class', 'tooltip')
            .attr('fill', 'black')
            .attr('height', 30)
            .attr('width', l(d.id.length))
            .attr('y', -21)
            .attr('x', - 50)
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
            .attr('x', l(d.id.length) * 0.5 - 50)
            .attr('textLength', l(d.id.length) * 0.9)
            .attr('opacity', 0)
            .transition().duration(400)
            .attr('opacity', 1)
          // **********//

        })
    }
  },


  {
    'text': " Et voici le français Richard Gasquet. <br> Il n'est parvenu qu'une seule année en phase finale et il y a perdu son seul match",
    'f': function () {
      graph.select('#GASQUET')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('opacity', 1)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () { stop = 0; nodeMouseOver(d3.select(this)); })

    }
  },

  {
    'text': "Pour representer les matchs entre ces joueurs, on dessine des liens entre les points. <br> Voici le lien entre Federer et Nadal",
    'f': function () {

      MouseOut();
      graph.select('#FEDERERNADAL')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
        .on('end', function () { stop = 0; })
    }
  },


  {
    'text': "Ajoutons celui entre Murray et Nadal. <br> On le dessine moins epais car Murray et Nadal se sont moins affronté que Federer et Nadal",
    'f': function () {

      graph.select('#MURRAYNADAL')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': " <strong> L'épaisseur du lien </strong> est proportionelle au nombre de match en phase finale entre les deux joueurs <br>  &nbsp",
    'f': function () {

      graph.select('#GASQUETMURRAY')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': "On ajoute tous les joueurs pour visualiser le graph de la periode 2005 - 2017 <br>  &nbsp ",
    'f': function () {

      loadTime(data_);

      MouseOut();

      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .transition()
        .duration(2000 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .attr('opacity', 1)
        .on('end', function () { stop = 0; })

    }
  },

  {
    'text': "Et puis tous les matchs entre les joueurs  <br>  &nbsp",
    'f': function () {

      graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
        .transition()
        .duration(2000 * jump)
        .attr('stroke-width', function (d) { return scaleWidth(games(d)) })
        .attr('opacity', 1)
        .on('end', function () { stop = 0; })
    }
  },

  {
    'text': "On voit se démarquer Rafael Nadal, le grand champion de Rolland Garros. <br> Il n'a perdu qu'une seule fois après les quarts de final ! ",
    'f': function () { look('NADAL'); stop = 0; }
  },

  {
    'text': "Notez Federer et Djokovic deux autres grands joueurs, mais au taux de victoire plus faible<br>  &nbsp",
    'f': function () { look('FEDERER'); look('DJOKOVIC'); stop = 0; }
  },

  {
    'text': "Wavrinka, vainqueur en 2015, qui a un bon taux de victoire mais peut de participation<br>  &nbsp",
    'f': function () { restore('NADAL'); restore('FEDERER'); restore('DJOKOVIC'); look('WAWRINKA'); stop = 0; }
  },

  {
    'text': "Le français Gael Monfils, qui a été éliminé 3 fois en quart de final et une fois en demi finale<br>  &nbsp",
    'f': function () { restore('WAWRINKA'); look('MONFILS'); stop = 0; }
  },


  {
    'text': "Vous pouvez explorer le graph en passant la souris sur les points et les liens <br>  pour faire apparaire le nom du joueurs",
    'f': function () {
      restore('MONFILS');
      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseover', function () { nodeMouseOver(d3.select(this)) })

      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseout', MouseOut)

      graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
        .on('mouseover', function () { linkMouseOver(d3.select(this)) })

      graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
        .on('mouseout', MouseOut)
      stop = 0;
    }

  },


  {
    'text': "Maintenant on va animer le graphe pour voir <strong>l'évolution</strong> des joueurs depuis 2005 <br> Cliquez sur la flèche pour lancer l'animation",
    'f': function () {
      dateTo = 2005;
      updateTime();
      update();
    }
  },

  {
    'text': "Observez bien comment les joueurs s'ajoutent autour de Nadal, Federer et Djokovic qui grossissent année après années <br> &nbsp",
    'f': function () {
      d3.select('#NADAL').style('stroke-width', 3)
      d3.select('#FEDERER').style('stroke-width', 3)
      d3.select('#DJOKOVIC').style('stroke-width', 3)
      evolution(2018); stop = 0;
    }
  },

  {
    'text': " Et si on revenait en 1980 ? <br> (Notez que mon historique des données remonte à 1980) ",
    'f': function () {
      dateFrom = 1980
      dateTo = 1982;
      updateTime();
      update();
      d3.select('#NADAL').style('stroke-width', 0)
      d3.select('#FEDERER').style('stroke-width', 0)
      d3.select('#DJOKOVIC').style('stroke-width', 0)
    }
  },

  {
    'text': " Ainsi Borg a déjà remporté 6 fois Rolland Garros. <br> Ces données ne sont pas disponibles, cela n'est donc pas visible sur la taille du point représentant Borg ",
    'f': function () {
      look('BORG'); stop = 0;
    }
  },

  {
    'text': "Notez qu'en 1983 le français Yannik Noah remporte le tournois ! <br> &nbsp  ",
    'f': function () {
      MouseOut();
      restore('BORG');

      d3.select('#NOAH').transition().duration(1000).style('stroke-width', 3).on('end', function () { stop = 0; })
      nodeMouseOver(d3.select('#NOAH'));

      evolution(1984);
    }
  },


  {
    'text': "On va faire avancer le temps. Une nouvelle génération va apparaitre. <br> observez l'émergence de Lendl, Willander et Connors",
    'f': function () {

      MouseOut();
      d3.select('#NOAH').transition().duration(1000).style('stroke-width', 0).on('end', function () { stop = 0; })
      look('LENDL'); look('CONNORS'); look('WILANDER');
    }
  },

  {
    'text': "Notez comment le graph va s'étendre progressivement vers la droite... <br> &nbsp  ",
    'f': function () {
      MouseOut();

      restore('LENDL'); restore('CONNORS'); restore('WILANDER');
      d3.select('#LENDL').style('stroke-width', 3)
      d3.select('#CONNORS').style('stroke-width', 3)
      d3.select('#WILANDER').style('stroke-width', 3)
      evolution(1989); stop = 0;

    }
  },

  {
    'text': "En 1988 c'est la fin de cette génération et une nouvelle va apparaitre. <br> Voyez-vous la différence avec la précédente ?  ",
    'f': function () {
      evolution(1997);
    }
  },

  {
    'text': "Muster et Kafelnikov ont participé 3 fois et remporté une seule fois chacun <br> &nbsp",
    'f': function () {
      look('MUSTER'); look('KAFELNIKOV'); stop = 0;
    }
  },

  {
    'text': "Et puis Courier et Bruguera : <br> vainqueur 2 fois chacun",
    'f': function () {
      restore('MUSTER'); restore('KAFELNIKOV');
      look('COURIER'); look('BRUGUERA'); stop = 0;
    }
  },

  {
    'text': "Il n'y a pas de 'gros' joueurs, c'est à dire des joueurs revenant régulièrement en phase finale <br> &nbsp",
    'f': function () {
      MouseOut();
      restore('COURIER'); restore('BRUGUERA'); stop = 0;

    }
  },

  {
    'text': "C'est toujours le cas si on regarde jusqu'en 2004 <br> &nbsp ",
    'f': function () {
      evolution(2004); stop = 0;
      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseover', function () { nodeMouseOver(d3.select(this)) })

      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseout', MouseOut)
    }
  },

  {
    'text': "Regardez Agassi : il a joué en 1988 contre Wilander en quart, et en 2003 (15 ans après !) contre Corras <br> Il a beaucoup participé mais sur une très longue perdiode de temps.",
    'f': function () {
      look('AGASSI'); stop = 0;
    }
  },

  {
    'text': "Et ici Federer <br> encore un petit point car il n'a joué qu'une seule fois en 2001",
    'f': function () {
      restore('AGASSI'); look('FEDERER'); stop = 0;
    }
  },

  {
    'text': "Voici, enfin le graph en entier : <br> vers la gauche on voit les joueurs les plus anciens, et vers la droite les plus récents",
    'f': function () {
      restore('FEDERER');
      dateTo = 2017;
      updateTime();
      update();
    }
  },

  {
    'text': "En résumé depuis 1980, on observe 3 périodes...",
  },

  {
    'text': "D'abord la période 1980 - 1988 : <br> dominé par Lendl, Connors et Willander",
    'f': function () {
      dateFrom = 1980;
      dateTo = 1988;
      updateTime();
      update();
    }
  },

  {
    'text': "Ensuite la longue période 1988 - 2004 : <br> ou se succèdent de nombreux champions mais aucuns ne sort vraiment du lots <br> &nbsp",
    'f': function () {
      dateFrom = 1988
      dateTo = 2005
      updateTime();
      update();
    }
  },


  {
    'text': "Et enfin les années 2005-2017 : <br> qui voient l'emergence d'une génération largement dominées par trois joueurs : Rafael Nadal, Rodger Federer et Novak Djokovic",
    'f': function () {
      dateFrom = 2005
      dateTo = 2017
      updateTime();
      update();
    }
  },

  {
    'text': "Mais il y a encore des histoires que je n'ai pas raconté... à vous de les découvrir ! <br> Vous pouvez changer la date, déplacer les points et clicker dessus pour en faire apparaitre plus ! ",
    'f': goToEndF
  },


]


function evolution(x) {
  // fleche.on('click', function () { })
  d3.select('body').on('keydown', function () { })

  svg.transition().duration(1000)
    .on('end', function () {
      dateTo++;
      if (dateTo < x) {
        update();
        updateTime();
        // svg.append('text').text(dateTo).attr('oppacity', 0.8).attr('transform', 'scale(5)')
        evolution(x);
      }
      else {
        // fleche.on('click', go)
        d3.select('body').on('keydown', go)
      }
    })
}


function update() {

  graph.selectAll('.nodes')
    .transition().duration(500)
    .attr('r', function (d) { return scaleRadius(participation(d)) })
    .attr('fill', function (d) { return scaleColor(ratio(d)) })
    .attr('opacity', function (d) { return participation(d) + 0 })
    .on('end', function () { stop = 0; })

  graph.selectAll('.links')
    .transition().duration(500)
    .attr('stroke-width', function (d) { return scaleWidth(games(d)) })
    .attr('opacity', function (d) { return games(d) + 0 })

  center();
}


function look(name) {
  var n = d3.select('#' + name);

  n.transition().duration(1000).style('stroke-width', 3)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 3) })

  n.transition().delay(1000).duration(1000).style('stroke-width', 0)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 0) })

  n.transition().delay(2000).duration(1000).style('stroke-width', 3)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 3) })
  //xx = n.datum().x,
  //yy = n.datum().y;

  tooltips = svg.append('g');
  nodeMouseOver(n);
}


function restore(name) {
  var n = d3.select('#' + name);

  n.transition().duration(0).style('stroke-width', 0)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 0) })


  tooltips = svg.append('g');
  MouseOut();
}


function goToEndF() {

  loadTime(data_);
  dateFrom = 1980;
  updateTime();
  update();

  tooltips = svg.append('g');

  svg.transition().delay(1000).on('start', function () {
    simulation.nodes(data_.nodes).on("tick", ticked); // from ticked.js
    simulation.force("link").links(data_.links);
    simulation.alphaTarget(0.1).restart();
  })
    .on('end', function () {
      simulation.alphaTarget(0);
      time.select('#from').call(dragTime);
      time.select('#to').call(dragTime);

      graph.selectAll('.nodes').on('mouseover', function () { nodeMouseOver(d3.select(this)) })
      graph.selectAll('.nodes').on('mouseout', MouseOut)

      graph.selectAll('.links').on('mouseover', linkMouseOver)
      graph.selectAll('.links').on('mouseout', MouseOut)


      graph.selectAll('.nodes').on('click', clickNode)
      graph.selectAll('.links').on('click', clickLink)

      graph.selectAll('.nodes').call(drag)

    })


  var heightIcon = 50;
  signature.append('p').style('font-size', '1em').html('dataviz par Raphael Huille, ENSAE')
    .style('color', 'rgba(0, 0, 0, 0)').transition().delay(0 * jump).duration(1000 * jump).style('color', 'rgba(0, 0, 0, 1)')

  signature.append('a').attr('href', 'https://ensae.fr')
    .append('img').attr('src', 'img/ensae.png').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(0 * jump).duration(1000 * jump)
    .style('opacity', 1)

  signature.append('a').attr('href', 'https://github.com/rhuille')
    .append('img').attr('src', 'img/lin.ico').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(0 * jump).duration(1000 * jump)
    .style('opacity', 1)

  signature.append('a').attr('href', 'https://www.linkedin.com/in/raphael-huille/')
    .append('img').attr('src', 'img/git.png').attr('height', heightIcon)
    .style('opacity', 0).transition().delay(0 * jump).duration(1000 * jump)
    .style('opacity', 1)



}


