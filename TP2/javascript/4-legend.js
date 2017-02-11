// ------------------------------------------------------ LEGENDE ----------------------------------------

function dispThis(e) {
	attr = "street_name"
	console.log(e.getAttribute(attr));
	if(e.getAttribute("isVisible") == "true") {
		e.style.fill = "#FFFFFF";
		e.setAttribute("isVisible", "false");
		line = document.getElementsByTagName("svg")
		console.log(line)
	} else{
		e.style.fill = changecolor(e.getAttribute(attr));
		e.setAttribute("isVisible", "true");
		line = document.getElementsByTagName("svg").getElementByAttribute(attr, e.getAttribute(attr));
		console.log(line)
	}
 
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
function changecolor(d) {
	if (d == "Mean") {
	    return "black";
        } else {
	    return color(d);
	}
}
// Crée une légende dynamique
// sources : données de data triées par nom puis par date
function createLegend(sources) {
    
var legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("x", "300px")
    .attr("y", "300px")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })


legend.append("rect")
    .attr("x", 70)
    .attr("y", 20)
    .attr("width", 18)
    .attr("height", 18)
    .style("stroke-size", "3px")
    .style("stroke", "black") 
    .style("fill", function(d) { return changecolor(d); })
    .attr("street_name", function(d) { return d; })
    .attr("onclick", "dispThis(this)")
    .attr("isVisible", true)

legend.append("text")
    .attr("x", 70 + 20)
    .attr("y", 29)
    .attr("dy", ".35em")
    .style("font", "12px")
    .text(function(d) { return replaceAll(d, '_',' ') } )

}

