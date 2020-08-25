//Init
let express = require("express");
let nodeFetch = require("node-fetch");
let bodyParser = require("body-parser");
let ejs = require("ejs");

//setup
let app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/pokemon", (req,res) => {
  let poke_query = req.query.name;
  console.log(poke_query);

  let response = nodeFetch("https://pokeapi.co/api/v2/pokemon/" + poke_query);
  response.then((rep) => {
    return rep.json();
  }).then((rep_data) => {

    let poke_object = {
      name: rep_data.name,
      abilities: rep_data.abilities,
      moves: rep_data.moves,
      stats: rep_data.stats,
      sprites: rep_data.sprites
    };
    res.send(poke_object);

  }).catch((err) => {
    res.send({error: "Pokemon Not Found"});
  });

});

app.get('*', function(req, res){
  res.send('Error Page', 404);
});

app.listen(3000,() => {
  console.log("working");
});
