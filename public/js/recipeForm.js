var addIngredientBtn = document.getElementById('addIngredientBtn');
var removeIngredientBtn = document.getElementById('removeIngredientBtn');
var ingredientCounter = document.querySelectorAll('.inputIngredient').length;

// TODO Rename File to recipeForm or something

var addIngredientInput = () => {
  ingredientCounter++;
  var inputHTML = `<div class="row mb-2 inputRow"><div class="col-2"><input class="form-control inputIngredientAmount" id="inputIngredientAmount${ingredientCounter}" type="text" name="amount${ingredientCounter}"></div><div class="col-8"><input class="form-control inputIngredient" id="inputIngredient${ingredientCounter}" type="text" name="ingredient${ingredientCounter}"></div>`;

  var inputRows = document.querySelectorAll('.inputRow');

  // Convert inputHTML to DOM Element and add after the last input
  inputRows[inputRows.length - 1].after(
    document.createRange().createContextualFragment(inputHTML)
  );

  // Reselect all rows to include new row
  inputRows = document.querySelectorAll('.inputRow');

  //Move the add and remove buttons to the new row
  inputRows[inputRows.length - 1].appendChild(addIngredientBtn.parentElement);
  inputRows[inputRows.length - 1].appendChild(
    removeIngredientBtn.parentElement
  );
};

var removeIngredientInput = () => {
  // Removing is only possible if there is more than 1 input
  if (ingredientCounter > 1) {
    ingredientCounter--;
    var inputRows = document.querySelectorAll('.inputRow');

    // Move the add and remove buttons to row before
    inputRows[inputRows.length - 2].appendChild(addIngredientBtn.parentElement);
    inputRows[inputRows.length - 2].appendChild(
      removeIngredientBtn.parentElement
    );

    // Remove the last Input
    inputRows[inputRows.length - 1].remove();
  }
};

var getIngredientAmountInputData = () => {
  var inputs = document.querySelectorAll('.inputIngredientAmount');

  var data = [];

  inputs.forEach((element) => {
    data.push(element.value);
  });

  return data;
};

var getIngredientInputData = () => {
  var inputs = document.querySelectorAll('.inputIngredient');

  var data = [];

  inputs.forEach((element) => {
    data.push(element.value);
  });

  return data;
};

// TODO add Client Validation

var getInputData = () => {
  var recipe = {
    title: document.querySelector('#inputTitle').value,
    category: document.querySelector('#inputCategory').value,
    imgUrl: document.querySelector('#inputImg').value,
    instructions: document.querySelector('#inputInstructions').value,
    amounts: getIngredientAmountInputData(),
    ingredients: getIngredientInputData(),
  };

  return recipe;
};

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

addIngredientBtn.addEventListener('click', addIngredientInput);
removeIngredientBtn.addEventListener('click', removeIngredientInput);

var uploadBtn = document.querySelector('#uploadBtn');

if (uploadBtn != null) {
  uploadBtn.addEventListener('click', (event) => {
    postData('/rezepte/erstellen', getInputData()).then((response) => {
      if (response == 'Successful') {
        var modal = new bootstrap.Modal(
          document.querySelector('#successModal')
        );
        modal.show();
      } else {
        var modal = new bootstrap.Modal(document.querySelector('#errorModal'));
        modal.show();
      }
    });
    event.preventDefault();
  });
}

var changeBtn = document.querySelector('#changeBtn');
var recipeID = document.getElementById('recipeId').getAttribute('value');

if (changeBtn != null) {
  changeBtn.addEventListener('click', (event) => {
    putData(`/rezepte/${recipeID}`, getInputData()).then((response) => {
      if (response == 'Successful') {
        var modal = new bootstrap.Modal(
          document.querySelector('#successModal')
        );
        modal.show();
      } else {
        var modal = new bootstrap.Modal(document.querySelector('#errorModal'));
        modal.show();
      }
    });
    event.preventDefault();
  });
}
