// ----------------------------------------------- ECHELLE ET DOMAINE ------------------------------------------------------
// Echelle pour les positions des cercles et son rayon
var x; // abscisse : espérance de vie 

var y; // ordonnée : revenu

var r; // rayon des cercles

var color; // couleur des cercles

/* Retourne une liste contenant l'ensemble des régions géographiques
   data : données brutes du CSV
*/
function getRegions(data) {
    var regions = [];
    /* TODO : 
            ajouter les régions de data à la liste regions
            si elles n'ont pas déjà été ajoutées
    */

    data.forEach(function(d) {
        if (!regions.includes(d.Region)) {
            regions.push(d.Region)
        }
    })

    return regions;
}

/*  Définit l'ensemble des fonctions scales
    data : données brutes du CSV
    regions : toutes les régions géogaphique du CSV
*/
function setDomains(data, regions) {

    x = d3.scale.linear().range([0, width])
    x.domain([35, 90])

    y = d3.scale.linear().range([height, 0])
    y.domain([0, 140000])

    r = d3.scale.linear().range([5, 20])
    var minR = d3.min(data, function(c) {
        return +c.Population
    });
    var maxR = d3.max(data, function(c) {
        return +c.Population
    });
    r.domain([minR, maxR])

    color = d3.scale.category10();
    color.domain(regions);
}

// ----------------------------------------------- PRETRAITEMENT DES DONNEES ----------------------------------------------

/* Retourne une liste d'object similaire à sources du TP2 : liste d'object possédant une propriété name pour le nom du pays puis une propriété contenant l'ensemble des autres valeurs 
data : données brutes du CSV
*/
function countriesArray(data) {
    /* Liste d'objet contenant le nom du pays ainsi que
    son revenu par habitant; son espérance de vie et sa population*/
    var countries = [];
    data.forEach(function(d) {
        var entry = {};
        entry.name = d.Country;
        entry.values = {
            Income: d.Income,
            LifeExpectancy: d.LifeExpectancy,
            Population: d.Population,
            Region: d.Region
        };
        countries.push(entry);
    })
    return countries;
}

/*  Tri les pays dans l'ordre alphabétique
    countries : données transformées du CSV
*/
function sortPays(countries) {
    return countries.sort(function(a, b) {
        return d3.ascending(a.name, b.name)
    })
}


// ----------------------------------- NORMALISATION DES NOMS DE PAYS ------------------------------
// Retourne une string sans espace ni point, tout en minuscule
function normalizeName(name) {
    if (typeof name == "string") return name.replace(/\s+/g, '').replace(/\./g, '').toLowerCase();
}

// ------------------------------------ TRI DES REGIONS DANS UN ORDRE DEFINI  ---------------------------------

function manualSort(regions) {
    tmp = regions.slice(0);
    regions.forEach(function(region) {
        tmp[switchRegion(region)] = region;
    })
    return tmp;
}

function switchRegion(region) {
    switch (region) {
        case "North America":
            return 0;
        case "Latin America & Caribbean":
            return 1;
        case "Europe & Central Asia":
            return 2;
        case "East Asia & Pacific":
            return 3;
        case "South Asia":
            return 4;
        case "Middle East & North Africa":
            return 5;
        case "Sub-Saharan Africa":
            return 6;
    }
}
