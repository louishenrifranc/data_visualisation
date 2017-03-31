/* Chargement de la carte du Quebec et des différentes informations à afficher
 */
function chargement() {
    /*  TODO
     Charger les données et lancer la fonction "ready" à la fin des chargements
     */
    var q = queue();
    q.defer(d3.json,"./data/quebec.geojson")
    q.defer(d3.json,"./data/routes.geojson")
    q.defer(d3.json,"./data/aerobases.geojson")
    q.await(function(error,quebec,routes,aerobases){
        ready(error, quebec, routes, aerobases)
    })
}

/*  Création des éléments à placer sur le SVG
    quebec : données geoJSON de quebec
    routes : données geoJSON sur les routes du Quebec
    aerobases : données geoJSON sur les bases aériennes du Québec
 */
function d3Features(quebec, routes, aerobases) {
    /*  TODO
        Ajouter des paths pour chacune des données à afficher
     */

    // Découpage du Québec sur d3
    var d3_quebec = g.append("g")
        .selectAll("path")
        .data(quebec.features)
        .enter()
        .append("path")
        .attr("fill", function(d) {
            return "None"
        })   
        .attr("stroke","black")
        .attr("stroke-width", 1)

    // Routes du Québec sur d3
    var d3_roads = g.append("g")
        .selectAll("path")
        .data(routes.features)
        .enter()
        .append("path")
        .attr("stroke","purple")
        .attr("stroke-width", 2)
        .attr("fill","None")

    // Aéroports du Québec sur d3
    var d3_aerobases = g.append("g")
        .selectAll("path")
        .data(aerobases.features)
        .enter()
        .append("path")
        .attr("fill", function(d) {
            if(d.properties.TRP_DE_IND == "Aéroport"){
                return "red"
            } else{
                return "blue"
            }
        })
        .attr("location", function(d){
            return d.properties.TRP_NM_TOP;
        })
        .attr("type", function(d){
            return d.properties.TRP_DE_IND;
        })

    return [d3_quebec, d3_roads, d3_aerobases]

}

/* Redimensionne et repositionne le SVG sur la carte lors d'une update
 */
function positionSVG(svg, g, path, quebec) {
    var bounds = path.bounds(quebec),
    topLeft = bounds[0],
    bottomRight = bounds[1];
    svg.attr("width", bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top", topLeft[1] + "px");

    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
}

/* Mise à jour des éléments d3 sur la carte
    d3_quebec : elements path delimitant le Quebec
    d3_roads : elements path des routes du Quebec
    d3_aerobases : elements path des bases aeriennes du Quebec
    path : projection des points sur la carte
 */

function featuresUpdate(d3_quebec, d3_roads, d3_aerobases, path) {

    /*  TODO
     Préciser ou mettre à jour les différents path
     Se référer à la section "Affichage des données" de l'énoncé pour gérer le cas du zoom
     Un zoom est considéré comme très faible lorsqu'il est inférieur ou égal à 3
     */

    if(map.getZoom() <= 3 ){
        pathAero = path.pointRadius(0)
        pathRoad = ''
    } else {
        pathAero = path.pointRadius(map.getZoom());
        pathRoad = path;
    }

    
    d3_quebec.attr("d",path)
    .attr("stroke-width",function(d){
        if(map.getZoom() <= 3){
            return 1;
        } else {
            return 2;
        }
    })
    d3_roads.attr("d",pathRoad)
    d3_aerobases.attr("d", pathAero)
}

/*
     d3_aerobases.attr("d",function(y) {
        return path.pointRadius(10)
    })   

        if(map.getZoom() <= 3){
            console.log("LA")
            return path.pointRadius(1000*map.getZoom());
        } else{
            return path.pointRadius(100);
        }*/