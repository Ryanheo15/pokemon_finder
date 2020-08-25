//SELECTORS
//form
let signup_form = $(".signup_form");
let poke_name = $(".name");
let submit_btn = $(".submit_btn");

//card
let card = $(".card");
let poke_img = $(".poke-img");
let poke_title = $(".poke-title");
let more_arrow = $(".more_arrow");
let abilities = $(".abilities");
let moves = $(".moves");
let stats = $(".stats");
let abilities_text = $(".abilities_text");
let moves_text = $(".moves_text");
let stats_text = $(".stats_text");
let err = $(".error");

//Helper functions
let init = function(e){
  card.hide();
  err.hide();
}

let display_pokemon = function(data){
  card.show();
  poke_title.text(data.name);
  poke_img.attr("src", data.sprites.other["official-artwork"].front_default);

  //remove previous data
  abilities.children().remove();
  moves.children().remove();
  stats.children().remove();

  //default settings
  more_arrow.removeClass("fas fa-chevron-up");
  more_arrow.addClass("fas fa-chevron-down");
  abilities_text.removeClass("hidden");
  abilities_text.removeClass("shown");
  abilities_text.addClass("hidden");

  moves_text.removeClass("hidden");
  moves_text.removeClass("shown");
  moves_text.addClass("hidden");

  stats_text.removeClass("hidden");
  stats_text.removeClass("shown");
  stats_text.addClass("hidden");


  //pokemon data initialization
  for(let i = 0; i < data.abilities.length; i++){
    let item = document.createElement("li");
    item.className = "list-group-item bg-light";
    let ability = data.abilities[i].ability.name;
    item.textContent = ability;

    abilities.append(item);
  }

  for(let i = 0; i < data.moves.length; i++){
    let item = document.createElement("li");
    item.className = "list-group-item bg-light";
    let move = data.moves[i].move.name;
    item.textContent = move;

    moves.append(item);
  }

  for(let i = 0; i < data.stats.length; i++){
    let item = document.createElement("li");
    item.className = "list-group-item bg-light";

    let stat_name = data.stats[i].stat.name;
    let stat = data.stats[i].base_stat;
    item.textContent = stat_name + " : " + stat;

    stats.append(item);
  }
}

//EVENT LISTENER
$(document).ready(() => {
  //init
  init();

  //form submt event
  signup_form.submit((e) => {
    e.preventDefault();
    let query_param = poke_name.val().toLowerCase();
    let response = fetch("http://localhost:3000/pokemon?name=" + query_param);
    response.then((res) => {
      return res.json();
    }).then((res_json) => {
      if(res_json.error){
        card.hide();
        err.show();
        $(".error_message").text(res_json.error);
      }
      else {
        //init
        err.hide();
        //display pokemon
        display_pokemon(res_json);

        //init for data
        abilities.hide();
        moves.hide();
        stats.hide();


        //click for more
        more_arrow.unbind('click');
        more_arrow.click((e) => {
          let element = $(e.target).parent().parent();
          let arrow = element.find("i");
          if((element.text().trim()) === "Abilities"){
            if(element.hasClass("hidden")){
              abilities.show();
              element.addClass("shown");
              element.removeClass("hidden");
              arrow.removeClass("fas fa-chevron-down");
              arrow.addClass("fas fa-chevron-up");
            }
            else {
              abilities.hide();
              element.addClass("hidden");
              element.removeClass("shown");
              arrow.removeClass("fas fa-chevron-up");
              arrow.addClass("fas fa-chevron-down");
            }
          }
          else if((element.text().trim()) === "Moves"){
            if(element.hasClass("hidden")){
              moves.show();
              element.addClass("shown");
              element.removeClass("hidden");
              arrow.removeClass("fas fa-chevron-down");
              arrow.addClass("fas fa-chevron-up");
            }
            else {
              moves.hide();
              element.addClass("hidden");
              element.removeClass("shown");
              arrow.removeClass("fas fa-chevron-up");
              arrow.addClass("fas fa-chevron-down");
            }
          }
          else {
            if(element.hasClass("hidden")){
              stats.show();
              element.addClass("shown");
              element.removeClass("hidden");
              arrow.removeClass("fas fa-chevron-down");
              arrow.addClass("fas fa-chevron-up");
            }
            else {
              stats.hide();
              element.addClass("hidden");
              element.removeClass("shown");
              arrow.removeClass("fas fa-chevron-up");
              arrow.addClass("fas fa-chevron-down");
            }
          }
        });
      }

    }).catch((err) => {
      console.log(err);
    });
  });


});
