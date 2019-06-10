

var jump = 0.1;

const story = [
  {
    'text_fr': "Les internationaux de France Simple Messieurs - Roland Garros - <br> est un tournois de tennis parmi les plus prestigieux du monde <br> D'incroyables générations de champions s'y succèdent sur la terre battue des courts ! ",
    'text_en': "The French international Men's singles - Roland Garros - <br> leads among worldwide tennis tournaments  <br> Successive generations of tennis champions fought for victory on the legendary clay court ! ",
   'f': function () {

      img_intoContainer = textStory
      .append('div')
      .attr('id', 'img_into-container')

      img_intoContainer
      .style('opacity', 0)
      .transition().duration(500)
      .style('opacity', 1)

      img_intoContainer.append('div')
      .attr('id', 'img_into-container-left')

      img_intoContainer.append('div')
      .attr('id', 'img_into-container-right')

      img_intoContainer
      .append('img')
      .attr('src', 'players_img/GASQUET.jpg')
      .attr('class', 'img_intro')

      img_intoContainer
      .append('img')
      .attr('src', 'players_img/NOAH.jpg')
      .attr('class', 'img_intro')
      
      img_intoContainer
      .append('img')
      .attr('src', 'players_img/NADAL.jpg')
      .attr('class', 'img_intro')

      img_intoContainer
      .append('img')
      .attr('src', 'players_img/BORG.jpg')
      .attr('class', 'img_intro')

      img_intoContainer
      .append('img')
      .attr('src', 'players_img/DJOKOVIC.jpg')
      .attr('class', 'img_intro')

      // document.getElementById('img_into-container').scrollIntoView();

    }
  },
  {
    'text_fr': 'Commençons par dessiner un point qui représentera Rafael Nadal <br>   &nbsp',
    'text_en': "Let's start by drawing a point that will represent Rafael Nadal <br>   &nbsp",
    'f': function () {
      
      img_intoContainer.remove()

      graph.select('#NADAL')
        .transition()
        .duration(500 * jump)
        .attr('r', 5)
        .attr('fill', 'black')
        .attr('opacity', 1)
        .on('end', function () {  nodeMouseOver(d3.select(this));})
    }
  },

  {
    'text_fr': 'Rafael Nadal a beaucoup participé aux phases finales du tournois entre 2005 et 2018, nous allons donc grossir largement le point <br>   &nbsp',
    'text_en': "As he attended the final stages of the tournament a lot between 2005 and 2018, let's make it very large <br>   &nbsp",
    'f': function () {
      graph.select('#NADAL')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
    }
  },

  {
    'text_fr': 'Nous allons également colorer le rond en jaune foncé pour représenter son grand nombre de victoires ! <br>   &nbsp',
    'text_en': "Let's color it with a yellow as dark as the number of times Rafael Nadal won  ! <br>   &nbsp",
    'f': function () {
      graph.select('#NADAL')
        .transition().duration(500 * jump)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
    }
  },

  {
    'text_fr': 'Maintenant, ajoutons un autre joueur bien connu : Andy Murray <br>   &nbsp',
    'text_en': "Now let's add another well-known player : Andy Murray <br>   &nbsp",
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('r', 5)
        .attr('fill', 'black')
        .attr('opacity', 1)
        .on('end', function () { nodeMouseOver(d3.select(this)); })
    }
  },
  {
    'text_fr': "Dessinons lui un point plus petit comme il a moins participé aux phases finales que Nadal <br> &nbsp",
    'text_en': "His point will be smaller because he took part in less Roland Garros final stages than Rafa <br> &nbsp",
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
    }
  },

  {
    'text_fr': "La couleur de son point est plus claire du fait de son nombre moins important de victoires <br>   &nbsp ",
    'text_en': "Let's make its color lighter for his amount of victories is smaller <br>   &nbsp ",
    'f': function () {
      graph.select('#MURRAY')
        .transition().duration(500 * jump)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
    }
  },


  {
    'text_fr': " <strong> Le rayon du point </strong> est proportionel est nombre d'année ou le joueur a atteind les quarts de final  <br><strong> L'intensité de la couleur </strong> du point est proportionelle au taux de victoires du joueur ",
    'text_en': " <strong> The point's radius </strong> is proportional to the number of years the tennis player reached the quarter-finals  <br><strong> The intensity of the point color </strong> is proportional to the player's victory rate",
    'f': function () { stop = 0; }
  },

  {
    'text_fr': " Par exemple, voici comment on représente le suisse Rodger Federer <br> Il a plus participé que Murray, mais moins que Nadal. Son ratio de victoires est moins bon que Nadal",
    'text_en': " For example, here is how you would represent Rodger Federer <br> He played more final stages than Murray but less than Nadal. His victory rate is not as good as Nadal's",
    'f': function () {

      graph.select('#FEDERER')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('opacity', 1)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () { nodeMouseOver(d3.select(this)); })
    }
  },


  {
    'text_fr': " Et voici le français Richard Gasquet. <br> Il n'est parvenu qu'une seule année en phase finale et il y a perdu son seul match",
    'text_en': " Here is the French player Richard Gasquet. <br> He only reached final stages once and lost his only match",
    'f': function () {
      graph.select('#GASQUET')
        .transition().duration(500 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('opacity', 1)
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .on('end', function () {  nodeMouseOver(d3.select(this));})

    }
  },

  {
    'text_fr': "Pour répresenter les matchs entre ces joueurs, dessinons des liens entre les points. <br> Voici le lien entre Federer & Nadal",
    'text_en': "Let's represent tennis matches between players with links between their points <br> Here is the link between Federer & Nadal",
    'f': function () {

      removeTooltip();
      graph.select('#FEDERERNADAL')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
    }
  },


  {
    'text_fr': "Ajoutons celui entre Murray et Nadal. <br> On le dessine moins épais car Murray et Nadal se sont moins affrontés que Federer et Nadal",
    'text_en': "Let's add the link between Murray & Nadal. <br> Let's draw it thinner since Murray & Nadal did not play together as much as Federer & Nadal",
    'f': function () {

      graph.select('#MURRAYNADAL')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
    }
  },

  {
    'text_fr': " <strong> L'épaisseur du lien </strong> est proportionelle au nombre de matchs en phase finale entre les deux joueurs <br>  &nbsp",
    'text_en': " <strong> The thickness of the link </strong> is proportional to the amount of final stages matches between the two players <br>  &nbsp",
    'f': function () {

      graph.select('#GASQUETMURRAY')
        .transition().duration(500 * jump)
        .attr('opacity', 1)
    }
  },

  {
    'text_fr': "On ajoute tous les joueurs pour visualiser le graphe complet de la période 2005 - 2018 <br>  &nbsp ",
    'text_en': "Let's add all the other final stages players between 2005 & 2018 <br>  &nbsp ",
    'f': function () {

      loadTime(data_);

      removeTooltip();

      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .transition()
        .duration(2000 * jump)
        .attr('r', function (d) { return scaleRadius(participation(d)) })
        .attr('fill', function (d) { return scaleColor(ratio(d)) })
        .attr('opacity', 1)

    }
  },

  {
    'text_fr': "Et puis tous les matchs entre les joueurs  <br>  &nbsp",
    'text_en': "And also all the matches between them  <br>  &nbsp",
    'f': function () {

      graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
        .transition()
        .duration(2000 * jump)
        .attr('stroke-width', function (d) { return scaleWidth(games(d)) })
        .attr('opacity', 1)
    }
  },

  {
    'text_fr': "On voit se démarquer Rafael Nadal, le grand champion de Roland Garros. <br> Il n'a perdu qu'une seule fois après les quarts de finale ! ",
    'text_en': "Rafael Nadal clearly stands above, he is the latest great champion of Roland Garros. <br> He only lost once after the quarter-finals ! ",
    'f': function () { look('NADAL'); stop = 0; }
  },

  {
    'text_fr': "Notez Federer et Djokovic, deux autres grands joueurs, mais au taux de victoire plus faible<br>  &nbsp",
    'text_en': "Take a look at Federer & Djokovic, two other amazing players, but with a victory rate slightly lighter<br>  &nbsp",
    'f': function () { look('FEDERER'); look('DJOKOVIC');}
  },

  {
    'text_fr': "Wavrinka, vainqueur en 2015, qui a un bon taux de victoire mais peut de participation<br>  &nbsp",
    'text_en': "Wavrinka, winner in 2015, has a great victory rate but a small participation rate<br>  &nbsp",
    'f': function () { restore('NADAL'); restore('FEDERER'); restore('DJOKOVIC'); look('WAWRINKA'); }
  },

  {
    'text_fr': "Le français Gael Monfils, qui a été éliminé 3 fois en quart de final et une fois en demi-finale<br>  &nbsp",
    'text_en': "The French player Gael Monfils, has been eliminated 3 times in the quarter-finals and once in the semi-finals<br>  &nbsp",
    'f': function () { restore('WAWRINKA'); look('MONFILS'); }
  },


  {
    'text_fr': "Vous pouvez explorer le graphe en passant la souris sur les points et les liens <br>  pour faire apparaire le nom du joueurs",
    'text_en': "You can explore the graph by mousing over the points and links <br>  to show the names of the players",
    'f': function () {
      MouseOut()
      // graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
      //   .on('mouseover', function () { nodeMouseOver(d3.select(this)) })

      // graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
      //   .on('mouseout', MouseOut)

      // graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
      //   .on('mouseover', function () { linkMouseOver(d3.select(this)) })

      // graph.selectAll('.links').filter(function (d) { return (games(d) > 0) })
      //   .on('mouseout', MouseOut)
      
    }

  },
  {
    'text_fr': "Animons le graphe pour voir <strong>l'évolution</strong> des joueurs depuis 2005 <br> Allez à l'étape suivante pour lancer l'animation",
    'text_en': "Let's start animating the viz and seeing <strong>the evolution</strong> of the players since 2005 <br> Go to the next step to launch the animation",
    'f': function () {
      dateTo = 2005;
      updateTime();
      update();
    }
  },

  {
    'text_fr': "Observez bien comment les joueurs s'ajoutent autour de Nadal, Federer et Djokovic qui grossissent année après années <br> &nbsp",
    'text_en': "See how many players add up around Nadal, Federer and Djokovic and how these 3 grow year after year <br> &nbsp",
    'f': function () {
      d3.select('#NADAL').style('stroke-width', 3)
      d3.select('#FEDERER').style('stroke-width', 3)
      d3.select('#DJOKOVIC').style('stroke-width', 3)
      __stop__ = true;
      evolution(2018);

    }
  },
  {
    'text_fr': " Et si on revenait en 1980 ? <br> (Notez que mon historique des données remonte à 1980) ",
    'text_en': " Now what if we went back to 1980 ? <br> (Note that my data history only goes back to 1980) ",
    'f': function () {
      removeTooltip();
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
    'text_fr': " Ainsi Borg a déjà remporté 6 fois Roland Garros. <br> Ces données ne sont pas disponibles, cela n'est donc pas visible sur la taille du point qui le représente ",
    'text_en': " Although Borg won Roland Garros 6 times, <br> these data are not available and it is thus not visible on the point representing him ",
    'f': function () {
      look('BORG');
    }
  },

  {
    'text_fr': "Notez qu'en 1983 le français Yannik Noah remporte le tournois ! <br> &nbsp  ",
    'text_en': "In 1983 you can see the French player Yannik Noah winning the tournament ! <br> &nbsp  ",
    'f': function () {
      removeTooltip();
      restore('BORG');

      d3.select('#NOAH').transition().duration(1000).style('stroke-width', 3).on('end', function () {  })
      nodeMouseOver(d3.select('#NOAH'));

      evolution(1984);
    }
  },


  {
    'text_fr': "On va faire avancer le temps. Une nouvelle génération va apparaitre. <br> observez l'émergence de Lendl, Willander et Connors",
    'text_en': "Let's move in time. A new champion generation is emerging. <br> You can see for example Lendl, Willander or Connors",
    'f': function () {

      removeTooltip();
      d3.select('#NOAH').transition().duration(1000).style('stroke-width', 0).on('end', function () {  })
      look('LENDL');look('CONNORS');look('WILANDER');
    }
  },

  {
    'text_fr': "Notez comment le graphe va s'étendre progressivement vers la droite... <br> &nbsp  ",
    'text_en': "The graph is progressively expending to the right... <br> &nbsp  ",
    'f': function () {
      removeTooltip();

      restore('LENDL'); restore('CONNORS'); restore('WILANDER');
      d3.select('#LENDL').style('stroke-width', 3)
      d3.select('#CONNORS').style('stroke-width', 3)
      d3.select('#WILANDER').style('stroke-width', 3)
      evolution(1989);

    }
  },

  {
    'text_fr': "En 1988 c'est la fin de cette génération et une nouvelle va apparaître. <br> Voyez-vous la différence avec la précédente ?  ",
    'text_en': "In 1988 you can note the end of a generation and a new one is going to emerge. <br> Can you see the difference with the previous one ?  ",
    'f': function () {
      evolution(1997);
    }
  },

  {
    'text_fr': "Muster et Kafelnikov ont participé 3 fois et remporté une seule fois chacun",
    'text_en': "Muster & Kafelnikov participated 3 times and each of the two won once",
    'f': function () {
      look('MUSTER');look('KAFELNIKOV');
    }
  },

  {
    'text_fr': "Et puis Courier et Bruguera : vainqueurs deux fois chacun",
    'text_en': "Courier & Bruguera :  won twice each",
    'f': function () {
      restore('MUSTER'); restore('KAFELNIKOV');
      look('COURIER'); look('BRUGUERA'); stop = 0;
    }
  },

  {
    'text_fr': "Il n'y a pas de 'gros' joueurs, c'est à dire des joueurs revenant régulièrement en phase finale <br> &nbsp",
    'text_en': "There is no 'great' champion, meaning that no player stayed regularly until the final stages <br> &nbsp",
    'f': function () {
      removeTooltip();
      restore('COURIER');restore('BRUGUERA');

    }
  },

  {
    'text_fr': "C'est toujours le cas si on regarde jusqu'en 2004 <br> &nbsp ",
    'text_en': "And it will remain the case until 2004 <br> &nbsp ",
    'f': function () {
      removeTooltip();
      evolution(2004);
      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseover', function () { nodeMouseOver(d3.select(this)) })

      graph.selectAll('.nodes').filter(function (d) { return (participation(d) > 0) })
        .on('mouseout', MouseOut)
    }
  },

  {
    'text_fr': "Regardez Agassi : il a joué en 1988 contre Wilander en quart, et en 2003 (15 ans après !) contre Corras Il a beaucoup participé mais sur une très longue période de temps.",
    'text_en': "Take a look at Agassi : he played in 1988 against Wilander in quarter-finals, and then again in 2003 (i.e. 15 years later !) against Corras He participated a lot but over a very long period of time.",
    'f': function () {
      look('AGASSI');
    }
  },

  {
    'text_fr': "Et ici Federer encore un petit point car il n'a joué qu'une seule fois en 2001",
    'text_en': "Here appears Federer he still has a small point because he only played once in 2001",
    'f': function () {
      restore('AGASSI'); look('FEDERER');
    }
  },

  {
    'text_fr': "Voici, enfin le graphe en entier : <br> vers la gauche on voit les joueurs les plus anciens, et vers la droite les plus récents",
    'text_en': "Here comes the full graph : <br> you can see the older players on the left, and the most recent ones on the right",
    'f': function () {
      removeTooltip();
      restore('FEDERER');
      dateTo = 2018;
      updateTime();
      update();
    }
  },

  {
    'text_fr': "Depuis 1980, on voit se distinguer nettement 3 périodes",
    'text_en': "3 distinct periods are now clearly visible",
  },

  {
    'text_fr': "D'abord la période 1980 - 1988 : dominée par Lendl, Connors et Willander",
    'text_en': "The first one between 1980 - 1988: led by Lendl, Connors & Willander",
    'f': function () {
      removeTooltip();
      dateFrom = 1980;
      dateTo = 1988;
      updateTime();
      update();
    }
  },

  {
    'text_fr': "Ensuite la longue période 1988 - 2004: où se succèdent de nombreux champions mais aucun ne sort vraiment du lot <br> &nbsp",
    'text_en': "Then follows the long periode from 1988 to 2004: <br> a lot of small champions are emerging but none of them really stands apart <br> &nbsp",
    'f': function () {
      removeTooltip();
      dateFrom = 1988
      dateTo = 2005
      updateTime();
      update();
    }
  },


  {
    'text_fr': "Et enfin les années 2005-2018 qui voient l'émergence d'une génération largement dominée par trois joueurs : Rafael Nadal, Rodger Federer et Novak Djokovic",
    'text_en': "Finally comes the 2005-2018 period: a clear generation of 3 champions is born made of Rafael Nadal, Rodger Federer et Novak Djokovic",
    'f': function () {
      removeTooltip();
      dateFrom = 2005
      dateTo = 2018
      updateTime();
      update();
    }
  },

  {
    'text_fr': "Il y a encore des histoires que je n'ai pas raconté... à vous de les découvrir ! <br> Cliquez sur les points et les lignes, déplacez les et changez la date ! ",
    'text_en': "There a still a lot of stories that haven't been told... it is up to you to discover them ! <br> You can click on the points and links, move them around and change the date ! ",
    'f': goToEndF
  },


]



function evolution(x) {
  __stop__ = true;
  if (jump()==0){
    __stop__ = false;
    dateTo = x;
    update();
    updateTime();
    return;
    
  }
  svg.transition().duration(2000*jump())
    .on('end', function () {
      dateTo++;
      if (dateTo < x) {
        update();
        updateTime();
        evolution(x);
      }else{
        __stop__ = false;
      }
    })
}


function update() {

  graph.selectAll('.nodes')
    .transition().duration(1000*jump())
    .attr('r', function (d) { return scaleRadius(participation(d)) })
    .attr('fill', function (d) { return scaleColor(ratio(d)) })
    .attr('opacity', function (d) { return participation(d) + 0 })
    .on('end', function () {  })

  graph.selectAll('.links')
    .transition().duration(1000*jump())
    .attr('stroke-width', function (d) { return scaleWidth(games(d)) })
    .attr('opacity', function (d) { return games(d) + 0 })

  center();
}


function look(name) {
  var n = d3.select('#' + name);

  n.transition().duration(1000*jump()).style('stroke-width', 3)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 3) })

  n.transition().delay(1000*jump()).duration(1000).style('stroke-width', 0)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 0) })

  n.transition().delay(2000*jump()).duration(1000).style('stroke-width', 3)
    .on('interrupt', function () { d3.select(this).style('stroke-width', 3) })
  nodeMouseOver(n);
}


function restore(name) {
  d3.select('#' + name).style('stroke-width', 0)
  removeTooltip();
}


function goToEndF() {
  loadInitialGraph();

  loadTime(data);
  dateFrom = 1980;
  updateTime();
  update();

  d3.selectAll('.nodes').style('cursor', 'pointer')
  d3.selectAll('.links').style('cursor', 'pointer')

  svg.transition().delay(1000*jump()).on('start', function () {
    simulation.nodes(data.nodes).on("tick", ticked);// from ticked.js
    simulation.force("link").links(data.links);
    simulation.alphaTarget(0.1).restart();
  })
    .on('end', function () {
      simulation.alphaTarget(0);
      time.select('#from').call(dragTime);
      time.select('#to').call(dragTime);

      graph.selectAll('.nodes').on('click', clickNodeV2)
      graph.selectAll('.links').on('click', clickLinkV2)

      graph.selectAll('.nodes').call(drag)

    })

  textStory
  .transition()
  .duration(500)
  .delay(3000)
  .style('left', '-100%').on('end', function(){
    
    var durationBlink = 300;
    var ease = d3.easeSin;
    d3.select('#info-opener')
    .transition().duration(durationBlink)
    .style('opacity', 1)
    .style('font-size', '2vmax')
    .transition().duration(durationBlink).ease(ease).delay(500)
    .style('font-size', '5vmax')
    .transition().duration(durationBlink).ease(ease)
    .style('font-size', '2vmax')
    .transition().duration(durationBlink).ease(ease)
    .style('font-size', '4vmax')
    .transition().duration(durationBlink).ease(ease)
    .style('font-size', '2vmax')
    .transition().duration(durationBlink).ease(ease)
    .style('font-size', '3vmax')
    .transition().duration(durationBlink).ease(ease)
    .style('font-size', '2vmax')
    
    d3.select('#info-opener').on('click', function(){
      info.transition().duration(500).style('opacity', '1').on('end', function(){
        container.style('filter', 'blur(2px)')
      })
      info.style('display', 'unset');

      if(currentLangue=='fr'){
        info.html('Cette vizualisation est interactive !<br>\
        Déplacez les points et cliquez dessus :<br>\
        <img src="tutos/moove.gif"></img><br>\
        Changez la période:<br>\
        <img src="tutos/video.gif"></img>'
        )
      }else{
        info.html('This vizualisation is interactive!<br>\
        You can move the points and click on them:<br>\
        <img src="tutos/moove.gif"></img><br>\
        Change the date period:<br>\
        <img src="tutos/video.gif"></img>'
        )
      }

      info
      .append('span')
      .attr('id', 'close-time')
      .append('i')
      .attr('class', 'fas fa-times')
      .on('click', toogleInfoVisibility)

      wait = true;
    })

  })
}
