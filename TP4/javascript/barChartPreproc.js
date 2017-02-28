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

}/*  Retourne les noms des stations
 data : données brutes du CSV
 */
function getNames(data) {
    var names = [];

    /*  TODO
     Si names ne possède pas un nom, le rajouter

     */

	 data.forEach(function(d){
		 
		if(!names.includes(d.EndStation)){
			names.push(d.EndStation)
		}
		
		if(!names.includes(d.StartStation)){
			names.push(d.StartStation)
		}
		 
	 });
	 
    return names;
}

/*  Créer et retourne les fonctions scales x, y et color usuelles et précise les range.
 width, height : dimension du SVG
 names : noms des stations
 */
function setScalesRangesFunctions(width, height, names) {
    x = d3.scale.ordinal().rangeRoundBands([0, width],.1)
    y = d3.scale.linear().range([height,0])
    color = d3.scale.category10();
    color.domain(names); 
    return [x, y, color]
}

/*  Retourne le tri les trajets selon la station d'origine
 data : données brutes du CSV
 */
function sortPerStreetData(data, names) {
    /*   TODO
        Comme pour le TP2, on va créer une liste de n objets (ou n est le nombre de station) possédant les propriétés suivantes :
        .name : nom de la station
        .terminus : liste de string contenant tous les trajets depuis la station .name. Il y a donc plusieurs fois les mêmes strings

     */
	 
	 var res = [];
	 
	 names.forEach(function(n){
		 
		var entry = {};
		entry.names = n;
		var terminus = [];
		
		data.forEach(function(d){
			if(d.StartStation == n){
				terminus.push(d.EndStation)
			}
		});
		
		entry.terminus = terminus;
		res.push(entry);
	 });

    return res;
}

/*  Retourne l'histogramme des données sélectionnées
 activeData : données sélectionnées (dataSet pour une station)
 names : nom des rues
 */
function createHistogram(activeData, names) {
    var bins = d3.layout.histogram().bins(names.length).value(function(d) {
        return names.indexOf(d)
    })(activeData.terminus);
    return bins
}

/*  Précise le domain de x et y
 x,y : fonction scale
 histogram : l'histogramme précédent
 */
function setDomains(histogram, x, y) {
    intervalX = [] 
    histogram.forEach(function(d) { intervalX.push(d.x) })
    x.domain(intervalX)
    
    maxY = d3.max(histogram, function(d) { return d.y});
    y.domain([0, maxY])

    /* TODO
        Préciser le domain de x et y en utilisant les données de histogram
     */
}

/*  Réduit à 1 dans l'histogramme le nombre de fois où la station de départ est mentionnée
 histogram : histogramme des données sélectionnées
 names : noms des stations

 */
function setHistogram(histogram, names) {
    histogram.map(function(d) { d.splice(0, d.y - 1) })

    /*  TODO
        Réduire les données contenues dans les listes de histogram à une seule fois le nom de la station de départ

     */
}

/*  Retourne le total des trajets en provenance de la station d'origine
 activeData : données d'une station
 */
function getTotal(activeData){
    /*  TODO
        Grâce à sortPerStreetData, c'est immédiat !
     */
    return activeData.terminus.length;
}

/*  Retourne le nombre de trajet par station

 */
function getTotalPerTerminus(data,names) {
    allNames = []
    names.forEach(function(d) { allNames.push(normalizeName(d)) })
    // Recopie profonde de data
    var res = JSON.parse(JSON.stringify(data));
    delete res.terminus;  
    counter = {}
    allNames.forEach(function(a) {
    	counter[a] =data.terminus.filter(function(d) {
    			return normalizeName(d) == a;
    	}).length
    })
    res.nb_trip = counter
}

// Retourne une string sans caractère spécial (pour ce TP)
function normalizeName(name){
    if (typeof name == "string") return name.replace(/\s+|\(|\)|-|\//g, "")
}
