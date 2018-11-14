const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.render('home');
});



app.get('/random', (req, res) => {
    axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=8", {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log(response.data)
            res.send({
                data: response.data.recipes
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })
    // .then(response => console.log('Hi There!!!'));

});

app.get('/byIngredient/:ingredients', (req, res) => {
    let ingredients = (req.params.ingredients).split(',');
    let updatedIngredients = ingredients.map(str => str.trim());
    // ingredients.split(',');
    let finalIngredients = updatedIngredients.join('%2C');

    // console.log('Ingredients are::::@@@@@@@@@', ingredients);
    // console.log('Ingredients are::::@@@@@@@@@', updatedIngredients);
    // console.log('Ingredients are::::@@@@@@@@@', finalIngredients);

    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${finalIngredients}&number=4&ranking=1`, {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log('This is the response:::::::::', response.data)
            res.send({
                data: response.data
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })
    // .then(response => console.log('Hi There!!!'));

});


app.get('/byID/:recipeID', (req, res) => {
    let recipeID = req.params.recipeID;
    console.log('recipeID is', recipeID);
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information`, {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log('This is the response:::::::::', response.data)
            res.send({
                data: response.data
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })
    // .then(response => console.log('Hi There!!!'));

});



// unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/479101/information")
// .header("X-Mashape-Key", "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI")
// .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });



app.listen(port, process.env.IP, function () {
    console.log('Server running.....');
});