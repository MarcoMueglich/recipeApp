var recipeID = document.getElementById('recipeId').getAttribute('value');

document.getElementById('deleteBtn').addEventListener('click', () => {
  fetch(`/rezepte/${recipeID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    window.location = '/rezepte';
  });
});
