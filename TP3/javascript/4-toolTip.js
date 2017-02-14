// --------------------------------------------------------------------- TOOLTIP ---------------------------------------------------------
// Création d'une tooltip affichant le nom du pays, son revenu par habitant moyen, son espérance de vie, la taille de sa population et sa zone géographique
function infoToTip(data) {
    data = data[0]
    return "Pays : " + data.name + "<br/>" +
        "Esperance de vie : " + Math.floor(data.values.LifeExpectancy) + " ans<br/>" +
        "Revenu : " + Math.floor(data.values.Income) + " $<br/>" +
        "Population : " + data.values.Population + " habitants<br/>" +
        "Région du monde : " + data.values.Region;
}

function toolTip(scatterPlot) {

    /*  TODO : Comme pour le TP1, réaliser une tooltip indiquant :
            - Le nom du pays
            - L'espérance de vie moyenne du pays
            - Le revenue moyen du pays
            - La population du pays
            - La région du pays
    */

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var object = d3.select(this).data();
            return infoToTip(object);
        });
    return tip;

};
