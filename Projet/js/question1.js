function heatmapChart(id, csvFile, attribute) {

    var margin = { top: 100, right: 150, bottom: 0, left: 125 },
        width = 800 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 15),
        legendElementWidth = gridSize / 2,
        buckets = 20,
        // colors = ["#ffffd9","#c7e9b4","#41b6c4", "225ea8"] // alternatively colorbrewer.YlGnBu[9]
        colors = colorbrewer.YlOrBr[4]
        //attribute = ["African American", "Caucasian American", "Hispanic", "Asian", "Other"],

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

            cards.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Ratio Match/Non-Match");

            cards.append("g")
                .append("text")
                .attr("transform", "translate(350," + height + ")")
                .style("text-anchor", "end")
                .text("Correlation entre les individus");
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
                .attr("x", attribute.length * gridSize + 25)
                .attr("y", function(d, i) {
                    return (legendElementWidth + 5) * i;
                })
                .attr("width", legendElementWidth)
                .attr("height", legendElementWidth)
                .attr("class", "attr bordered")
                .style("fill", function(d, i) {
                    return colors[i];
                });

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
                //.attr("x", function(d, i) { return legendElementWidth * i; })
                //.attr("y", attribute.length * gridSize + 25 + gridSize);
                .attr("x", attribute.length * gridSize + 40 + legendElementWidth)
                .attr("y", function(d, i) {
                    return (legendElementWidth + 5) * i + 12;
                })

            legend.exit().remove();

        });
};

function transitionPays(countries) {
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
