function myFunction() {
  const error_msg = document.getElementById("error-msg");
  const add_player = document.getElementById("add-player");
  const fName_input = document.getElementById("fName");
  const sName_input = document.getElementById("sName");
  const country_input = document.getElementById("country");
  const pScore_input = document.getElementById("pScore");
  const holder_container = document.getElementById("holder");
  let j = 0;
  let scores = [];

  add_player.addEventListener("click", () => {
    let fName_value = fName_input.value;
    let sName_value = sName_input.value;
    let country_value = country_input.value;
    let pScore_value = pScore_input.value;
    const new_leader_board = `<div id="container ${j}">
                              <div id="name-date">
                              <p>${fName_value} ${sName_value}</p>
                              <p id="date">${current_timings()}</p>
                              </div>
                              <div id="country">${country_value}</div>
                              <div id="score">${pScore_value}</div>
                              <div id="buttons">
                              <button id="delete">del</button>
                              <button id="increase-score">++</button>
                              <button id="decrease-score">---</button>
                              </div></div>`;

    if(!fName_value || !sName_value || !country_value || !pScore_value)
      error_msg.innerHTML = 'All fields are required'
    else if(isNaN(pScore_value))
      error_msg.innerHTML = 'Score must be a number'
    else{
    error_msg.innerHTML = '';
    holder_container.insertAdjacentHTML("beforeend", new_leader_board);
    j++;
    sort_items();
    }
  });

  holder_container.addEventListener("click", (event) => {
    let target = event.target;

    while(target.parentNode.id == "buttons"){
      if (target.id == "delete") {
          target.parentNode.parentNode.remove();
      }
      else if(target.id == "increase-score"){
        let result = parseInt(target.parentNode.previousElementSibling.innerHTML) + 5;
        target.parentNode.previousElementSibling.innerHTML = result;
      }
      else if(target.id == "decrease-score"){
        let result = parseInt(target.parentNode.previousElementSibling.innerHTML) - 5;
        target.parentNode.previousElementSibling.innerHTML = result;
      }
      sort_items();
      break;
    }
    return 0;
  });
  
  function sort_items(){
    let all_leader_containers = document.querySelectorAll('#holder > div');

    for (let i = 0; i < all_leader_containers.length; i++) {
      scores.push({container : all_leader_containers[i], 
        score : parseInt(all_leader_containers[i].children[2].innerHTML)});
    }
    scores.sort((a, b) => b.score - a.score);
    holder_container.innerHTML = '';
    for (let i = 0; i < scores.length; i++) {
        holder_container.appendChild(scores[i].container);
    }

    all_leader_containers = document.querySelectorAll('#holder > div');
    for (let i = 0; i < all_leader_containers.length; i++) {
      if(i % 2 == 0){
        let id = scores[i].container.id;
        all_leader_containers[i].style.backgroundColor = '#c96fc5';  
      }
      else{
        all_leader_containers[i].style.backgroundColor = '#c1565685'; 
      }
    }
    scores = [];
  }

  function current_timings(){
    const now = new Date();
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();
    let day = now.toLocaleDateString();
    let month = now.toLocaleDateString('en-US', { month: 'long' });
    let year = now.getFullYear();
    if(hours < 10)
      hours = '0' + hours;
    if(minutes < 10)
      minutes = '0' + minutes;  

    return month.slice(0, 3) + " " + day.slice(0,2) + "," + year + " " + hours + ":" + minutes;
  }
}
