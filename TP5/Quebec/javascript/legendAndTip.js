/* Crée et affiche la légende sur le SVG
 */
function legende() {

    // Création d'un conteneur svg pour afficher la légende associée à la couleur des partis politiques
    var margin = {
            top: 15,
            right: 20,
            bottom: 20,
            left: 10
        },
        width = 180 - margin.left - margin.right,
        height = 110 - margin.top - margin.bottom;

    /*  TODO
     Créer un nouvel élément SVG
     Afficher la légende précisant les différents éléments ajoutés
     Pour les bases aeriennes, vous pouvez utiliser des cercles
     Pour les frontières et les routes; vous pouvez utiliser des lignes
     */

    legend = d3.select("#map")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .style({"position": "absolute", "bottom": "20px", "right": "5px"})
    .style("opacity",0.9)
        .append("g")
            
  legend.append("rect")
      .attr("fill","rgb(250,200,150)")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
  
  legend.append("circle")
    .attr("cx", 20)
    .attr("cy", 20)
    .attr("r", 5)
    .attr("fill", "blue")
    
  legend.append("circle")
    .attr("cx", 20)
    .attr("cy", 40)
    .attr("r", 5)
    .attr("fill", "red")
    
  legend.append("line")
    .attr("x1", 10)
    .attr("y1", 60)
    .attr("x2", 30)
    .attr("y2", 60)
    .attr("stroke","purple" )
    
  legend.append("line")
    .attr("x1", 10)
    .attr("y1", 80)
    .attr("x2", 30)
    .attr("y2", 80)
    .attr("stroke","black" )
    
  legend.append("text")
    .attr("x", 40)
    .attr("y", 25)
    .style("font", "12px")
    .text("Hydrobase")

  legend.append("text")
    .attr("x", 40)
    .attr("y", 45)
    .style("font", "12px")
    .text("Aéroport")

  legend.append("text")
    .attr("x", 40)
    .attr("y", 65)
    .style("font", "12px")
    .text("Route")

  legend.append("text")
    .attr("x", 40)
    .attr("y", 85)
    .style("font", "12px")
    .text("Découpage Administratif")
    
}

/* Création de la toolbox et ajout des eventListener aux paths
 svg : SVG de la carte
 aerobases : ensemble des éléments path représentant les différentes bases aeriennes
 */
function infoToTip(data) {
   
   return "Type : " + data.properties.TRP_DE_IND + "<br/>" +
       "Lieu : " + data.properties.TRP_NM_TOP + " <br/>"
}

function tip(svg, aerobases) {    /*  TODO
    La toolTip doit contenir :
    le lieu de la base aérienne
    le type de la base aérienne (aéroport ou hydrobase)     Rajouter les eventListeners de la toolTip à aerobases
    */
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return infoToTip(d);
        });
   svg.call(tip);
   a = aerobases.filter(function(d){ return d.properties.TRP_DE_IND == "Aéroport";})

   a.on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}