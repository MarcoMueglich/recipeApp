var addIngredientBtn = document.getElementById('addIngredientBtn');
var removeIngredientBtn = document.getElementById('removeIngredientBtn');
var lastRow = document.getElementById('lastRow');
var ingredientCounter = 1;

var addIngredientInput = () => {
    ingredientCounter++;
    var inputHTML = `<div class="row mt-2 inputRow"><div class="col-2"><input class="form-control" id="inputIngredientAmount${ingredientCounter}" type="text"></div><div class="col-8"><input class="form-control" id="inputIngredient${ingredientCounter}" type="text"></div>`;

    var inputRows = document.getElementsByClassName('inputRow');

    inputRows[inputRows.length - 1].after(
        document.createRange().createContextualFragment(inputHTML)
    );

    inputRows[inputRows.length - 1].appendChild(addIngredientBtn.parentElement);
    inputRows[inputRows.length - 1].appendChild(
        removeIngredientBtn.parentElement
    );
};

var removeIngredientInput = () => {
    if (ingredientCounter > 1) {
        ingredientCounter--;
        var inputRows = document.getElementsByClassName('inputRow');
        inputRows[inputRows.length - 2].appendChild(
            addIngredientBtn.parentElement
        );
        inputRows[inputRows.length - 2].appendChild(
            removeIngredientBtn.parentElement
        );

        inputRows[inputRows.length - 1].remove();
    }
};

addIngredientBtn.addEventListener('click', addIngredientInput);
removeIngredientBtn.addEventListener('click', removeIngredientInput);
