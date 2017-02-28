// Création d'un histogramme pour une station donnée
/*
 width, height, margin : dimension des svg
 histogram : données de la station sélectionnée en histogramme
 nbTotal, nbTotalPerTerminus : nombre de tous les trajets pour une station et détail entre deux stations
 names : noms des quartiers, pour la légende horizontale
 i : numéro du svg
 x,y,color : fonction scales
 */
function createBarChart(width,height,margin,histogram,nbTotal,nbTotalPerTerminus,names,i,x,y,color){

    /*  TODO
     Créer un svg en respectant les conventions sur les marges
     Créer un bar chart en utilisant comme données l'histogram
     Les bar sont noires sauf pour celle concernant la station d'origine : utiliser color dans ce cas
     Ajouter un titre ("title") indiquant pour chaque bar le pourcentage à 0.1% des trajets correspondant DANS LE BAR CHART
     En passant la souris sur un bar (hover), le rectangle devient rouge. Vous pouvez utiliser les sélecteurs CSS
     */
    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "barChart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var bar = svg.selectAll("rect")
		.data(histogram)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.x); })
		.attr("y", function(d) { return y(d.y); })
		.attr("height", function(d) {return height - y(d.y); })
		.attr("width", function(d) { return x.rangeBand(); })
    return svg;
}

/* Rajoute la légende au svg actuel
 svg : histogramme actuel
 y : fonction scale
 names : nom des stations
 nbTotalPerTerminus : ensemble des trajets de la station d'origine à une autre station
 */
function createLegend(svg,y,names,nbTotalPerTerminus){
    xAxis = d3.svg.axis()
    xAxis.scale(x).orient("bottom")
		.tickFormat(function(d) { return names[parseInt(d/0.8)]; })
    yAxis = d3.svg.axis()        

    yAxis.scale(y).orient("left");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

        .selectAll("text")  
            .style("text-anchor", "start")
            .attr("transform", "rotate(30)" )
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", -6)
        .attr("x", 120)
        .style("font-size", "15px")
        .text("Nombre de trajet");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")         
	.text(nbTotalPerTerminus.names);
    /*  TODO
        Rajouter l'axe vertical en utilisant y
        Il faudra légèrement modifier la position du titre de l'axe pour qu'il n'empiète pas sur l'histogramme.
        Le titre de l'axe doit avoir une police de 15px

        Rajouter l'axe horizontal en utilisant names
        Faire une rotation de 30° sur les noms et les afficher avec une police de 15px

        Rajouter un titre à l'histogram : le nom de la station de départ.
        Le titre doit être centré horizontalement et ne pas empiéter sur le bar chart.
        Le titre doit avoir une police de 20px et être affiché en caractère gras

     */

}
