// Créer une balise div identifiable de 600*1000
function createDiv(){
    /*  TODO
     Créer une balise div
     */
        d3.select("body")
        .append("div")
        .attr("id", "map")
        .style("height",600+"px")
        .style("width",1000+"px")
}

/* Associe le fond de carte de l'url à la balise div précedemment créée
 url : lien vers le fond de carthographie
 */
function linkDivToLeaflet(url){

    // Copyright à utiliser pour le fond de carte
    var copyright = "Tiles courtesy of <a href='http://openstreetmap.se/=' target='_blank'>OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>";

    /*  TODO
     En utilisant la bibliothèque Leaflet, créer une carte en utilisant le fond de carthographie de l'URL
     Associer cette carte à la balise div
     Initialiser la vue sur le Canada avec un zoom permettant de voir l'ensemble du territoire canadien
     Si on scroll à gauche ou à droite sur la carte, l'affichage svg doit toujours être affiché
     */

    var map = L.map('map').setView([65.1304, -106.3568], 3);

    L.tileLayer(url, {
        attribution: copyright
    }).addTo(map);

    return map;
}

/* Associe D3 à Leaflet
 map : carte Leaflet
 */
function linkD3toLeaflet(map) {

    /*  TODO
     Rajouter un élément svg dans l'overlayPane de map
     Rajouter un g dans le svg et lui donner une classe "leaflet-zoom-hide"
     */

    var svg = d3.select(map.getPanes().overlayPane).append("svg");
    var g = svg.append("g").attr("class", "leaflet-zoom-hide");

    return [svg, g];
}

/* Permet de projeter un point CRS sur la carte
 x et y : CRS d'un point
 */
function projectPoint(x, y) {

    /*  TODO
     Créer la projection d'un point CRS sur la carte
     Afficher ce point sur la carte
     */
     var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);

}

// Création d'un path pour projeter l'ensemble des points de geoJSON sur Leaflet
function createPath(){

    /*  TODO
     Créer une transformation avec d3.geo utilisant projectPoint pour la transformation
     Toujours avec d3.geo, retourner un path utilisant comme projection la transformation précedemment définie
     */

    var transform = d3.geo.transform({point: projectPoint});
    var path = d3.geo.path().projection(transform);
    return path;

}