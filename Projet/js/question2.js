var RadarChart = {
    draw: function(id, d, options, legend_color) {
        var cfg = {
            radius: 5,
            w: 300,
            h: 300,
            factor: 1,
            factorLegend: 1,
            levels: 3,
            maxValue: 37,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 80,
            ExtraWidthX: 120,
            ExtraWidthY: 120,
            color: d3.scale.category10()
        };

        if ('undefined' !== typeof options) {
            for (var i in options) {

                if ('undefined' !== typeof options[i] && (i != "maxValue" || options[i] > cfg[i])) {
                    cfg[i] = options[i];
                }
            }
        }
        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i) {
            return d3.max(i.map(function(o) {
                return o.value;
            }))
        }));
        var allAxis = (d[0].map(function(i, j) {
            return i.axis
        }));
        var total = allAxis.length;
        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        d3.select(id).select("svg").remove();

        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w + cfg.ExtraWidthX)
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");;

        var tooltip;

        //Circular segments
        for (var j = 0; j <= cfg.levels - 1; j++) {
            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("y1", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("x2", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
                })
                .attr("y2", function(d, i) {
                    return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
                })
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
        }

        //Text indicating at what % each level is
        for (var j = 0; j < cfg.levels; j++) {
            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data([1]) //dummy data
                .enter()
                .append("svg:text")
                .attr("x", function(d) {
                    return levelFactor * (1 - cfg.factor * Math.sin(0));
                })
                .attr("y", function(d) {
                    return levelFactor * (1 - cfg.factor * Math.cos(0));
                })
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
                .attr("fill", "#737373")
                .text(Math.ceil((j + 1) * cfg.maxValue / cfg.levels));
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w / 2)
            .attr("y1", cfg.h / 2)
            .attr("x2", function(d, i) {
                return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
            })
            .attr("y2", function(d, i) {
                return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
            })
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d) {
                if (d == "intelligence") {
                    return "Intelligence";
                } else if (d == "same_interests") {
                    return "Intérêts similaires";
                } else if (d == "sincerity") {
                    return "Sincèrité";
                } else if (d == "attractive") {
                    return "Attractivité physique";
                } else if (d == "fun") {
                    return "Fun";
                } else if (d == "ambitious") {
                    return "Ambitieux";
                }
            })
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .style("fill", "#757575")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i) {
                return "translate(0, -10)"
            })
            .attr("x", function(d, i) {
                return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total);
            })
            .attr("y", function(d, i) {
                return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
            });


        d.forEach(function(y, x) {
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i) {
                    dataValues.push([
                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie" + series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points", function(d) {
                    var str = "";
                    for (var pti = 0; pti < d.length; pti++) {
                        str = str + d[pti][0] + "," + d[pti][1] + " ";
                    }
                    return str;
                })
                .style("fill", function(j, i) {
                    return cfg.color(series)
                })
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function(d) {
                    z = "polygon." + d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function() {
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });

        series = 0;


        d.forEach(function(y, x) {
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie" + series)
                .attr('r', cfg.radius)
                .attr("alt", function(j) {
                    return Math.max(j.value, 0)
                })
                .attr("cx", function(j, i) {
                    dataValues.push([
                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                    return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
                })
                .attr("cy", function(j, i) {
                    return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
                })
                .attr("data-id", function(j) {
                    return j.axis
                })
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                .on('mouseover', function(d) {
                    newX = parseFloat(d3.select(this).attr('cx')) - 10;
                    newY = parseFloat(d3.select(this).attr('cy')) - 5;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text((d.value))
                        .transition(200)
                        .style('opacity', 1);

                    z = "polygon." + d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function() {
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .append("svg:title")
                .text(function(j) {
                    return Math.max(j.value, 0)
                });

            series++;
        });



        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
        return axis;
    }
};

function display_radar_char(id_, expectation, reality, legend, name_x, name_y, rest = null) {
    var w = 500,
        h = 500;
    LegendOptions = [name_x, name_y]
    if(rest != null){
    	LegendOptions.push("Votre critère de désir")
    }
    var colorscale = d3.scale.category10();
    d = [
        [],
        []
    ]
    max_value = []
    if (rest != null) {    	
        d.push([])
        for (var property in rest) {
            if (rest.hasOwnProperty(property)) {
                max_value.push(parseFloat(rest[property]))
                d[2].push({ "axis": property, "value": parseFloat(rest[property]) });
            }
        }
    }
    for (var property in expectation) {
        if (expectation.hasOwnProperty(property)) {
            max_value.push(expectation[property])
            d[0].push({ "axis": property, "value": expectation[property] });
        }
    }
    for (var property in reality) {
        if (reality.hasOwnProperty(property)) {
            max_value.push(reality[property])
            d[1].push({ "axis": property, "value": reality[property] });
        }
    }

    var mycfg = {
        w: w,
        h: h,
        maxValue: d3.max(max_value),
        levels: 8,
        ExtraWidthX: 300
    }
    console.log(max_value)
    console.log(mycfg)
    axis = RadarChart.draw(id_, d, mycfg);
    var svg = d3.select(id_)
        .selectAll('svg')
        .append('svg')
        .attr("width", w + 300)
        .attr("height", h);


    //Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(90,0)')
        .attr("x", w - 405)
        .attr("y", 20)
        .attr("font-size", "20px")
        .attr("font-weight", "20px")

    .attr("fill", "#404040")
        .text(legend);

    //Initiate Legend	
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(90,20)');
    //Create colour squares
    legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 150)
        .attr("y", function(d, i) {
            return i * 35 + 30;
        })
        .attr("width", 25)
        .attr("height", 25)
        .style("fill", function(d, i) {
            return colorscale(i);
        });
    //Create text next to squares
    legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 120)
        .attr("y", function(d, i) {
            return i * 35 + 45;
        })
        .attr("font-size", "15px")
        .attr("fill", "#737373")
        .text(function(d) {
            return d;
        });

    return axis;
}

function annotations(svg, attribute, first_or_second, message, text_offset_x, text_offset_y) {

    circles = d3.selectAll('circle')
        .filter(function(d) {
            return d.axis == attribute;
        })[0][first_or_second];

    var annotations = [{
        "cx": circles.cx.baseVal.value,
        "cy": circles.cy.baseVal.value,
        "r": 10,
        "text": message,
        "textWidth": message.length + 20,
        "textOffset": [text_offset_x, text_offset_y]
    }];

    svg.append("g")
        .attr("class", "annotations")
        .call(ringNote, annotations)
}
