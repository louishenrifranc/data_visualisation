function createGroup(layout) {

    /* TODO
     créer autant de g que de station et leur associer les données contenues dans layout.groups
     Associer chaque groupe à une classe "group"
     rajouter un eventListener mouseover et l'associer à la fonction mouseover

     */
    var group = svg.selectAll(".group")
        .data(layout.groups)
        .enter().append("g")
        .attr("class", "group")
        .on("mouseover", mouseover);
    return group;
}

/*  Ajout d'un titre donnant le pourcentage des trajets partants de la station de départ
 group : groupes de createGroupe
 names : nom des stations
 nbTotal : nombre total des trajets
 */
function addTitleGroup(group, names, nbTotal) {
    /* TODO
     Le pourcentage doit être affiché à 0.1%
     Regarder le sujet pour voir des titres possbles !
     */
     group.append("title").text(function(d, i) {   
        return names[i] + " " + d3.format(".1%")(d.value / nbTotal)
    });
}

/*  Affiche la bordure extérieure du chord diagram
 group : groupes de createGroupe
 arc : fonction arc précédente
 color : fonction scale de couleur
 dataSet : données triées
 */
function createPathPerGroup(group, arc, color, dataSet) {

    /*  TODO
     ajouter un path pour chaque group et préciser la couleur
     identifier les paths
     */
    var groupPath = group.append("path")
        .attr("id", function(d, i) { return "group" + i; })
        .attr("d", arc)
        .style("fill", function(d,i) {return color(dataSet[i].name); });
    return groupPath;

}

/*  Ajout le nom des stations dans la bordure extérieur du chord diagram
 group : groupes de createGroupe
 groupPath : path de createPathPerGroup
 dataSet : données triées
 */
function addStationName(group, groupPath, dataSet) {

    /*  TODO
     Ajouter un élement "text" à group
     Utiliser l'attribut "dy" pour mettre le texte dans la bordure du chord diagram
     Rajouter à chaque élement "text" un élément "textPath" permettant de "courber" le texte que nous allons inscrire
     Associer le "textPath" à son path via l'attribut "xlink:href" (va cibler la valeur) et rajouter le nom de la station

     Certains noms seront trop longs par rapport à l'espace qui leur est associé, il va donc falloir comparer la taille du path et du text

     longueur d'un <path> : (<path>).getTotalLength/2 - 20
     Longueur d'un <text> : (<text>).getComputedTextLength()

     En utilisant ces deux fonctions, trouver les noms trop longs.
     Vous devriez trouver les stations "Métro Mont-Royal (Rivard/Mont-Royal)" et "Pontiac / Gilford"
     Les remplacer par respectivement "Métro Mont-Royal" et "Pontiac"

     Enfin associer à chaque <text> un attribut "dx" pour centrer les noms (réutiliser les formules précédentes)
     */
     var groupText = group.append("text")
                            .attr("dy", 16)
                            .attr("dx", 3)
groupText.append("textPath")
.attr("xlink:href", function(d, i) { return "#group" + i; })
.text(function(d, i) { return dataSet[i].name; });
    a = groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 20 < this.getComputedTextLength(); })
    a.map(function(d) {  return d;})    
}


/*  Ajout des "cordes" (les liens) du chordDiagram
 svg : SVG
 dataSet : données triées
 layout : données liées à la matrice de liaison
 chord : fonction chord
 color : fonction scale de couleurs
 */
function createChordDiagram(svg, dataSet, layout, chord, color) {

    /*  TODO
        Ajouter au svg des paths avec la classe ".chord" et leur associer comme données "layout.chords"
        Préciser les attributs "fill" (couleur des noeuds) et "d"

     */

    var chordDiagram = svg.selectAll(".chord")
                            .data(layout.chords)
                            .enter()
                            .append("path")
                            .attr("class", "chord")
                            .attr("d", chord)
                            .style("fill", function(d){return color(dataSet[d.source.index].name)})
                            
    
    return chordDiagram;

}

/*  Ajoute un titre aux noeuds/chords du chordDiagram
 chordDiagram : chord diagram
 dataSet : données triées
 nbTotal : total des trajets
 */
function addChordTitle(chordDiagram, dataSet, nbTotal) {

    /*  TODO
        Rajouter un titre pour chaque noeud donnant les pourcentages à 0.1%
        de tous les trajets entre les deux stations reliées, dans les deux sens
        Regardez le sujet pour avoir une idée du text à écrire
     */
     
     chordDiagram.append("title")
                    .text(function(d,i){
                        
                        return dataSet[d.source.index].name
                            + " → " + dataSet[d.target.index].name
                            + ": " + d3.format(".1%")(d.source.value/nbTotal)
                            + "\n" + dataSet[d.target.index].name
                            + " → " + dataSet[d.source.index].name
                            + ": " + d3.format(".1%")(d.target.value/nbTotal);
 
                    })

}

/*  Affiche les cordes reliées à la station sélectionnée
 d : données du group (la station) sélectionnée
 i : index du group
 */
function mouseover(d, i) { // LE d NE SERT A RIEN !!!
    /*  TODO
    masquer les noeuds/chords qui ne sont pas reliés à la station sélectionnée

     */
     
     svg.selectAll(".chord").classed("fade", function(p) {
        return p.source.index != i && p.target.index != i;
    });

}

// Retourne une string sans caractère spécial (pour ce TP)
function normalizeName(name){
    if (typeof name == "string") return name.replace(/\s+|\(|\)|-|\//g, "")
}