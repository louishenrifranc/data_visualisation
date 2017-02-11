// ----------------------------------------------- LINE CHART FOCUS ET CONTEXT ------------------------------------------

// Fonction line du focus
// x : fonction scale horizontale de focus
// y : fonction scale verticale de focus
function createLine(x, y) {

    return d3.svg.line()
            .interpolate('monotone')
    		.x(function(d) {return x(d.date)})
    		.y(function(d) {return y(d.nbVelo)})
    		}

// Fonction line du context
// x2 : fonction scale horizontale de context
// y2 : fonction scale verticale de context
function createLine2(x2, y2) {
	
	return d3.svg.line()
			.x(function(d) {return x2(d.date)})
    		.y(function(d) {return y2(d.nbVelo)})
}

function createFocusLineGraph(focus, sources, line) {

    focus.append("g")
        .attr("clip-path","url(#clip)")
		.selectAll("path")
		.data(sources)
		.enter()
		.append("path")
        .attr("class","line")
		.attr("d", function (d) { return line(d.values); })
		.attr("fill", "none")
		.attr("stroke", function (d) {
		    if (d.name == "Mean") {
		        return "#000000";
		    } else {
		        return color(d.name);
		    }
		})
		.attr("stroke-width", function (d) {
		    if (d.name == "Mean") {
		        return "2px"
		    } else {
		        return "1px"
		    }
		})
       .attr("street_name", function (d) { return d.name});
	// TODO : Associer le clipPath à un attribut g de focus puis dessiner les paths
}

// Création du line chart pour la fenêtre context
function createContextLineGraph(context, sources, line2) {

    context.append("g")
		.selectAll("path")
		.data(sources)
		.enter()
		.append("path")
		.attr("d", function (d) { return line2(d.values); })
		.attr("fill", "none")
		.attr("stroke", function (d) {
		    if (d.name == "Mean") {
		        return "#000000";
		    } else {
		        return color(d.name);
		    }
		})
		.attr("stroke-width", function (d) {
		    if (d.name == "Mean") {
		        return "2px"
		    } else {
		        return "1px"
		    }
		})
        .attr("street_name", function (d) { return d.name });
    // TODO : dessiner les paths de context
}
