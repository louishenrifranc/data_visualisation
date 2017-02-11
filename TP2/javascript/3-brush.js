// ----------------------------------------------------- BRUSH -------------------------------------------------------

// Permet de redessiner focus en selectionnant une zone dans context
function brush() {

/* TODO : 
	mettre à jour le domain de x
	redessiner les paths et les axes de focus
*/
    
    if (brush.empty()) {
        x.domain(x2.domain());
        console.log(focus.selectAll("path"));
        focus.selectAll("path.line").attr("d", function (d) { return line(d.values); })
    } else {

        x.domain(brush.extent());
        focus.selectAll("path.line").attr("d", function (d) { return line(d.values); })
    }
    focus.select(".x.axis").call(xAxis);
}
