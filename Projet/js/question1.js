d3.select("#button-age").on("click", transition.bind(this, "button-age"))
d3.select("#button-origine").on("click", transition.bind(this, "button-origine"))
d3.select("#button-etudes").on("click", transition.bind(this, "button-etudes"))


function transition(name) {
    if (name == "button-age") {
        attribute = ["- de 22", "22-23", "24-27", "28-31", "32-36", "+ de 36"]
        csvFile = "data/corr_age_age_matches.csv"
        message = "Les personnes d'âges similaires semblent apprécier de batifoler ensemble. Mais ce n'est pas le cocktail \
         d'amour le plus puissant. Celui ci semble plutôt être constitué de jeunes pousses masculines et de femmes plus mûres."
    } else if (name == "button-origine") {
        attribute = ["African American", "Caucasian American", "Hispanic", "Asian", "Other"]
        csvFile = "data/corr_race_race_matches.csv"
        message = "En matière d'origine, la tednance est plus floue, et le métissage est au rendez-vous. En outre, la matrice est ici\
        plus symétrique ce qui suggère qu'hommes et femmes ont des comportements similaires sur ce point"

    } else if (name == "button-etudes") {
        csvFile = "data/corr_field_cd_field_cd_matches.csv"
        //attribute = ["Science", "Science sociales", "Littérature", "Art", "Commerce", "Education", "Autre"]
        attribute = ["Science", "Science sociales", "Littérature", "Art", "Droit", "Commerce", "Education"]
        message = "En ce qui concerne les études, on retrouve une tendance à apprécier nos semblales. Mais une fois de plus\
        Il ne faut pas s'arrêter à ce constat ou l'on risquerait de passer à côté, entre autre, de l'improbable union entre\
        le droit et l'art. Notons également que les science sociales et le buisness ne font pas bon ménage, si cela surprend quelqu'un ..."
    }
    d3.select("#text_heatmap").text(message)
    var buckets = 20,
        colors = colorbrewer.YlOrBr[4]

        d3.select("#heatmap svg").remove()
        heatmapChart("#heatmap", csvFile,attribute)

};

function heatmapChart(id, csvFile, attribute) {

    var margin = { top: 100, right: 150, bottom: 0, left: 125 },
        width = 1200 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 15),
        legendElementWidth = gridSize / 2,
        buckets = 20,
        colors = colorbrewer.YlOrBr[4]

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var womenLabels = svg.selectAll(".womenLabel")
        .data(attribute)
        .enter().append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function(d, i) {
            return i * gridSize;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function(d, i) {
            return "mono axis women-label"
        });

    var menLabels = svg.selectAll(".menLabel")
        .data(attribute)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(" + (i + 1 / 2) * gridSize + ",-6)rotate(45)";
        })
        .attr("y", 0)
        //.attr("transform", "translate(" + gridSize / 2 + ", -6)rotate(80)")
        .append("text")
        .style("text-anchor", "end")
        .text(function(d) {
            return d;
        })

    .attr("class", function(d, i) {
        return "mono axis men-label"
    });

    d3.csv(csvFile,
        function(d) {
            return {
                women: +d.attr1,
                men: +d.attr2,
                value: +d.value
            };
        },
        function(error, data) {
            var colorScale = d3.scale.quantile()
                .domain([0, buckets - 1, d3.max(data, function(d) {
                    return d.value;
                })])
                .range(colors);

            /*var colorScale = d3.scale.quantize()
                .domain([0,100])
                .range(colors)*/

            var cards = svg.selectAll(".attr")
                .data(data, function(d) {
                    return d.women + ':' + d.men;
                });

            cards.append("title");

            cards.enter().append("rect")
                .attr("x", function(d) {
                    return (d.men - 1) * gridSize;
                })
                .attr("y", function(d) {
                    console.log(d.women)
                    return (d.women - 1) * gridSize;
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "attr bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0]);

            cards.transition().duration(1000)
                .style("fill", function(d) {
                    return colorScale(d.value);
                });

            cards.select("title").text(function(d) {
                return d.value;
            });

            cards.exit().remove();

            var legend = svg.selectAll(".legend")
                .data([0].concat(colorScale.quantiles()), function(d) {
                    return d;
                });

            //.data(colors)
            legend.enter().append("g")
                .attr("class", "legend");


            legend.append("rect")
                //.attr("x", function(d, i) { return legendElementWidth * i; })
                //.attr("y", attribute.length * gridSize +25)
                .attr("x", attribute.length * gridSize + 55)
                .attr("y", function(d, i) {
                    return (legendElementWidth + 5) * (i+1);
                })
                .attr("width", legendElementWidth)
                .attr("height", legendElementWidth)
                .attr("class", "attr bordered")
                .style("fill", function(d, i) {
                    return colors[i];
                });


            legend.append("rect")
                .attr("x", attribute.length * gridSize + 55)
                .attr("y", legendElementWidth - 32)
                .attr("width", legendElementWidth)
                .attr("height", legendElementWidth)
                .attr("class", "attr bordered")
                .style("fill", "#FFFFFF");

            legend.append("text")
                .attr("class", "mono")
                .text("Pas de donées")
                .attr("x", attribute.length * gridSize + 70 + legendElementWidth)
                .attr("y", 18)

            // Female symbol
            legend.append("text")
                .attr("class", "mono")
                .html("&#x2642;")
                .style("font-size", "50px")
                .style("fill", "blue")
                .attr("x", attribute.length * gridSize + 55)
                .attr("y", (legendElementWidth + 5) * 6)

            // Male symbol
            legend.append("text")
                .attr("class", "mono")
                .html("&#9792;")
                .style("font-size", "50px")
                .style("fill", "red")
                .attr("x", attribute.length * gridSize + 55)
                .attr("y", (legendElementWidth + 9) * 7);

            legend.append("text")
                .attr("class", "mono")
                .text(function(d) {
                    switch (d) {
                        case 0:
                            return "Très peu de chance de match";
                            break;
                        case colorScale.quantiles()[0]:
                            return "Peu de chance de match";
                            break;
                        case colorScale.quantiles()[1]:
                            return "Bonnes de chances de match";
                            break;
                        case colorScale.quantiles()[2]:
                            return "Très bonnes chances de match";
                            break;
                    }
                })
                .attr("x", attribute.length * gridSize + 70 + legendElementWidth)
                .attr("y", function(d, i) {
                    return (legendElementWidth + 5) * (i+1) + 18;
                })
            legend.append("text")
                .attr("class", "mono")
                .text("Individu masculin")
                .attr("x", attribute.length * gridSize + 70 + legendElementWidth)
                .attr("y", (legendElementWidth + 5) * 5 + 20)

            legend.append("text")
                .attr("class", "mono")
                .text("Individu feminin")
                .attr("x", attribute.length * gridSize + 70 + legendElementWidth)
                .attr("y", (legendElementWidth + 9) * 6 + 20)

            // Male symbol 
            legend.append("text")
                .attr("class", "mono")
                .html("&#x2642;")
                .style("font-size", "25px")
                .style("fill", "blue")
                .attr("x", -25)
                .attr("y", -14);

            legend.append("text")
                .attr("class", "mono")
                .html("&#9792;")
                .style("font-size", "25px")
                .style("fill", "red")
                .attr("x", -40)
                .attr("y", 20);
            legend.exit().remove();

        });
};


function lineChart(id, csvFile) {

    var margin = { top: 0, right: 0, bottom: 20, left: 150 },
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // Parse the date / time
    //var parseDate = d3.time.format("%d-%b-%y").parse;

    var svg = d3.select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) {
            return x(d.corr);
        })
        .y(function(d) {
            return y(d.value);
        });

    // Adds the svg canvas


    // Get the data
    d3.csv(csvFile, function(error, data) {
        data.forEach(function(d) {
            d.corr = +d.corr;
            d.value = +d.value;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) {
            return d.corr;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.value;
        })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Ratio Match/Non-Match");

        svg.append("g")
            .append("text")
            .attr("transform", "translate(350," + height + ")")
            .style("text-anchor", "end")
            .text("Correlation entre les individus");
    });

}
