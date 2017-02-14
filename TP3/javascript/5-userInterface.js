// --------------------------------------------------------------------- EVENT LISTENERS -----------------------------------------------------
/*  TODO : Ajouter les eventListeners aux éléments HTML suivant avec la fonction associée :
        balise <select> : changement de valeur => showWorldArea
        balise <input #pays> : touche enter appuyée => targetPays
        balise <button #suivre> suivre ce pays : click => targetPays
        balise <button #display> afficher les pays marqués : click => displayTarget
        balise <button #reset> reset : click => reset

*/
d3.select("#reset").on("click", reset)
d3.select("#suivre").on("click", targetPays)
d3.select("#pays").on("keydown", function() {
    if (d3.event.keyCode == 13) {
        targetPays();
    }
})
d3.select("#region").on("change", showWorldArea)
d3.select("#display").on("click", displayTarget)

// ---------------------------------------- CHOIX DES RÉGIONS ET DES PAYS POUR L'UTILISATEUR ---------------------------------------
/*  Ajoute à la balise select les différents choix de région possible
    regions : ensemble des régions géographiques du CSV
*/
function addListRegions(regions) {
    var locRegions = regions.slice();
    locRegions.unshift("World")
    var select_tag = document.getElementById("region")
    locRegions.map(function(e) {
        var new_option = document.createElement("option");
        new_option.textContent = e
        new_option.value = e
        select_tag.appendChild(new_option)
    })

    countriesInRegion(countries, locRegions[0])
}

/*  Auto-compléteur pour que l'utilisateur n'ait pas à écrire le nom entier du pays
    countries : données transformées du CSV
*/

function autoFillerCountries(countries) {

    countries.map(function(d) {
        return normalizeName(d);
    });
    $('#pays').autocomplete({
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(countries, request.term);
            if (!results.length) {
                d3.select("#error").html("<b>error no match</b>")
            } else {
                d3.select("#error").html("&nbsp;")
            }
            response(results);
        }
    });
    return countries
}

/*  Extrait la liste des pays d'une zone géographique donnée
    countries : données transformées du CSV
    region : region géographique sélectionnée
*/
function countriesInRegion(countries, region) {
    var allcountries = []
    countries.forEach(function(d) {
        if (d.values.Region == region || region == "World") {
            allcountries.push(d.name)
        }
    });
    autoFillerCountries(allcountries)
    return allcountries;
}


// --------------------------------------------------------------------- FONCTIONS ASSOCIÉES AUX EVENTLISTENERS ---------------------------------------------------------

// Indique si on affiche les pays sélectionnés uniquement (true) ou tous les pays (false)
// LOL, don't need it...
var hide = true;

// Affiche les pays associées à une région géographique
function showWorldArea() {
    /* TODO :
            Annuler toutes les selections effectuées par l'utilisateur
            Pour les pays n'étant pas dans la zone sélectionnée : 
                Désactiver la tooltip
                mettre une opacité de 0.1    
    */

    var region = d3.select(this).property("value");

    countriesRegion = countriesInRegion(countries, region);
    scatterGraph.selectAll("circle").classed("click", false);

    var countriesR = [];

    countriesRegion.forEach(function(country) {
        countriesR.push(normalizeName(country))
    });



    //scatterGraph.selectAll("#"+normalizeName(country)).classed("hide",true);
    //d3.selectAll("circle").filter(function() { return countriesRegion.indexOf(d3.select(this).attr("id")) == -1;}).classed("hide", true);
    //d3.selectAll("circle").filter(function() { return countriesRegion.indexOf(d3.select(this).attr("id")) !== -1;}).classed("hide", false);
    //console.log(scatterGraph.select("#"+normalizeName(country)));
    d3.selectAll("circle").classed("hide", function() {
        return (countriesR.indexOf(d3.select(this).attr("id")) == -1)
    });

};

// Permet de colorier le pays d'un cercle en noir lorsqu'on le désigne dans la balise input #pays. 
// Si on applique la fonction une deuxième fois le pays redevient comme avant
function targetPays() {
    /* TODO : 
        Si l'utilisateur n'a rien rentré, la fonction ne fait rien
        Sinon : 
        normaliser le nom du pays sélectionné. 
        si le nom est valable, colorier en noir le cercle ciblés
        si la cible est déjà noir, le colorier de la couleur d'origine
        si le nom n'est pas valable(non existant ou ne faisant pas partie de la région sélectionnée,
        indiquer dans la balise #error que le nom est incorrect 
        
        Si on a affiché les pays marqués, la fonction ne fait rien
    */

    var pays = normalizeName(d3.select("#pays").property("value"));

    scatterGraph.select("#" + pays).classed("click", function() {
        if (d3.select(this).classed("hide")) {
            return false
        } else {
            return !d3.select("#" + pays).classed("click")
        }
    })

};

// La fonction targetClick réalise la même chose que la fonction target lorsque l'on clique sur le cercle
function targetClick() {
    /* TODO : 
        Même chose que targetPays (les vérifications ne sont pas nécessaires)
        Si on a affiché les pays marqués, la fonction ne fait rien
    */

    d3.select(this).classed("click", !d3.select(this).classed("click"))
};

// Affiche les pays ciblés uniquement (hide==true) ou tous les pays (hide==false)
function displayTarget() {
    /* TODO : 
            Rendre transparent les pays non sélectionnés et remettre la bonne couleur aux pays sélectionnés
            et changer le texte de #display
        OU  Mettre la bonne couleur aux pays non sélectionnés et colorier en noir les pays sélectionnés
            et changer le texte de #display
            
            Mettre à jour hide
    */
    d3.selectAll("circle").filter(function() {
        return d3.select(this).classed("click") == false;
    }).classed("hide", true)
    d3.selectAll(".click").classed("click", false)
};

// La fonction reset réinitialise les sélections et l'affichage à zéro
function reset() {
    /* TODO :
        Réinitialiser les éléments HTML
        Réinitialiser les cercles (pas l'année des données)
        Réinitialiser countriesRegion
        Réinitialiser hide
    */
    scatterGraph.selectAll("circle").classed("click", false);
    scatterGraph.selectAll("circle").classed("hide", false);
    countriesRegion = countries
    d3.select("#error").html("&nbsp;")
    d3.select("#pays").node().value = ""
    d3.select("#region").property("value", "World")
    countriesRegion = countriesInRegion(countries, "World");
};
