var addIngredientBtn = document.getElementById('addIngredientBtn');
var lastInput = document.getElementById('lastInput');

// TODO implement removal of Ingredients

var addIngredientInput = () => {
    var inputHTML = `<div class="row"><div class="col-2"><input class="form-control" id="inputIngredientAmount1" type="text"></div><div class="col-8"><input class="form-control" id="inputIngredient1" type="text"></div>`;
    lastInput.before(
        document.createRange().createContextualFragment(inputHTML)
    );
};

addIngredientBtn.addEventListener('click', addIngredientInput);
