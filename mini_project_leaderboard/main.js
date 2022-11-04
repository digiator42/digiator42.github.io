function myFunction() {
  const add_player = document.getElementById("add-player");
  const fName_input = document.getElementById("fName");
  const sName_input = document.getElementById("sName");
  const country_input = document.getElementById("country");
  const pScore_input = document.getElementById("pScore");

  add_player.addEventListener("click", () => {
    let fName_value = fName_input.value;
    let sName_value = sName_input.value;
    let country_value = country_input.value;
    let pScore_value = pScore_input.value;

    const new_leader_board = `<div id="container">
<div id="name-date">
<p>${fName_value} ${sName_value}</p>
<p>date</p>
</div>
<div id="country">${country_value}</div>
<div id="score">${pScore_value}</div>
<div id="buttons">
<button>del</button>
<button>++</button>
<button>---</button>
</div></div>`;
const holder_container = document.getElementById("holder");
const leader_container = document.getElementById("container");
const name_date = document.getElementById("name-date");
const buttons = document.getElementById("buttons");
const next_sibling = document.getElementById("next-sibling");
    if (!leader_container) {
      console.log("run1")
      holder_container.innerHTML = new_leader_board;
    } 
    else{
      next_sibling.insertAdjacentHTML("beforeBegin", new_leader_board);
    }

  });
}
