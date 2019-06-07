function ticked() {
	simulation.nodes(
		simulation.nodes().map(function (d) {
			d.x = Math.min(Math.max(d.x, -x_ + 30), width - x_ - 30)
			d.y = Math.min(Math.max(d.y, -y_ + 30), height - y_ - 30)
			return d
		})
	)
	graph.selectAll('.links')
		.attr("x1", function (d) { return d.source.x; })
		.attr("y1", function (d) { return d.source.y; })
		.attr("x2", function (d) { return d.target.x; })
		.attr("y2", function (d) { return d.target.y; });

	graph.selectAll('.nodes')
		.attr("cx", function (d) { return d.x; })
		.attr("cy", function (d) { return d.y; });

}

// drag
function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.1).restart();
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}

var drag = d3.drag()
	.on("start", dragstarted)
	.on("drag", dragged)
	.on("end", dragended)
