function getRecipeById(url) {
    $.get(url, function (data) {
        console.log('Recipe Data', data.data);
        let result = data.data;
        let imageSrc = result.image;
        $('#recipeImage').attr('src', imageSrc);
        let title = result.title;
        $('#recipeTitle').text(title);
        let servings = `Serves: ${result.servings}`;
        $('#recipeServes').text(servings);
        try {
            let steps = result.analyzedInstructions[0].steps;
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
                let stepLi = result.instructions;
                stepLi = `<li>${stepLI} ${equip}</li>`;
                $(stepLi).appendTo('#instruction');
            }
        } catch (e) {}
        let ingredients = result.extendedIngredients;
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

    });
}

function getRecipesByIngredient(url) {
    $.get(url, function (data) {
            recipes = data.data;
            console.log('Ingredients are:', recipes);
            try {
                $.each(recipes, function (i, value) {
                    recipeCard = `<div class="card">
                <div class="image">
                    <img src="${recipes[i].image}">
                    </div>
                    <div class="content">
                    <div class="header">${recipes[i].title}</div>
                    <div class="meta">
                        <a>Likes: ${recipes[i].likes}</a>
                    </div>
                    <div class="description">
                        Used Ingredients: ${recipes[i].usedIngredientCount} <br>
                        Missed Ingredients: ${recipes[i].missedIngredientCount}
                    </div>
                    </div>
                    <div class="ui bottom attached button byIngredient" id="${recipes[i].id}">
                        <i class="add icon"></i>
                        Get Recipe
                    </div>
                </div>`;
                    $(recipeCard).appendTo('.ui.link.cards');
                });
            } catch (e) {
                $('.ui.icon.message').css('display', 'none');
                $('.ui.negative.message').css('display', 'flex').fadeIn();
                $('footer').css('display', 'none');
                setTimeout(() => {
                    $('.ui.negative.message').fadeOut();
                    $('footer').css('position', 'fixed');
                    $('footer').css('display', 'flex');
                    $('.background-image').css('height', '107%').css('opacity', '1');
                    $('.background-image').css('opacity', '1').fadeIn();
                    // $('.center-screen').fadeIn();

                }, 2500)
            }

        })
        .catch(function () {
            console.log('Error');
            $('footer').css('position', 'fixed');
            $('.ui.icon.message').fadeOut();
            $('.ui.negative.message').css('display', 'flex');

        })
        .done(function (data) {
            // console.log(data.data);
            $('footer').css('position', 'fixed');
            $('.ui.icon.message').fadeOut();
            $('.background-image').css('height', '200%').css('opacity', '0.5');
            $('.ui.link.cards').css('display', 'flex').fadeIn(500);;
        });
};


function getRecipes(url) {
    $.get(url, function (data) {
            recipes = data.data;
            console.log('Ingredients are:', recipes);
            try {
                $.each(recipes, function (i, value) {
                    let dishTypes = recipes[i].dishTypes.join(' ,');
                    let instructions = (recipes[i].instructions).substring(0, 120) + '...';
                    recipeCard = `<div class="card">
                <div class="image">
                    <img src="${recipes[i].image}">
                    </div>
                    <div class="content">
                    <div class="header">${recipes[i].title}</div>
                    <div class="meta">
                        <a>${dishTypes}</a>
                    </div>
                    <div class="description">
                        ${instructions}
                    </div>
                    </div>
                    <div class="ui bottom attached button" id="${recipes[i].id}">
                        <i class="add icon"></i>
                        Get Recipe
                    </div>
                </div>`;
                    $(recipeCard).appendTo('.ui.link.cards');
                });
            } catch (e) {
                $('.ui.icon.message').css('display', 'none');
                $('.ui.negative.message').css('display', 'flex').fadeIn();
                $('footer').css('display', 'none');
                setTimeout(() => {
                    $('.ui.negative.message').fadeOut();
                    $('footer').css('position', 'fixed');
                    $('footer').css('display', 'flex');
                    $('.background-image').css('height', '107%').css('opacity', '1');
                    $('.background-image').css('opacity', '1').fadeIn();
                    // $('.center-screen').fadeIn();

                }, 2500)
            }

        })
        .catch(function () {
            console.log('Error');
            $('footer').css('position', 'fixed');
            $('.ui.icon.message').fadeOut();
            $('.ui.negative.message').css('display', 'flex');

        })
        .done(function (data) {
            console.log(data.data);
            $('footer').css('position', 'fixed');
            $('.ui.icon.message').fadeOut();
            $('.background-image').css('height', '200%').css('opacity', '0.5');
            $('.ui.link.cards').css('display', 'flex').fadeIn(500);;
        });
}