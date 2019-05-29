

// parameters
var width = document.getElementById('container').offsetWidth,
    height = window.screen.height - 240,
    dateFrom = 2005,
    dateTo = 2017,
    strength = 40,
    timeWidthMargin = 100,
    timeHeightMargin = 50,
    x_ = 0,
    y_ = 0,
    notCentered = true,
    data_,
    stop = 0,
    pseudoDateFrom = dateFrom,
    pseudoDateTo = dateTo;

var data;
var scaleRadius, scaleColor, scaleWidth;


d3.json("data/rolland_.json", (_, data_input) => {
    d3.json("data/position.json", (_, position) => {
        data = augmentData(data_input, position)

        scaleRadius = d3
        .scalePow().exponent(1)
        .domain([
            d3.min(data.nodes, function (d) { return d.years.length }),
            d3.max(data.nodes, function (d) { return d.years.length })
        ])
        .range([5, 25]);

        scaleColor = d3
        .scalePow().exponent(1)
        .domain([
            d3.min(data.nodes, function (d) { return d3.sum(d.victory) / (d3.sum(d.victory) + d3.sum(d.defeat)) }),
            d3.max(data.nodes, function (d) { return d3.sum(d.victory) / (d3.sum(d.victory) + d3.sum(d.defeat)) })
        ])
        .range(["#FFFFFF", "#f4c838"]);

        scaleWidth = d3
        .scaleLinear()
        .domain([
            d3.min(data.links, function (d) { return d.years.length }),
            d3.max(data.links, function (d) { return d.years.length })
        ])
        .range([3, 20]);
    });
});

// var goToEnd = d3.select("#container")
//     .append('span')
//     .attr('id', 'goToEnd')
//     .style('color', 'rgba(0, 0, 0, 0)')
//     .html('&#8631')
//     .on('click', function () {
//         svg.attr("width", width).attr("height", height);
//         counter = story.length;
//         fleche.interrupt();
//         textStory.html('')
//         textStory.selectAll().remove();
//         goToEndF();
//     })


var date = d3.select("#container")
    .append("div")
    .attr('id', 'date')
    .html("&nbsp");

// var info = d3.select("#container")
//     .append("div")
//     .attr('id', 'info').html("&nbsp");

// var signature = d3.select("#container")
//     .append("div")
//     .attr('id', 'signature');


var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id }))
    .force('collide', d3.forceCollide(10))
    .force("charge", d3.forceManyBody().strength(-strength))



function augmentData(data, position){
    data.nodes = data.nodes.map(function (d) {
        i = position.data.findIndex(function (d_) { return d_.id == d.id })
        d.x = position.data[i].x;
        d.y = position.data[i].y;
        d.vx = 0;
        d.vy = 0;

        return d
    })

    data.links = data.links.map(function (d) {
        i = data.nodes.findIndex(function (d_) { return d_.id == d.source })
        j = data.nodes.findIndex(function (d_) { return d_.id == d.target })

        d.source = data.nodes[i]
        d.target = data.nodes[j]

        return d
    })

    return data
}

function loadInitialGraph(data){
    graph
    .selectAll('line')
    .data(data.links)
    .enter()
    .append('line')
    .attr('class', 'links')
    .attr('id', function (d) { return d.source.id + d.target.id })
    .attr('stroke-width', function (d) { return scaleWidth(games(d)) })
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; })
    .attr('opacity', 0)

    graph
    .selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'nodes')
    .attr('id', function (d) { return d.id })
    .attr('cx', function (d) { return d.x })
    .attr('cy', function (d) { return d.y })
    .attr('r', 0)
    .attr('fill', 'black')
    .attr('opacity', 0)
}



// style function
function participation(d) {
    return d.years.filter(function (y) {
        return (y <= dateTo) & (y >= dateFrom)
    }).length
}

function ratio(d) {
    vt = d.victory.filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) })
    df = d.defeat.filter(function (e, i) { return (d.years[i] <= dateTo) & (d.years[i] >= dateFrom) })

    return d3.sum(vt) / (d3.sum(vt) + d3.sum(df))
}

function games(d) {
    return d.years.filter(function (y) {
        return (y <= dateTo) & (y >= dateFrom)
    }).length
}


function center() {
    var a = graph.selectAll('.nodes').data().filter(function (d) { return (participation(d) > 0) })

    if (a.length > 0) {

        x_ = width * 0.5 - a.map(function (d) { return d.x }).reduce(function (t, c) { return t + c }, 0) / a.length
        y_ = height * 0.5 - a.map(function (d) { return d.y }).reduce(function (t, c) { return t + c }, 0) / a.length

        graph
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + x_ + "," + y_ + ")")
    }
}


let counter = 0;
function go() {
    if (stop == 0) {
        if (counter < story.length && counter >= 0) {
            step = story[counter]
            console.log(counter)
            textStory
                .transition()
                .duration(1000 * jump)
                .style('left', '0%')
                .on('start', function () { stop = 1; })
                .on('end', function () { textStory.html(step.text) })//update text
                .transition()
                .duration(3000 * jump * (counter > 0))
                .style('left', '-100%')
                .transition()
                .duration(0)
                .style('left', '+100%')
                .transition()
                .duration(3000 * jump)
                .style('left', '0%')
                .on('end', function () {
                    if (step.f) { step.f(); }
                    stop = 0
                })
            counter++;
        }
    }
}

function hideLandingPageAndStartStory() {
    startPage
    .style('top', '0vh')
    .transition().ease(d3.easeLinear).duration(1000)
    .style('top', '-200vh')
    .on('end', function(){
        startPage.style('display', 'none')
        d3.select("#text-story-container")
        .style('opacity', '0')
        .transition().ease(d3.easeLinear).duration(500)
        .style('opacity', '1')
        .on('end', go)
    });
}

function toogleNavBarIfMouseUp(e) {
    if (e.clientY < 90) {
        navBar.style('top', '0vh')
    }
    else {
        navBar.style('top', '-10vh')
    }
}


function goToStep(i){
    var jumpSauv = jump
    jump=0

    go()
    jump = jumpSauv
}