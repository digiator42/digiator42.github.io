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
const countries_names = countries_data.map((element) => element.name);

h1.innerHTML = "world countries list".toUpperCase();
h2.innerHTML = `Total Numbers of countries: ${countries_names.length}`;
h3.innerHTML = "30DaysOfJavaScript:DOM-Day-2";

h1.style.cssText = `text-align : center;
                    font : Bold 40px Arial, sans-serif;
                    letter-spacing: 10px;`;
h2.style.cssText = `margin-top : -20px;
                    text-align : center;
                    font : Bold 15px Arial, sans-serif;`;
h3.style.cssText = `text-align : center;
                    margin-top : -10px;
                    font : 13px Arial, sans-serif;`;
div.style.cssText =
  "flex-flow:row wrap; display: flex; margin: 3% auto; width:864px;";

document.body.appendChild(div);

logic(); //dispalying all countries once page load, all pramerters are flase

const firstButton = document.getElementById("first");
const secondButton = document.getElementById("second");

firstButton.addEventListener("click", () => {
  if (secondButton.checked) secondButton.checked = false;
});
secondButton.addEventListener("click", () => {
  if (firstButton.checked) firstButton.checked = false;
});

let spans = document.body.querySelectorAll("div > span");

var inputValue;
input.addEventListener("keyup", () => {
  inputValue = input.value;
  if (spans.length > 0) {
    div.innerHTML = "";
  }
  if (!inputValue) 
    logic();
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
let flipper = true;

sort.addEventListener("click", () => {
  spans = document.body.querySelectorAll("div > span");
  let result = [];
  for (let i = 0; i < spans.length; i++) {
    result.push(spans[i].innerText);
  }
  if (flipper) {
    result.sort((a, b) => {
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    });
    div.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      let country_span = document.createElement("span");
      country_span.innerHTML = result[i].toLocaleUpperCase();
      country_span.style.cssText = span_cssText;
      div.appendChild(country_span);
    }
  } else {
    result.sort((a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
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
  flipper = !flipper;
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
    else if (len == 0 && secondChecked){
        error_msg.innerHTML = `There's no country includes ${inputValue}`;
    }

    for (let i = 0; i < len; i++) {
        let country_span = document.createElement("span");
        country_span.innerHTML = result[i].toLocaleUpperCase();

        country_span.style.cssText = span_cssText;
        div.appendChild(country_span);
    }
}
