/* Crée et affiche la légende sur le SVG
 partis : liste des différents partis de l'élection
 color : donne la couleur associée au parti
 */
function legende(partis, color) {

    // Dimensions de la légende
    var margin = {
            top: 10,
            right: 20,
            bottom: 20,
            left: 10
        },
        width = 180 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    /*  TODO
        Créer un nouvel élément SVG
        Afficher la légende précisant la couleurs des partis
        Pour le texte du Nouveau Parti Démocratique, indiquer seulement NPD
     */

     svgLegend = d3.select("#map")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style({"position": "absolute", "bottom": "20px", "right": "5px"})
        .style("opacity",0.9)
        .append("rect")
        .attr("fill","rgb(250,200,150)")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


    var legend = svgLegend.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("x", "0px")
        .attr("y", "0px")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })

    legend.append("rect")
        .attr("x", 70)
        .attr("y", 20)
        .attr("width", 18)
        .attr("height", 18)
        .style("stroke-size", "3px")
        .style("stroke", "black") 
        .style("fill", function(d) { return color(d); })
}

/* Création de la toolbox et ajout des eventListener aux paths
    svg : SVG de la carte
    circons : ensemble des éléments path représentant les différentes circonscriptions
 */
function infoToTip(data1) {
   return data1.attr("nomCirconscription") + "<br/>" +
       "Circonscription : " + data1.attr("numCirconscription") + " <br/>" +
       "Candidat : " + data1.attr("candidat") + " <br/>" +
       "Parti : " + data1.attr("parti") + " <br/>" +
       "Pourcentage des voix : " + data1.attr("pourcentage") + " <br/>";

}

function tip(svg, circons) {  
   var tip = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function(d) {
       		attr = d3.select(this).attr()
           return infoToTip(attr);
       });   

   svg.call(tip);
   circons.on('mouseover', tip.show)
          .on('mouseout', tip.hide)
}   
