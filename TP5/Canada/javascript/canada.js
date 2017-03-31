// Noms des principaux partis politique et la couleur qui leur est associée
var partis = ["Bloc Québécois", "Conservateur", "Libéral", "Indépendant", "Parti Vert", "NPD-Nouveau Parti Démocratique"];
var color = d3.scale.ordinal().domain(partis).range(["cyan", "blue", "red", "grey", "green", "orange"]);

/* Chargement de la carte du Canada et des résultats des élections
 */
function chargement() {
    var q = queue();
    q.defer(d3.csv,"./data.csv")
    q.defer(d3.json,"autre carte/CanadaSimple.json")
    q.await(function(error,dataElection,json){
        ready(error, json, dataElection)
    })
}

/* Tri des candidats par numéro de circonscription
   data : fichier CSV 
*/
function sortedByCircumscribing(data) {
    function compare(a, b){
        if(+a.NumeroCirconscription < +b.NumeroCirconscription) {
            return -1;
        } else if(+a.NumeroCirconscription > +b.NumeroCirconscription) {
            return 1;
        } else if(+a.NumeroCirconscription == +b.NumeroCirconscription){
            if(+a.PourcentageVote > +b.PourcentageVote){
                return 1;
            } else if(+a.PourcentageVote < +b.PourcentageVote){
                return -1
            } else{
                return 0;
            }
        }
    }

    data.sort(compare);
	return data
}

/* Retourne une liste contenant le gagnant de chaque circonscription
   electionParDistrict : liste retournée par la fonction nest
*/
function winnerCircumscribing(electionParDistrict) {

    /*  TODO
        Pour chaque circonscription, retourner l'object contenant toutes les informations sur le candidat élu
     */
     previous_circumscribing = electionParDistrict[0].NumeroCirconscription
     list = []
     electionParDistrict.forEach(function(d, i){
        if(i + 1 == electionParDistrict.length){
            list.push(d);
        } else if(d.NumeroCirconscription < electionParDistrict[i+1].NumeroCirconscription){
            list.push(d)
        }
     })
     return list
}

/* Permet de lire en d3 du topojson (utiliser la bibliothèque topojson de d3)
   json : fichier TopoJSON lu par la fonction d3.json de d3
   Retourne le fichier converti
*/
function conversionTopoJSON(json) {
    /*  TODO
        Convertis et retourne les données topoJSON pour les utiliser avec d3.
        Utiliser la bibliothèque topojson
     */
    return topojson.feature(json, json.objects.Canada)
}

/* Créer les circonscriptions dans le svg qui sera affiché dans Leaflet
   Canada : résultat de conversionTopoJSON ; g : svg où sera afficher la visualisation
*/
function circonscriptions(Canada, g, path, gagnantParCirconscription) {
    /*  TODO
        Ajouter des path pour chaque circonscription
        Colorier la circonscription de la couleur du parti élu
        rajouter des metaDonnees de gagnantParCirconscription concernant le candidat élu
        La frontière des circonscriptions est en noire, d'épaisseur 2px
    */
		return g.append("g")
		.selectAll("path")
		.data(Canada.features)
		.enter()
		.append("path")
		.attr("fill",function(d){
			return color(gagnantParCirconscription
				.filter(function(e) {
						return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
			})[0].Parti);
		})
		.attr("stroke","black")
		.attr("stroke-width",2)
		.attr("candidat", function(d) {
			return gagnantParCirconscription.filter(function(e) {
						return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
			})[0].Candidat;
		})	
		.attr("parti", function(d) {
			return gagnantParCirconscription.filter(function(e) {
						return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
			})[0].Parti;
		})	 
		.attr("pourcentage", function(d) {
			return gagnantParCirconscription.filter(function(e) {
						return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
			})[0].PourcentageVote;
		})	
		.attr("nomCirconscription", function(d) {
			return gagnantParCirconscription.filter(function(e) {
						return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
			})[0].NomCirconscription;
		})	
        .attr("numCirconscription", function(d) {
            return gagnantParCirconscription.filter(function(e) {
                        return (e.NumeroCirconscription.localeCompare(d.properties.NUMCF) == 0);
            })[0].NumeroCirconscription;
        })  
        
}

/* Redimensionne et repositionne le SVG sur la carte lors d'une update
    svg : svg D3
    g : groupe contenant les circonscriptions
    path : projection des points sur la carte
    Canada : données topoJSON converties
 */
function positionSVG(svg, g, path, Canada) {
	var bounds = path.bounds(Canada),
    topLeft = bounds[0],
    bottomRight = bounds[1];
	svg.attr("width", bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top", topLeft[1] + "px");

	g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
}

/* Lors d'un zoom, il faut redessiner les path
    circons : toutes les circonscriptions
    path : projection des points sur la carte
 */
function circonsPath(circons, path) {
    /*  TODO
        Préciser ou mettre à jour le path des circonscriptions
     */
	
	circons.attr("d",path)
	 
}