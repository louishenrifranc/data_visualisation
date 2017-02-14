// --------------------------------------------------------------------- EVENT LISTENER -----------------------------------------------------
// Event listener du slider
/* TODO : 
        Rajouter un eventListener capturant un changement de valeur de la part du slider
*/
d3.select("#slider").on("change", loadCSV)


// --------------------------------------------------------------------- TRANSITION ---------------------------------------------------------
/* Charge les données de l'année sélectionnée 
 */
function loadCSV() {

    /*  TODO :
            Changer le texte indiquant l'année sélectionnée
            Charger le fichier csv correspondant et mettre à jour la variable countries
            appeler la fonction transitionPays pour réaliser une transition 
    */
    var year = +d3.select("#slider").property("value")
    d3.select("#annee").html(year)
    d3.csv("données" + year + ".csv", function(error, data) {
        if (error) throw error;
        countries = countriesArray(data);
        countries = sortPays(countries);
        transitionPays(countries);
    })

}

/*  Réalise une transition dans l'ancienne année à la nouvelle année
    countries : données du CSV transformées
*/
function transitionPays(countries) {

    /*  TODO : 
              Réaliser une transition entre l'ancienne position et la nouvelle position des cercles
              Mettre également à jour la taille du rayon des cercles
              La transition doit se faire en 2 secondes
    */

    scatterGraph.selectAll("circle")
        .data(countries)
        .transition()
        .duration(2000)
        .ease("bounce")
        .attr("cx", function(d) {
            return x(d.values.LifeExpectancy)
        })
        .attr("cy", function(d) {
            return y(d.values.Income)
        })
        .attr("r", function(d) {
            return r(d.values.Population)
        })
        .attr("fill", function(d) {
            return color(d.values.Region)
        })

}
