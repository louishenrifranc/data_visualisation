function parallelCoord(id, csvFile) {

  var margin = {top: 30, right: 10, bottom: 10, left: 10},
      width = 1500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  /*var dimensions = [
    {
      name: "genre",
      scale: d3.scale.ordinal().rangePoints([0, height]),
      type: "string"
    },
    {
      name: "nombre de match",
      scale: d3.scale.linear().range([0, height]),
      type: "number"
    },
    {
      name: "domaine d'études",
      scale: d3.scale.linear().range([height, 0]),
      type: "number"
    },
    {
      name: "âge",
      scale: d3.scale.linear().range([height, 0]),
      type: "number"
    },
    {
      name: "origine éthnique",
      scale: d3.scale.linear().range([height, 0]),
      type: "number"
    },
    {
      name: "fréquence de date",
      scale: d3.scale.linear().range([height, 0]),
      type: "number"
    },
    {
      name: "fréquence de sortie",
      scale: d3.scale.linear().range([height, 0]),
      type: "number"
    },
  ];*/

  var x = d3.scale.ordinal().rangePoints([0, width], 1),
      y = {},
      dragging = {};

  /*var x = d3.scale.ordinal()
    .domain(dimensions.map(function(d) { return d.name; }))
    .rangePoints([0, width]);*/

  var line = d3.svg.line(),
      axis = d3.svg.axis().orient("left"),
      background,
      foreground;

  var svg = d3.select(id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Could value belong to a quantitative ordinal scale
var quant_p = function(v){return (parseFloat(v) == v) || (v == "")};

  d3.csv(csvFile, function(error, persons) {

    // Extract the list of dimensions and create a scale for each.
    /*x.domain(dimensions = d3.keys(persons[0]).filter(function(d) {
      return d != "iid" && (y[d] = d3.scale.linear()
          .domain(d3.extent(persons, function(p) { return +p[d]; }))
          .range([height, 0]));
    }));*/

    /*dimensions.forEach(function(dimension) {
      dimension.scale.domain(dimension.type === "number"
          ? d3.extent(persons, function(d) {
            return +d[dimension.name]; 
          })
          : persons.map(function(d) { return d[dimension.name]; }).sort());
    });*/

    dimensions = d3.keys(persons[0]).slice(1);
    x.domain(dimensions);

    //console.log(d3.keys(persons[0]).slice(1))

    dimensions.forEach(function(d) {
    var vals = persons.map(function(p) {return p[d];});
    if (vals.every(quant_p)){ 
      y[d] = d3.scale.linear()
          .domain(d3.extent(vals.map(function(p){return +p})))
          .range([height, 0]);}
    else{           
      y[d] = d3.scale.ordinal()
          .domain(vals.filter(function(v, i) {return vals.indexOf(v) == i;}))
          .rangePoints([height, 0],1);}
    })

    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
      .selectAll("path")
        .data(persons)
      .enter().append("path")
        .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(persons)
      .enter().append("path")
        .attr("d", path)
        .attr("class",function(d){
          if(d["genre"] == "Femme"){
            return "foreground_woman"
          } else return "foreground_man"
        });

    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
        .data(dimensions)
      .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.behavior.drag()
          .origin(function(d) { return {x: x(d)}; })
          .on("dragstart", function(d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function(d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
          })
          .on("dragend", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            background
                .attr("d", path)
              .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
          }));

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; });

    // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function(d) {
          d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
        })
      .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);
  });

  function position(d) {
    var v = dragging[d];
    return v == null ? x(d) : v;
  }

  function transition(g) {
    return g.transition().duration(500);
  }

  // Returns the path for a given data point.
  function path(d) {
    return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
        extents = actives.map(function(p) { return y[p].brush.extent(); });
    foreground.style("display", function(d) {
      return actives.every(function(p, i) {
        //console.log(y[p].domain())
        var p_new = (y[p].ticks)?d[p]:y[p](d[p]);
        return extents[i][0] <= p_new && p_new <= extents[i][1];
      }) ? null : "none";
    });
  }

  /*function brush() {
    brush_count++;
    var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
        extents = actives.map(function(p) { return y[p].brush.extent(); });

    // Get lines within extents
    var selected = [];
    data.map(function(d) {
      return actives.every(function(p, i) {
        var p_new = (y[p].ticks)?d[p]:y[p](d[p]); //convert to pixel range if ordinal
          return extents[i][0] <= p_new && p_new <= extents[i][1];
      }) ? selected.push(d) : null;
    });

    // Render selected lines
    foreground.clearRect(0,0,w+1,h+1);
    paths(selected, foreground, brush_count);
  }*/

  function paths(data, ctx, count) {
    var n = data.length,
        i = 0,
        reset = false;
    function render() {
      var max = d3.min([i+60, n]);
      data.slice(i,max).forEach(function(d) {
        path(d, foreground, colors[d.group]);
      });
      i = max;
    };
    (function animloop(){
      if (i >= n || count < brush_count) return;
      requestAnimFrame(animloop);
      render();
    })();
  };

}