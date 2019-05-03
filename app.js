
    
   formatDate = d3.timeFormat("%Y");
    
   var svg = d3.select("svg"),
    margin = {right: 50, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height");
    
    // scale function
    var x = d3.scaleTime()
      .domain([new Date(2004,01), new Date(2014,01)])
      .range([0, width])
	  .nice()
      .clamp(true);


    // initial value
    //var startValue = x(new Date(2004,01));
    //startingValue = new Date(2004,01);
    

   // var x = d3.scaleLinear()
     //   .domain([0, 180])
       // .range([0, width])
        //.clamp(true);
	console.log("x-ticks:::",x.ticks().length)
    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + (height-60) + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { updateData(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 17 + ")")
      .selectAll("text")
      .data(x.ticks(11))
      .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { console.log("date",d);return formatDate(d); });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 10);

	var pct = winPercentages[0].pct;
	
	
		(function() {
      var gauge = gaugeChart()
        .width(260)
        .height(200)
        .innerRadius(65)
        .outerRadius(105);

      d3.select("#chart").datum([pct]).call(gauge);

      function resize() {
        var gWidth = Math.min(d3.select("#chart").node().offsetWidth, 260);
        gauge.width(gWidth).innerRadius(gWidth / 4).outerRadius((gWidth / 4) + 40);
        d3.select("#chart").call(gauge);
      }

      resize();
      window.addEventListener("resize", resize);

      
    })()
	
	
    function updateData(h) 
    {
      console.log(formatDate(h))
	  
      handle.attr("cx", x(h));
	  winPercentages.forEach((d) => {
	  //console.log("d::",typeof(h),typeof(d.year))
		if(d.year == formatDate(h))
		{
			var gauge = gaugeChart()
        .width(260)
        .height(200)
        .innerRadius(65)
        .outerRadius(105);
			//console.log("t=yes")
			pct = d.pct
			d3.select("#chart").datum([d.pct]).call(gauge)
		}
		
	  });
	  
    }

	function randNumberBounds(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
	
	
  