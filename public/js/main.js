$(function () {
    $('.ui.dropdown')
        .dropdown();

    let recipeCard = '';
    let recipes = [];
    let randomURL = '/random';
    let ingredientsURL = '/byIngredient';


    ipLookUp(); //header.js

    $('#enterBtn').click(function (e) {
        let url = randomURL;
        $('.center-screen').fadeOut();
        $('.ui.icon.message').css('display', 'flex').fadeIn();
        activeMenu(); //menuFunctions.js
        getRecipes(url); //recipeFunctions.js
    });

    $('.close icon').click((e) => {
        e.preventDefault();
        $('.ui.negative.message').css('display', 'none').fadeOut();
    });

    $('.ui.link.cards').on('click', '.ui.bottom.attached.button', function (e) {
        $('.center-screen').fadeOut();
        $('.ui.icon.message').css('display', 'flex').fadeIn();
        $("#indiviualRecipe").css('display', 'none').fadeOut();
        indiviualRecipe
        let recipeID = parseInt($(this).attr('id'));
        console.log('ID of button clicked:', recipeID);
        const result = recipes.filter(obj => {
            return obj.id === recipeID;
        });
        try {
            //   console.log('Recipes:',recipes)
            console.log('This Recipe:', result);
            console.log('Recipe Image:', result[0].image);
            console.log('Recipe Title:', result[0].title);
            console.log('Recipe Servings:', result[0].servings);
            console.log('Recipe ID:', result[0].id);

            let imageSrc = result[0].image;
            $('#recipeImage').attr('src', imageSrc);
            let title = result[0].title;
            $('#recipeTitle').text(title);
            let servings = `Serves: ${result[0].servings}`;
            $('#recipeServes').text(servings);
            let steps = result[0].analyzedInstructions[0].steps;
            if (steps.length > 0) {
                steps.forEach(step => {
                    console.log('step', step.step);
                    let process = step.step;
                    let stepLi = '';
                    let equip = '';
                    step.equipment.forEach(piece => {
                        console.log('Equip:', piece.name, 'Equip Image', `https://spoonacular.com/cdn/equipment_100x100/${piece.image}`);
                        equip = equip + `<img src="https://spoonacular.com/cdn/equipment_100x100/${piece.image}">`;
                    });
                    stepLi = `<li>${process} ${equip}</li>`;
                    $(stepLi).appendTo('#instruction');
                });
            } else {
                let stepLi = result[0].instructions;
                stepLi = `<li>${stepLI} ${equip}</li>`;
                $(stepLi).appendTo('#instruction');

            }

            let ingredients = result[0].extendedIngredients;
            console.log(ingredients);
            ingredients.forEach(ingredient => {
                let ingredientAmount = ingredient.measures.metric.amount;
                if (ingredient.measures.metric.unitLong === 'grams') {
                    ingredientAmount = parseInt(ingredient.measures.metric.amount);
                } else {
                    ingredientAmount = (ingredient.measures.metric.amount);
                }
                console.log('Ingredients:', ingredient.name, 'imageURL:', `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`, 'Ingredient Amount:', ingredient.amount, 'Metric Name:', ingredient.measures.metric.unitLong, 'Metric Amount:', ingredient.measures.metric.amount, 'US Name:', ingredient.measures.us.unitLong, 'US Amount:', ingredient.measures.us.amount);
                let testLi = `<li>${ingredientAmount} ${ingredient.measures.metric.unitLong} - ${ingredient.name}         <img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}"></li>`;
                $(testLi).appendTo('#ingredient');
            });
            $('.ui.link.cards').css('display', 'none').fadeOut();
            $('.ui.icon.message').fadeOut();
            $("#indiviualRecipe").css('display', 'block').fadeIn();

        } catch {
            $('.center-screen').fadeOut();
            $('.ui.icon.message').css('display', 'flex').fadeIn();
            let recipeID = parseInt($(this).attr('id'));
            let url = '/byID/' + recipeID;
            getRecipeById(url); //recipeFunctions.js
        }
    });

    $('#returnToMenu').click((e) => {
        e.preventDefault();
        result = [];
        $("#indiviualRecipe").css('display', 'none').fadeOut();
        $('.ui.link.cards').css('display', 'flex').fadeIn();
        $('#ingredient').empty();
        $('#instruction').empty();
    });

    $('#searchByIngredients').click((e) => {
        e.preventDefault();
        $("#indiviualRecipe").css('display', 'none').fadeOut();

        $('.ui.link.cards').empty();

        let ingredients = $('#searchBox').val();
        console.log(ingredients);
        let url = ingredientsURL + '/' + ingredients;
        $('.center-screen').fadeOut();
        $('.ui.icon.message').css('display', 'flex').fadeIn();
        getRecipesByIngredient(url); //recipeFunctions.js
    });
});