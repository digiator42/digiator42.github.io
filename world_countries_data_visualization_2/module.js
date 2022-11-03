import { countries_data } from "../data/data.js";
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const div = document.createElement("div");
const input = document.getElementById("search");
const sort = document.getElementById("sort");
const error_msg = document.getElementById("error-msg");
let span_cssText = `display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box; 
                    box-sizing: border-box; 
                    background-color: #0023428a;
                    background-image: url("global.jpg");
                    background-size : cover;
                    background-blend-mode: multiply;
                    color: white;
                    font : bold 13px Arial, sans-serif;
                    padding : 50px 15px;
                    margin : 13px;
                    width : 110px;
                    height : 120px;
                    line-height: 13px;
                    border : 1px solid rgba(145, 145, 145, 0.2);
                    border-radius : 5px;`;
                 
const countries_names = countries_data.map((element) => element.name); //filtering countries names in new map.

h1.innerHTML = "world countries list".toUpperCase();
h2.innerHTML = `Total Numbers of countries: ${countries_names.length}`;

h1.style.cssText = `text-align : center;
                    font : Bold 40px Arial, sans-serif;
                    letter-spacing: 10px;`;
h2.style.cssText = `margin-top : -20px;
                    text-align : center;
                    font : Bold 15px Arial, sans-serif;`;
h3.style.cssText = `text-align : center;
                    font : 16px Arial, sans-serif;
                    margin-bottom: 0`;
div.style.cssText =`flex-flow:row wrap;
                    display: flex;
                    margin: 3% auto;
                    width:864px;`;

document.body.appendChild(div);

document.body.onload =  logic(); //dispalying all countries once page load, all pramerters are flase

const firstButton = document.getElementById("first");
const secondButton = document.getElementById("second");

firstButton.addEventListener("click", () => {
    error_msg.innerHTML = '';
    secondButton.checked = false;
    sort.checked = false;
});
secondButton.addEventListener("click", () => {
    error_msg.innerHTML = '';
    firstButton.checked = false;
    sort.checked = false;
});

let spans = document.body.querySelectorAll("div > span");

var inputValue;
input.addEventListener("keyup", () => {  //input event listners.
  inputValue = input.value;
  if (spans.length > 0) {
    div.innerHTML = "";
  }
  if (!inputValue){ 
    error_msg.innerHTML = "";
    h3.innerHTML = ``;
    logic();
  }
  const checked = true;
  const unChecked = false;
  if (!firstButton.checked && !secondButton.checked) {
    error_msg.innerHTML = `Please select wether country starts or includes word`;
  }
  if (inputValue && firstButton.checked) {
    error_msg.innerHTML = "";
    logic(inputValue, checked, unChecked);
  }
  if (inputValue && secondButton.checked) {
    error_msg.innerHTML = "";
    logic(inputValue, unChecked, checked);
  }
});

sort.addEventListener("click", () => { // sorting button event listner 
  spans = document.body.querySelectorAll("div > span");
  let result = [];
  for (let i = 0; i < spans.length; i++) {
    result.push(spans[i].innerText);
  }
  if (true) {
    result.sort((a, b) => {
      if (a > b && a.charCodeAt() >= 65 || a.charCodeAt() <= 122) return -1;
      if (b > a && a.charCodeAt() >= 65 || a.charCodeAt() <= 122) return 1;
      return 0;
    });
    div.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      let country_span = document.createElement("span");
      country_span.innerHTML = result[i].toLocaleUpperCase();
      country_span.style.cssText = span_cssText;
      div.appendChild(country_span);
    }
  } 
});

function logic(inputValue, firstChecked, secondChecked) {
    var result;
    if (firstChecked)
        result = countries_names.filter((element) =>
        element.toUpperCase().startsWith(inputValue.toUpperCase())
        );
    if (secondChecked)
        result = countries_names.filter((element) =>
        element.toUpperCase().indexOf(inputValue.toUpperCase()) != -1
        );
    if (!firstChecked && !secondChecked) result = countries_names;

    const len = result.length;

    if (len == 0 && firstChecked){
        error_msg.innerHTML = `There's no country starts with ${inputValue}`;
    }
    if (len == 0 && secondChecked){
        error_msg.innerHTML = `There's no country includes ${inputValue}`;
    }
    if (len == 0 && inputValue.trim().length == 0) //checking if user input is spaces.
        error_msg.innerHTML = `There's no country includes spaces`;
    if(firstChecked || secondChecked){
        h3.innerHTML = `Searched Countries with <span id="h3-input">
              ${inputValue.toUpperCase()} </span>are <span id="h3-count">${len}</span>`;
        const h3_input = document.getElementById('h3-input');
        const h3_count = document.getElementById('h3-count');
        h3_input.style.cssText = `color: #ff3b00;
                                  font: 18px arial;
                                  font-weight : 800`;                    
        h3_count.style.cssText = `color: #66fd63e0;
                                  font: 18px arial, sans-serif;
                                  font-weight : 800`;   
    }
    for (let i = 0; i < len; i++) { //diplaying result by creating span for each result. 
        let country_span = document.createElement("span");
        country_span.innerHTML = result[i].toLocaleUpperCase();

        country_span.style.cssText = span_cssText;
        div.appendChild(country_span);
    }
}
