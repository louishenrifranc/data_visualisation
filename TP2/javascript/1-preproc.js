// ----------------------------------------------- PRETRAITEMENT DES DONNEES ----------------------------------------------
/* Parse les dates des données pour avoir des objets Date
   data : données brutes contenus dans le CSV 
*/
function parseData(data) {
    var i = 0;
    for (i = 0; i < data.length; i++) {
        var format = d3.time.format("%d/%m/%Y");
        data[i].Date = format.parse(data[i].Date);
    }

}

/* Calcule la moyenne quotidienne des vélos
   Crée une nouvelle propriété "Moyenne" dans data pour indiquer cette moyenne
   data : données brutes contenus dans le CSV
*/
function procMean(data) {
    data.forEach(function (entry) {
        mean = 0;
	nb_element = 0
        Object.keys(entry).forEach(function (key, index) {
            if (key != 'Date') {
                mean = mean + parseInt(entry[key])
		nb_element = nb_element + 1
            }
        });
        entry.Mean = mean / nb_element
    })
}

// Scale permettant d'associer 10 valeurs à 10 couleurs différentes
var color = d3.scale.category10();

/* Précise le domaine de color en associant un nom de rue à une couleur
   data : données brutes contenues dans le CSV
   color : fonction scale précédente
*/
function domainColor(color, data) {
    //console.log(Object.keys(data[0]).slice(1,data.length));
    color.domain(Object.keys(data[0]).slice(1, data.length))
    
}

/* Tri les données par nom de rue puis par date
   La variable retournée sources doit être une Array de n objets (n = nb de rues) de la forme suivante : 
   sources[0] = {name: le nom de la rue, values: Array[365]{.date : la date,.nbVelo : le nombre de vélo compté ce jour là}}
   data : données du CSV
   color : son domain contient déjà les noms des rues
*/
function createSources(color, data) {
    var sources = [];
    var rue;
    color.domain().forEach(function (nomRue) {
        var mvalues = [];

        data.forEach(function (e) {
            var mdate = e.Date;
            var mnbVelo = e[nomRue];

            mvalues.push({ date: mdate, nbVelo: mnbVelo });
        });
        sources.push({ name: nomRue, values: mvalues })
    });

    return sources;
}

// Précise le domaine des échelles x (focus) et x2 (context)
// data: données du CSV
function domainX(x, x2, data) {
    var dateMin = d3.min(data, function (c) {
        return c.Date
    });
    var dateMax = d3.max(data, function (c) {
        return c.Date
    });
    x2.domain([dateMin, dateMax]);
    x.domain([dateMin, dateMax]);
}

// Précise le domaine des échelles y (focus) et y2 (context)
// sources : données de data triées par nom puis par date
function domainY(y, y2, sources) {

    var valMin = Number.MAX_VALUE;
    var valMax = 0;

    sources.forEach(function (s) {
        var maxS = d3.max(s.values, function (v) {
            return +v.nbVelo;
        });

        var minS = d3.min(s.values, function (v) {
            return +v.nbVelo;
        });
        if (valMin > minS) {
            valMin = minS;
        }

        if (valMax < maxS) {
            valMax = maxS;
        }

    });

    y.domain([valMin, valMax]);
    y2.domain([valMin, valMax]);
}
