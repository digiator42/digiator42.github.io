import { countries_data } from '../data/data.js';
Chart.defaults.scale.gridLines.display = false; //default chart none gridline
Chart.defaults.scale.gridLines.drawBorder = false; ///default chart none drawBorder

const countries_data_length = Object.keys(countries_data).length;
const barColors = "#ff9800";
const left_yValues_div = document.getElementById("left-yValues-column");
const right_yValues_div = document.getElementById("right-yValues-column");
const left_yValues_spans = document.querySelectorAll("#left-yValues-column > span");
const right_yValues_spans = document.querySelectorAll("#right-yValues-column > span");
const total_countries = document.getElementById("total-countries");
const p = document.querySelector("p");

total_countries.innerHTML = countries_data_length;
//*********************getting & displaying languages data**********************/
let i = 0;
let j =0;
const languages_data = function languages_data() {
  // creating a new array for all languages
  let languagesArray = [];
  let j = 0;
  //looping through each element and storing languages one by one in languagesArray
  countries_data
    .map((element) => element.languages)
    .forEach((element) => {
      element.forEach((element) => {
        languagesArray[j] = element.toString().split(",").toString();
        j++;
      });
    });
  //creating a new set of languages array for unique values
  const set = new Set(languagesArray);

  //comparing set(unique values) // each unique value with original array to get frequency of each language
  let filtered_spoken_langugages = [];
  set.forEach((language) =>filtered_spoken_langugages.push({
      lang: language, count: languagesArray.filter((element) => element === language).length})
  );
  let most_spoken_langugages = filtered_spoken_langugages.sort((a, b) => b.count - a.count);

  let left_yValues_column = [];
  let right_yValues_column = [];

  for (let i = 0; i < 10; i++) {
    left_yValues_column[i] = most_spoken_langugages[i].lang;
    right_yValues_column[i] = most_spoken_langugages[i].count;
  }
  return { left_yValues_column, right_yValues_column };
};

document.getElementById("languages-btn").onclick =
  function display_languages() {
	const left_yValues_column = languages_data().left_yValues_column;
	const right_yValues_column = languages_data().right_yValues_column;

	p.innerHTML = "10 Most Spoken Languages in the world"
	//preventing canvas overlapping on each other, each time trigger button creates a new chart
    reset_canvas();

    j = 0;
    for (const span of left_yValues_spans) {
      if(j == 10) // extra span added for world population, need to stop once loop reach 10th element
        break;
		span.innerHTML = left_yValues_column[j];
      j++;
    }
    left_yValues_spans[j].innerHTML = "";
    j = 0;
    for (const span of right_yValues_spans) {
      if(j == 10)
        break;
		span.innerHTML = right_yValues_column[j];
      j++;
    }
    right_yValues_spans[j].innerHTML = "";

    var xValues = left_yValues_column;
    var yValues = right_yValues_column;

    createChart(xValues, yValues, barColors);
  };

//*********************getting & displaying population data**********************/

const populationData = function population_data() {
  let populationArray =
    //looping through each element and storing popualtion one by one in populationArray
    countries_data.map((element) => {
      return { country: element.name, population: element.population };
    });

  let most_populated_countries = populationArray.sort(
    (a, b) => b.population - a.population
  );

  let left_yValues_column = [];
  let right_yValues_column = [];

  for (let i = 0; i < 10; i++) {
    left_yValues_column[i] = most_populated_countries[i].country;
    right_yValues_column[i] = most_populated_countries[i].population;
  }

  return { left_yValues_column, right_yValues_column };
};

document.getElementById("populaton-btn").onclick =
  function display_population() {
	const left_yValues_column = populationData().left_yValues_column;
	const right_yValues_column = populationData().right_yValues_column;

	let world_population = 0;
	countries_data.forEach((element) => {
		world_population += element.population;
	});

	p.innerHTML = "10 Most Popualted Countries in the world";
  const canvas_height = true;
	reset_canvas(canvas_height); // changing canvas height & margin to fit data values

  j = 0;
	i = 1;
	left_yValues_spans[0].innerHTML = "World";
    while ( i < left_yValues_spans.length) {
		left_yValues_spans[i].innerHTML = left_yValues_column[j];
      j++;
      i++;
    }
  j = 0;
	i = 1;
	right_yValues_spans[0].innerHTML = world_population.toLocaleString();
	while ( i < right_yValues_spans.length) {
		right_yValues_spans[i].innerHTML = right_yValues_column[j].toLocaleString();
      j++;
      i++;
    }
    var xValues = left_yValues_column;

    xValues.unshift("World");
    var yValues = right_yValues_column;
    yValues.unshift(world_population);

    createChart(xValues, yValues, barColors);
  };
//resetting canvas, stop overlapping
function reset_canvas(canvas_height) {
  document.getElementById("myChart").remove();
  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  canvas.style.cssText = `max-width: 613px;
                          min-height: 307px;
                          margin-bottom: 10px;                        
                          display: inline-block;`;
  if(canvas_height){
    canvas.style.minHeight = "335px";
    canvas.style.marginBottom = "0px";
  }
  const div_container = document.getElementById("data-container");
  let right_column = document.getElementById("right-yValues-column");
  div_container.insertBefore(canvas, right_column);
  const iframe_canvas = document.querySelector("iframe");
  if (iframe_canvas) 
  	div_container.removeChild(iframe_canvas);
}

function createChart(xValues, yValues, barColors) {
  new Chart("myChart", {
    type: "horizontalBar",
    data: {
      labels: xValues,
      datasets: [{
          backgroundColor: barColors,
          data: yValues,
        }],
    },
    options: {
      scaleShowLabels: false,
      legend: { display: false },
      title: {
        display: false,
        text: "",
      },
      scales: {
        xAxes: [{
            ticks: {
              display: false, //removing xAxes data, replaced with spans
            },
          }],
        yAxes: [{
            ticks: {
              display: false, //removing yAxes data, replaced with spans
            },
          }],
      },
    },
  });
}
