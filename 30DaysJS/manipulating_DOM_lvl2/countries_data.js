import { countries_data } from "../data/data.js"

document.body.onload = 
	function logic(){
		const h1 = document.createElement('h1');
		const h2 = document.createElement('h2');
		const h3 = document.createElement('h3');
		const div = document.createElement('div');
		const countries_names = countries_data.map((element) => element.name);
		const countries_len = countries_names.length;

		h1.innerHTML = "world countries list".toUpperCase();
		h2.innerHTML = `Total Numbers of countries: ${countries_len}`;
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

		document.body.appendChild(h1);
		document.body.appendChild(h2);
		document.body.appendChild(h3);
		document.body.appendChild(div);

		for (let i = 0; i < countries_len; i++) {
			let country_span = document.createElement('span');

			country_span.innerHTML = countries_names[i].toLocaleUpperCase();
			country_span.style.cssText = `padding : 50px 15px;
										  width : 100px;
										  margin : 5px 5px;
										  font : 12px Arial, sans-serif;
										  text-align : center;
										  border : 1px solid rgba(145, 145, 145, 0.2);
										  border-radius : 5px;`;
			div.appendChild(country_span);
		}
}