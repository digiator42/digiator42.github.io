import {countries_data} from "../data/data.js";
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');
const div = document.createElement('div');
const input = document.getElementById('search');
const start_button = document.querySelector('#start-btn');
const any_button = document.querySelector('#any-btn');
const error_msg = document.getElementById("error-msg");

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
div.style.cssText = "flex-flow:row wrap; display: flex; margin: 3% auto; width:864px;";

document.body.appendChild(div);

const firstButton = document.getElementById('first');
const secondButton = document.getElementById('second');

firstButton.addEventListener("click", () => {
    if(secondButton.checked)
        secondButton.checked = false;
});
secondButton.addEventListener("click", () => {
    if(firstButton.checked)
        firstButton.checked = false;
});

var inputValue;
input.addEventListener('keyup', (() => {
    inputValue = input.value;
    console.log("current input value " + inputValue.toUpperCase());
    let spans = document.body.querySelectorAll("div > span");
    if (spans.length > 0) {
        console.log(spans);
        div.innerHTML = "";
    }
    const checked = true;
    const unChecked = false;
    if(!firstButton.checked && !secondButton.checked){
        error_msg.innerHTML = `Please select wether country starts or includes word`;  
    }
    if(inputValue && firstButton.checked && inputValue != ' '){
        error_msg.innerHTML = '';
        logic(inputValue, checked, unChecked);
      }
    if(inputValue && secondButton.checked && inputValue != ' '){
        error_msg.innerHTML = '';
        logic(inputValue, unChecked, checked);
    }
  })
)

	function logic(inputValue, firstChecked, secondChecked){
		
        var result 
        if(firstChecked)
            result = countries_names.filter(element => element.toUpperCase().startsWith(inputValue.toUpperCase()));
        if(secondChecked)   
            result = countries_names.filter(element => element.toUpperCase().indexOf(inputValue.toUpperCase()) != -1)
 
        console.log(result);
		const len = result.length;
        
        if(result.length == 0 && firstChecked)
            error_msg.innerHTML = `There's no country starts with ${inputValue}`;
        else if (result.length == 0 && secondChecked)
            error_msg.innerHTML = `There's no country includes ${inputValue}`;    

		for (let i = 0; i < len; i++) {
			let country_span = document.createElement('span');
			country_span.innerHTML = result[i].toLocaleUpperCase();

			country_span.style.cssText = `display: flex;
                                          justify-content: center;
                                          align-items: center;
                                          text-align: center;
                                          background-color: #0023428a;
                                          background-image: url("global.jpg");
                                          background-size : cover;
                                          background-blend-mode: multiply;
                                          color: white;
                                          font : bold 15px Arial, sans-serif;
                                          padding : 50px 15px;
                                          margin : 13px;
										  width : 80px;
                                          max-height : 120px;
                                          line-height: 13px;
										  border : 1px solid rgba(145, 145, 145, 0.2);
										  border-radius : 5px;`;   
			div.appendChild(country_span);
		}
}