/*  Retourne le nom des stations
 data : données brutes du CSV
 */
function getNames(data){
    /*  TODO
     Si names ne possède pas un nom, le rajouter
     */
     
    var names = [];
    data.forEach(function(d){
         
        if(!names.includes(d.StartStation)){
            names.push(d.StartStation)
        }
         
     });
     
     return names
}

/*  
Crée et précise le domain de la fonction color usuelle
 */
function setScaleColor(names){
    
    color = d3.scale.category10();
    color.domain(names)
    return color;
}

/*  Précise le nombre de trajet entre deux stations et trie les données par station d'origine
 data : données brutes du CSV
 names : noms des stations
 */
function setData(data,names){

    /*  TODO
     Comme pour le TP2, retourne une liste d'objet contenant les propriétés suivantes :
     .name : nom de la station de départ
     .value : liste d'objet ayant comme propriété le nom des stations d'arrivées avec le nombre de trajet (utiliser normalizeName)
     .total : nombre de trajets total depuis la station de départ
     */  
     var res = [];

    names.forEach(function(startStation){
        
        var entry = {};
        
        entry.name = startStation;
        entry.total = 0;
        var value = [];
        
        names.forEach(function(endStation){
            
            var val = {};
            val.EndStation = endStation;
            val.nbTrajet = data.filter(function(d){
                return (d.StartStation == startStation && d.EndStation == endStation)       
            }).length;
            
            entry.total = entry.total + val.nbTrajet;
            
            value.push(val)
            
        });
        
        entry.value = value;
        res.push(entry)
    });
  
    return res;
}

/*  Retourne le nombre de tous les trajets
 dataSet : données triées par station d'origine
 */
function getTotal(dataSet){
    var latotale = 0
    dataSet.forEach(function(d){
        latotale += d.total;
    })
    return latotale;
}

/*  Créer et retourne les fonctions arc et chord de d3
 innerRadius : rayon intérieur du chord diagram
 outerRadius : rayou extérieur du chord diagram
 */
function createArcChord(innerRadius,outerRadius){

    /*  TODO
     Compléter les fonctions suivantes
     */
    // Création de l'arc
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

    var chord = d3.svg.chord()
        .radius(innerRadius);
    
    return [arc, chord]
}

/*  Créer et retourne la matrice de liaison associée aux données
 dataSet : données triées par station
 names : noms des stations
 */
function createMatrix(dataSet,names) {

    /* TODO
        en notant n le nombre de station :
        Créer un tableau de tableau de taille nxn
        préciser ce tableau tel que [i][j] correpond au nombre de trajet de la station i à la station j

     */
     
    res = [];
    dataSet.forEach(function(d){
        var line = [];
        d.value.forEach(function(v){
            line.push(v.nbTrajet);
        });
        res.push(line);
    }); 
    return res;
}

/*  Création du layout chord avec la matrice de liaison

 */
function createLayout(matrix){

    /* TODO
        trier les sousgroupes par ordre décroissant
        trier les noeuds/chords par ordre croissant
        associer la matrice de liaison

     */
    return d3.layout.chord()
        .padding(.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.ascending)
        .matrix(matrix)
}