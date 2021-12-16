// Variables ----------------------------------------------------

var addIngredientBtn = document.getElementById('addIngredientBtn');
var removeIngredientBtn = document.getElementById('removeIngredientBtn');
var uploadBtn = document.getElementById('uploadBtn');
var changeBtn = document.getElementById('changeBtn');
var alertBox = document.getElementById('alertBox');

var ingredientCounter = document.querySelectorAll('.inputIngredient').length;

// Functions ----------------------------------------------------------

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
        inputRows[inputRows.length - 2].appendChild(
            addIngredientBtn.parentElement
        );
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

var validateInputData = () => {
    alertBox.classList.add('d-none');
    while (alertBox.firstChild) {
        alertBox.firstChild.remove();
    }

    validateField('inputTitle', 'Titel', /^[a-zA-ZäöüÄÖÜß0-9 ]*$/);
    validateField('inputCategory', 'Kategorie', /^[a-zA-ZäöüÄÖÜß0-9 ]*$/);
    validateField('inputImg', 'Foto', /^[a-zA-ZäöüÄÖÜß0-9/.:\- ]*$/);
    validateField(
        'inputInstructions',
        'Zubereitung',
        /^[a-zA-ZäöüÄÖÜß0-9.!?, ]*$/
    );

    document.querySelectorAll('.inputRow').forEach((element, index) => {
        validateField(
            'inputIngredientAmount' + (index + 1),
            'Menge ' + (index + 1),
            /^[a-zA-ZäöüÄÖÜß0-9 ]*$/
        );
        validateField(
            'inputIngredient' + (index + 1),
            'Zutat ' + (index + 1),
            /^[a-zA-ZäöüÄÖÜß0-9 ]*$/
        );
    });

    if (alertBox.childElementCount > 0) {
        alertBox.classList.remove('d-none');
    }
};

var validateField = (fieldID, fieldName, regex) => {
    var fieldValue = document.getElementById(fieldID).value;

    if (fieldValue === '' || fieldValue === null) {
        var node = document.createElement('p');
        var alertMessage = document.createTextNode(fieldName + ' ist leer!');
        node.appendChild(alertMessage);
        alertBox.appendChild(node);
    } else {
        if (regex.test(fieldValue)) {
            return true;
        } else {
            var node = document.createElement('p');
            var alertMessage = document.createTextNode(
                fieldName + ' entspricht nicht den Vorgaben.'
            );
            node.appendChild(alertMessage);
            alertBox.appendChild(node);
        }
    }
};

var getInputData = () => {
    return {
        title: document.querySelector('#inputTitle').value,
        category: document.querySelector('#inputCategory').value,
        imgUrl: document.querySelector('#inputImg').value,
        instructions: document.querySelector('#inputInstructions').value,
        amounts: getIngredientAmountInputData(),
        ingredients: getIngredientInputData(),
    };
};

async function fetchPostData(url = '', data = {}) {
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

async function fetchPutData(url = '', data = {}) {
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

function isValidUrl(_string) {
    const matchPattern =
        /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(_string);
}

// Event Listeners ----------------------------------------------------

addIngredientBtn.addEventListener('click', addIngredientInput);
removeIngredientBtn.addEventListener('click', removeIngredientInput);

// TODO rework so only shows image if url is a valid img url
document.querySelector('#inputImg').addEventListener('input', () => {
    var url = document.querySelector('#inputImg').value;
    if (isValidUrl(url)) {
        document.querySelector('#imgPreview').classList.remove('d-none');
        document.querySelector('#imgPreview').src = url;
    } else {
        document.querySelector('#imgPreview').classList.add('d-none');
    }
});

if (uploadBtn != null) {
    uploadBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validateInputData();

        if (alertBox.childElementCount == 0) {
            fetchPostData('/rezepte/erstellen', getInputData()).then(
                (response) => {
                    if (response == 'Successful') {
                        var modal = new bootstrap.Modal(
                            document.querySelector('#successModal')
                        );
                        modal.show();
                    } else {
                        var modal = new bootstrap.Modal(
                            document.querySelector('#errorModal')
                        );
                        modal.show();
                    }
                }
            );
        }
    });
}

if (changeBtn != null) {
    var recipeID = document.getElementById('recipeId').getAttribute('value');
    changeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validateInputData();

        if (alertBox.childElementCount == 0) {
            fetchPutData(`/rezepte/${recipeID}`, getInputData()).then(
                (response) => {
                    if (response == 'Successful') {
                        var modal = new bootstrap.Modal(
                            document.querySelector('#successModal')
                        );
                        modal.show();
                    } else {
                        var modal = new bootstrap.Modal(
                            document.querySelector('#errorModal')
                        );
                        modal.show();
                    }
                }
            );
        }
    });

    document.querySelector('#imgPreview').classList.remove('d-none');
    document.querySelector('#imgPreview').src =
        document.querySelector('#inputImg').value;
}
