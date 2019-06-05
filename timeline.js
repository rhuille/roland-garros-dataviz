

timeline
.selectAll('div')
.data(story)
.enter()
.append('div')
.attr('id', function(d, i){return `slide-${i}`})
.attr('class', 'timeline-element')
.on('click', function(d, i){
  goToStep(i)
})

