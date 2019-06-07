

// parameters
var width = window.innerWidth,
    height = window.innerHeight-50,
    dateFrom = 2005,
    dateTo = 2018,
    strength = 40,
    timeWidthMargin = 100,
    timeHeightMargin = 50,
    x_ = 0,
    y_ = 0,
    notCentered = true,
    data_,
    pseudoDateFrom = dateFrom,
    pseudoDateTo = dateTo;


var language = window.navigator.userLanguage || window.navigator.language;
var data;
var scaleRadius, scaleColor, scaleWidth;


window.onresize = function(event) {
    width = window.innerWidth,
    height = window.innerHeight-50,

    container
    .style('height', window.innerHeight+'px')

    d3
    .select('#bg')
    .style('width', window.innerWidth + 'px')
    .style('height', window.innerHeight + 'px')

    svg.attr("width", width)
    .attr("height", height);
};

container
.style('height', window.innerHeight+'px')

d3
.select('#bg')
.style('width', window.innerWidth + 'px')
.style('height', window.innerHeight + 'px')

svg.attr("width", width).attr("height", height);

// document.getElementById('container').getBoundingClientRect().height


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

function loadInitialGraph(){
    console.log('loadInitialGraph')
    graph.selectAll('*').remove()
    tooltips.selectAll('*').remove()
    time.selectAll('*').remove()
    dateFrom = 2005;
    dateTo = 2018;
    date.html('')

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
    .on('mouseover', linkMouseOver)
    .on('mouseout', MouseOut)

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
    .on('mouseover', function () { nodeMouseOver(d3.select(this)) })
    .on('mouseout', MouseOut)

    center();
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


// data
let STATE = {
    currentStep: 0,
    targetStep: 0,
}


// computed
function jump (){
    if(STATE.targetStep == STATE.currentStep){
        return 0.2
    }
    else if((STATE.targetStep - STATE.currentStep) == 1){
        return 0.5
    }else{
        return 0
    }
}

function balanced (){
    return STATE.currentStep == STATE.targetStep
}

function currentSlide(){
    return story[STATE.currentStep]
}



// method
function launchStepUp(){
    if(STATE.currentStep > STATE.targetStep + 1){
        console.error(`You can't launchStepUp when currentStep = ${STATE.currentStep} > targetStep + 1 = ${STATE.targetStep +1}`)
        return undefined;
    }
    if(STATE.currentStep == STATE.targetStep + 1){
        console.warn('oups : one step up...')
        STATE.currentStep = STATE.targetStep;
        d3.selectAll('.timeline-element').style('opacity', 0.5).style('padding', '5px').style('margin', '5px')
        d3.select(`#slide-${STATE.targetStep-1}`).style('opacity', 1).style('padding', '10px').style('margin', '0px')
        return undefined;
    }
    console.log('beggining', STATE)

    d3.selectAll('.timeline-element').style('opacity', 0.5).style('padding', '5px').style('margin', '5px')
    d3.select(`#slide-${STATE.targetStep-1}`).style('opacity', 1).style('padding', '10px').style('margin', '0px')

    if (currentSlide().f) { 
        currentSlide().f(); 
    }
    STATE.currentStep = STATE.currentStep + 1;

    console.log('end', STATE)
    if(!balanced()){
        launchStepUp();
    }
}

var __stop__=false;
function goToTargetStep() {
        if(__stop__){
        return;
    }
    if(STATE.currentStep == 0){
        loadInitialGraph();
    }
    if(STATE.targetStep > story.length){
        return undefined
    }
    if(STATE.targetStep == STATE.currentStep){
        return undefined
    }
    if(STATE.targetStep < STATE.currentStep){ // back in step ? 
        // redo all from the beggining
        loadInitialGraph();
        STATE.currentStep = 0;
        launchStepUp()
    };
    if (STATE.targetStep > STATE.currentStep) {
        launchStepUp()
    };
}

function goToNextStep (){
        if(__stop__){
        return;
    }

    if(balanced()){
        STATE.targetStep = STATE.targetStep + 1;

        textStory
        .style('left', '0%')
        .transition().duration(500)
        .style('left', '-100%')
        .transition().duration(0)
        .style('left', '+100%')
        .on('end', function () { textStory.html(story[STATE.targetStep-1][`text_${currentLangue}`]) })//update text
        .transition()
        .duration(500)
        .style('left', '0%')
        .on('end', goToTargetStep)
    }
};

function goToPreviousStep (){
        if(__stop__){
        return;
    }
    if(balanced()){
        STATE.targetStep = STATE.targetStep - 1;
        textStory
        .style('left', '0%')
        .transition().duration(500)
        .style('left', '+100%')
        .transition().duration(0)
        .style('left', '-100%')
        .on('end', function () { textStory.html(story[STATE.targetStep-1][`text_${currentLangue}`]) })//update text
        .transition()
        .duration(500)
        .style('left', '0%')
        .on('end', goToTargetStep)
    };
};

function goToStep(step){
        if(__stop__){
        return;
    }
    if(balanced()){
        STATE.targetStep = step+1;
        textStory
        .style('left', '0%')
        .transition().duration(500)
        .style('left', '-100%')
        .transition().duration(0)
        .style('left', '+100%')
        .on('end', function () { textStory.html(story[STATE.targetStep-1][`text_${currentLangue}`]) })//update text
        .transition()
        .duration(500)
        .style('left', '0%')
        .on('end', goToTargetStep)  
    };
};

svg.style('display', 'none')
function hideLandingPageAndStartStory() {
    svg.style('display', 'unset')
    bg.transition().duration(1000).style('opacity', 0.3)

    var durationBlink = 300
    var ease = d3.easeSin
    d3.select("#go-to-next")
    .style('font-size', '4vmax')
    .transition()
    .delay(6000)
    .on('start', function(){
        if (STATE.currentStep == 1){
            d3.select("#go-to-next")
            .style('font-size', '4vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '6vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '4vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '6vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '4vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '6vmax')
            .transition().duration(durationBlink).ease(ease)
            .style('font-size', '4vmax')
        }
    })


    startPage
    .style('top', '0vh')
    .transition().ease(d3.easeLinear).duration(500)
    .style('top', '-200vh')
    .on('end', function(){
        startPage.style('display', 'none')

        d3.select(`#slide-0`)
        .style('opacity', 1)
        .style('padding', '10px')
        .style('margin', '0px')

        timelineContainer
        .style('opacity', 0)
        .transition().ease(d3.easeLinear).duration(500)
        .style('opacity', 1)

        d3.select("#text-story-container")
        .style('opacity', '0')
        .transition().ease(d3.easeLinear).duration(500)
        .style('opacity', '1')
        .on('end', function(){
            goToStep(0);
        })
    });
}

function toogleNavBar() {
    if(navBar.style('top') == '0vh' ){
        navBar.style('top', '-11vh')
        d3.select('#nav-bar-shower-container').style('top','-2vh')
    }else{
        navBar.style('top', '0vh')
        d3.select('#nav-bar-shower-container').style('top', '9vh')
    }
}


function hideNavBar() {
    navBar.style('top', '-11vh')
    d3.select('#nav-bar-shower-container').style('top', '-2vh')
}

open_ensae = function(){
    window.open('https://www.ensae.fr/','_blank')
}

open_toucan = function(){
    window.open('https://toucantoco.com/','_blank')
}


function giveMeFeedBack() {
    
    info.transition().duration(500).style('opacity', '1').on('end', function(){
        container.style('filter', 'blur(2px)')
    })
    info.style('display', 'unset');
    info.html("My mail addresse: ")

    info
    .append('span')
    .attr('id', 'close-time')
    .append('i')
    .attr('class', 'fas fa-times')
    .on('click', toogleInfoVisibility)
    
    bg.transition().duration(200).style('opacity', 1)

    wait = true
}


function switchLangue(l) {
    if(l=='en'){
        d3.selectAll('.lang-en').style('display', 'unset')
        d3.selectAll('.lang-fr').style('display','none')
        currentLangue = 'en'

        // goToNextStep()

    }else{
        d3.selectAll('.lang-fr').style('display','unset')
        d3.selectAll('.lang-en').style('display','none')     
        currentLangue = 'fr'
        // goToNextStep()
    }
}


if(language.includes('en')){
    switchLangue('en')
}else{
    switchLangue('fr')
}