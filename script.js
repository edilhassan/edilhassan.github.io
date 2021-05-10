// Cities to be simulated
var data = [
  {city: "Spain", description: "Sunny", temperature: 79, unit: true},
  {city: "Portland", description: "Partly cloudy", temperature: 75, unit: true},
  {city: "New York", description: "Rainy", temperature: 55, unit: true},
  {city: "Toronto", description: "Snowy", temperature: 25, unit: true},
  {city: "Boston", description: "Partly cloudy", temperature: 68, unit: true}
];

// Dimensions of the window + svg
var width = window.innerWidth;
var height = window.innerHeight;
var svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

// Updates simulator, unit, and time of day
d3.select("#cities").on("change", updateWeatherSimulator);
d3.select("#unitChange").on("change", updateUnit);
d3.select("#timeOfDay").on("change", updateTimeOfDay);

// Keeps track of the current interval
var curInterval;

// Updates the weather simulator depending on the selected city
function updateWeatherSimulator() {

  var curCity = document.querySelector("#cities").value;
  var curDescription;
  var curTemperature;

  data.forEach(function(d) {
    if(curCity == d.city) {
      curDescription = d.description;
      curTemperature = d.temperature;
    }
  });

  document.querySelector("#description").innerHTML = curDescription;
  document.querySelector("#temperature").innerHTML = curTemperature;

  if(curDescription == "Sunny") {
    sunnySimulation();
  } else if(curDescription == "Partly cloudy") {
    partlyCloudySimulation();
  } else if(curDescription == "Rainy") {
    rainySimulation();
  } else if(curDescription == "Snowy") {
    snowySimulation();
  }

}

// Updates the unit of temperature
function updateUnit() {

  var curUnit = document.querySelector("#unitChange").value;
  var curCity = document.querySelector("#cities").value;

  data.forEach(function(d) {

    if(curUnit == "celsius" && d.unit) {
      d.temperature = Math.round((d.temperature - 32) * (5/9));
      d.unit = !d.unit;
    } else if(curUnit == "fahrenheit" && !d.unit){
      d.temperature = Math.round((d.temperature * (9/5)) + 32);
      d.unit = !d.unit;
    }
  });

  data.forEach(function(d) {
    if(curCity == d.city) {
      document.querySelector("#temperature").innerHTML = d.temperature;
    }
  });

}

// Updates the time of day
function updateTimeOfDay() {
  var timeOfDay = document.querySelector("#timeOfDay").value;

  if(timeOfDay == "PM") {
    document.querySelector("svg").setAttribute("class", "pm");
    document.querySelector(".sun").setAttribute("fill", "white");
  } else {
    document.querySelector("svg").setAttribute("class", "am");
    document.querySelector(".sun").setAttribute("fill", "yellow");
  }
}

// Simulates sunny weather
function sunnySimulation() {
  svg.selectAll("#curSimulation").remove();
  svg.selectAll(".cloud").remove();
  clearInterval(curInterval);

  var color;
  var timeOfDay = document.querySelector("#timeOfDay").value;
  if (timeOfDay == "AM") {
    color = "yellow";
  } else {
    color = "white";
  }

  var circle = svg.append("circle")
    .attr("id", "curSimulation")
    .attr("class", "sun")
    .attr("cx", width)
    .attr("cy", 0)
    .attr("r", 150)
    .attr("fill", color)
    .attr("opacity", 0.8);

  function runSun() {
    curRad = circle.attr("r");
    var goal;

    if (curRad == 250) {
      goal = 150;
    } else {
      goal = 250;
    }

    circle.transition()
      .duration(2000)
      .ease(d3.easeBackInOut)
      .attr("r", goal)
      .on("end", runSun);
  }

  runSun();

}

// Simulates partly cloudy weather
function partlyCloudySimulation() {
  svg.selectAll("#curSimulation").remove();
  svg.selectAll(".cloud").remove();
  clearInterval(curInterval);

  var color;
  var timeOfDay = document.querySelector("#timeOfDay").value;
  if (timeOfDay == "AM") {
    color = "yellow";
  } else {
    color = "white";
  }

  var circle = svg.append("circle")
    .attr("id", "curSimulation")
    .attr("class", "sun")
    .attr("cx", width)
    .attr("cy", 0)
    .attr("r", 150)
    .attr("fill", color)
    .attr("opacity", 0.8);

  function runSun() {
    curRad = circle.attr("r");
    var goal;

    if (curRad == 200) {
      goal = 150;
    } else {
      goal = 200;
    }

    circle.transition()
      .duration(3500)
      .ease(d3.easeBackInOut)
      .attr("r", goal)
      .on("end", runSun);
  }

  runSun();

  var clouds = [];
  for(var i = 0; i < 15; i++) {
    var cx = Math.random()*width;
    var cy = Math.random()*100;
    var r = 50 + Math.random()*100;
    var opacity = Math.random()*0.8;
    clouds.push({cx: cx, cy: cy, r: r, opacity: opacity});
  }

  svg.selectAll(".cloud")
    .data(clouds)
    .enter()
    .append("circle")
      .attr("class","cloud")
      .attr("cx", function(d) { return d.cx; })
      .attr("cy", function(d) { return d.cy; })
      .attr("r", function(d) { return d.r; })
      .attr("opacity", function(d) { return d.opacity; })
      .attr("fill", "#EFEFEF");
}

// Simulates reainy weather
function rainySimulation() {
  svg.selectAll("#curSimulation").remove();
  svg.selectAll(".cloud").remove();
  clearInterval(curInterval);

  var clouds = [];
  for(var i = 0; i < 150; i++) {
    var cx = Math.random()*width;
    var cy = Math.random()*100;
    var r = 50 + Math.random()*100;
    var opacity = Math.random()*0.6;
    clouds.push({cx: cx, cy: cy, r: r, opacity: opacity});
  }

  svg.selectAll(".cloud")
    .data(clouds)
    .enter()
    .append("circle")
      .attr("class","cloud")
      .attr("cx", function(d) { return d.cx; })
      .attr("cy", function(d) { return d.cy; })
      .attr("r", function(d) { return d.r; })
      .attr("opacity", function(d) { return d.opacity; })
      .attr("fill", "#8c8c8c");

  curInterval = setInterval(function() {
    var cx = Math.random()*width;
    var cy = Math.random()*100;
    var dx = 0;
    var r = Math.random() * 5;

    svg.append("circle")
        .attr("id", "curSimulation")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
        .attr("fill","#DDDDDD")
        .transition()
          .duration(1500)
          .delay(function(d,i) { return i * 50; })
          .ease(d3.easeBounce)
          .attr("cy", height)
          .attr("cx", cx + dx)
          .remove();
  }, 25);

}

// Simulates snowy weather
function snowySimulation() {
  svg.selectAll("#curSimulation").remove();
  svg.selectAll(".cloud").remove();
  clearInterval(curInterval);

  var clouds = [];
  for(var i = 0; i < 150; i++) {
    var cx = Math.random()*width;
    var cy = Math.random()*100;
    var r = 50 + Math.random()*100;
    var opacity = Math.random()*0.6;
    clouds.push({cx: cx, cy: cy, r: r, opacity: opacity});
  }

  svg.selectAll(".cloud")
    .data(clouds)
    .enter()
    .append("circle")
      .attr("class","cloud")
      .attr("cx", function(d) { return d.cx; })
      .attr("cy", function(d) { return d.cy; })
      .attr("r", function(d) { return d.r; })
      .attr("opacity", function(d) { return d.opacity; })
      .attr("fill", "#EFEFEF");

  var snowflakePrototype = svg.select("#snowflake");

  curInterval = setInterval(function() {
    var cx = Math.random()*width;
    var cy = 70;
    var dx = -(-100 + Math.random() * 40);
    var r = 3;
    var scale = Math.random();
    var speed = 0;

    var snowflake = snowflakePrototype.clone();

    if (scale > 0.5) {
      speed = 3000;
    } else {
      speed = 5000;
    }

    snowflake.attr("transform", `translate(${cx},${cy})scale(${scale})`)
        .attr("opacity",0.8)
        .attr("class", "cloud")
        .transition()
          .duration(speed)
          .delay(function(d,i) { return i * 50; })
          .ease(d3.easeLinear)
          .attr("transform", `translate(${cx + dx},${height})scale(${scale})rotate(-270)`)
          .remove();

  }, 100);
}

updateWeatherSimulator();
