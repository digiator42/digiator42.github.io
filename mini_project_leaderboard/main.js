function myFunction() {
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
                              <p>date</p>
                              </div>
                              <div id="country">${country_value}</div>
                              <div id="score">${pScore_value}</div>
                              <div id="buttons">
                              <button id="delete">del</button>
                              <button id="increase-score">++</button>
                              <button id="decrease-score">---</button>
                              </div></div>`;

    holder_container.insertAdjacentHTML("beforeend", new_leader_board);
    j++;
    sort_items();
  });

  if (document.addEventListener) {
    document.addEventListener("click", onClick);
  }
  function onClick (event) {
    var target = event.target ? event.target : event.srcElement;

    if (target.id == "delete") {
        target.parentNode.parentNode.remove();
        console.log(1);
        sort_items();
    }
    else if(target.id == "increase-score"){
      let result = parseInt(target.parentNode.previousElementSibling.innerHTML) + 5;
      target.parentNode.previousElementSibling.innerHTML = result;
      console.log(result);
      sort_items();
    }
    else if(target.id == "decrease-score"){
      let result = parseInt(target.parentNode.previousElementSibling.innerHTML) - 5;
      target.parentNode.previousElementSibling.innerHTML = result;
      console.log(result);
      sort_items();
    }
  }


function sort_items(){
  let all_leader_containers = document.querySelectorAll('#holder > div');
  console.log(all_leader_containers);

  for (let i = 0; i < all_leader_containers.length; i++) {
    scores.push({container : all_leader_containers[i], 
      score : parseInt(all_leader_containers[i].children[2].innerHTML)});
  }
  scores.sort((a, b) => b.score - a.score);
  console.log(scores)
  holder_container.innerHTML = '';
  for (let i = 0; i < scores.length; i++) {
    holder_container.appendChild(scores[i].container);
  }
  scores = [];
  }
}
