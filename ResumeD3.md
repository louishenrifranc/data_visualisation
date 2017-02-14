# D3
## Basic functionnality
* Add ```<script src="http://d3js.org/d3.v3.min.js"</script>```
* ```d3.select("body")``` : select an element in the DOM, here the body
* ```d3.select().append("p")``` : append a paragraph to an element selected in the dom
* ```d3.select("p").text() ```: add text to a paragraph
* ```d3.select().append("svg")```: create a svg
	* ```.attr("width")``` : set an attribute of a svg  
	* ```.append("circle").attr("cx", posX).attr("fill", insideColor)```: create a circle svg
* ```var canvas = d3.select().append()```: return a reusable object
* ```.attr("class", "bar")``` assign an html attribute
* ```.classed("bar", false)``` remove an html attribute
* ```.style("height", "29px")``` method is used to apply a CSS property and value directly to an HTML element.
*    ```.attr({
        x: function(d, i) { return i * (w / dataset.length); },
        y: function(d) { return h - (d * 4); }}) ``` modify mutliple attributes at the same time

        
## Visualize data
We need a canvas to draw our visualization. ```var canvas = d3.select("body").append("svg")```

* Open data from json format
```
var dataset;

d3.json("food.json", function(error, data) {
        if (error) {  //If error is not null, something went wrong.
          console.log(error);  //Log the error.
        } else {      //If no error, the file loaded correctly. Yay!
          console.log(data);   //Log the data.
      //Include other code to execute after successful file load here
      dataset = data;
      generateVis();
      hideLoadingMsg();
        }

});

* Create as many paragraph as there are element in an array
```
var array = [5, 10, 15, 20, 25]

d3.select("body")
	.selectAll("p") // select all parapgrah, return none, cause no one exist yet
	.data(array) // count and parse our data, everything past this point will be called len(array)
	.enter() // to create new data bound element. It looks at the current DOM selection and the number of data. If there are more data than element selected, it creates a placeholder element on which you can work your magic.
	.append("p") // Takes the empty placeholder selection and append a p element in the DOM
```
The data is the array is nvertheless used as a field __data__ of the new paragraph. To modify the text with respect to the data, chain with ```.tex(function(d) { return d;}```.

## Scaler des données
```
// Input values are from 100 to 500
// Output value are from 10 to 350
var scale = d3.scale.linear()
                    .domain([100, 500])
                    .range([10, 350]);
scale(100); // return 10

// Dynamic scalling
// Note that here the function is used to tell d3 which dimensions of the dataset (array of point) we are interested for the max function
.domain([0, d3.max(dataset, function(d) { return d[0]; })])

```

## Creer un axe
axis draw something on the screen (and not scale object, which is there main difference)
```
// Create a generic axes
var xAxis = d3.svg.axis();

// add a scale parameter to the axes
xAxis.scale(scale_object)

// Number of ticks
xAxis.ticks(5)

// Format the ticks
xAxis.tickFormat(d3.format(".1%"))

// where to display labels
xAxis.orient("bottom")


// append it to the svg
svg.append("g")
   .attr("class", "axis") // allow to modify it with css
   .attr("transform", "translate(0," + (h - padding) + ")") // push it to the bottom (it was previously at the top 
   .call(xAxis);
    

// Another example for the Y-axis
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
```


