// --------------------------------------------------------------------- SCATTERPLOT ---------------------------------------------------------
// --------------------------------------------------- AXES ------------------------------------
/*  Ajoute les axes du graphe
    scatterPlot : emplacement du graphe
    x,y : échelles horizontales et verticales
*/
function axes(scatterGraph, x, y) {
    xAxis = d3.svg.axis()
    xAxis.scale(x).orient("bottom");

    yAxis = d3.svg.axis()
    yAxis.scale(y).orient("left");

    scatterGraph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    scatterGraph.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 15)
        .text("Life expectancy");

    scatterGraph.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    scatterGraph.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Income");
}

// --------------------------------------------------- GRAPHE ------------------------------------

/*  Ajoute le scatterGraph
    scatterGraph : emplacement du graphe
    countries : données transformées du CSV
*/
function scatterPlot(scatterGraph, countries) {
    /* TODO :
            Créer le scatterPlot en associant un cercle à un pays
            Utiliser les échelles pour dimensionner les cercles correctement
            Donner un id à chaque cercle (utiliser normalizeName(string))
            Donner d'autres attributs qui seront utiles pour la tooltip
            Rajouter les events listeners associées à la tool tip    
            Ajouter un eventListener en cliquant sur le cercle : execute la fonction targetClick
    */

    scatterGraph.append("g")
        .selectAll("circle")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return x(d.values.LifeExpectancy)
        })
        .attr("cy", function(d) {
            return y(d.values.Income)
        })
        .attr("r", function(d) {
            return r(d.values.Population)
        })
        .attr("fill", function(d) {
            return color(d.values.Region)
        })
        .attr("id", function(d) {
            return normalizeName(d.name)
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on("click", targetClick)
}

// --------------------------------------------------- LEGENDE ------------------------------------
/*  Ajoute la légende du graphe
    scatterGraph : emplacement du graphe
    regions : toutes les régions géogaphique du CSV, triées
*/
function legend(scatterGraph, regions) {
    var legend = scatterGraph.selectAll(".legend")
        .data(regions)
        .enter().append("g")
        .attr("x", "200px")
        .attr("y", "200px")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 25 + ")";
        })


    legend.append("rect")
        .attr("x", 30)
        .attr("y", 10)
        .attr("width", 10)
        .attr("height", 10)
        .style("stroke-size", "3px")
        .style("stroke", "black")
        .style("fill", function(d) {
            return color(d);
        })
        .attr("street_name", function(d) {
            return d;
        })
        .attr("isVisible", true)

    legend.append("text")
        .attr("x", 46)
        .attr("y", 15)
        .attr("dy", ".35em")
        .style("font-size", "20px")
        .text(function(d) {
            return d;
        })
}
