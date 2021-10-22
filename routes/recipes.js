var express = require('express');
var router = express.Router();

let recipes = [
    {
        recipeID: 242305,
        title: 'Lasagna',
        category: 'Main Dish',
        photoUrl: 'https://photos.bigoven.com/recipe/hero/kellys-lasagne.jpg',
        ingredients: [
            'SoySauce',
            'Vegetable Oil',
            'Brown Sugar',
            'Fresh Ginger',
        ],
        instructions:
            'Prepare marinade:\r\n\r\nMix soy sauce, dry sherry, vegetable oil, brown sugar and ginger. Whisk to incorporate. \r\n\r\nAdd to plastic ziptop bag with chicken breasts. Gently press to remove air, and place in a bowl in the fridge for at least 2 hours, up to 6. \r\n\r\nTurn on grill to medium heat. Oil grill. Place chicken breasts on grill, and let cook for 2 minutes. Then turn 90 degrees. Cook for 2 more minutes and flip. Cook for 2 more minutes. Turn 90 degrees. Check for doneness, remove from grill when done. Let rest on cutting board for 2 minutes. Slice on bias and serve atop white rice. Sprinkle with sesame seeds and or grilled scallions to garnish.',
        totalCalories: 528,
        totalMinutes: 180,
    },
    {
        recipeID: 242305,
        title: 'Lasagna',
        category: 'Main Dish',
        photoUrl: 'https://photos.bigoven.com/recipe/hero/kellys-lasagne.jpg',
        ingredients: [
            'SoySauce',
            'Vegetable Oil',
            'Brown Sugar',
            'Fresh Ginger',
        ],
        instructions:
            'Prepare marinade:\r\n\r\nMix soy sauce, dry sherry, vegetable oil, brown sugar and ginger. Whisk to incorporate. \r\n\r\nAdd to plastic ziptop bag with chicken breasts. Gently press to remove air, and place in a bowl in the fridge for at least 2 hours, up to 6. \r\n\r\nTurn on grill to medium heat. Oil grill. Place chicken breasts on grill, and let cook for 2 minutes. Then turn 90 degrees. Cook for 2 more minutes and flip. Cook for 2 more minutes. Turn 90 degrees. Check for doneness, remove from grill when done. Let rest on cutting board for 2 minutes. Slice on bias and serve atop white rice. Sprinkle with sesame seeds and or grilled scallions to garnish.',
        totalCalories: 528,
        totalMinutes: 180,
    },
    {
        recipeID: 242305,
        title: 'Lasagna',
        category: 'Main Dish',
        photoUrl: 'https://photos.bigoven.com/recipe/hero/kellys-lasagne.jpg',
        ingredients: [
            'SoySauce',
            'Vegetable Oil',
            'Brown Sugar',
            'Fresh Ginger',
        ],
        instructions:
            'Prepare marinade:\r\n\r\nMix soy sauce, dry sherry, vegetable oil, brown sugar and ginger. Whisk to incorporate. \r\n\r\nAdd to plastic ziptop bag with chicken breasts. Gently press to remove air, and place in a bowl in the fridge for at least 2 hours, up to 6. \r\n\r\nTurn on grill to medium heat. Oil grill. Place chicken breasts on grill, and let cook for 2 minutes. Then turn 90 degrees. Cook for 2 more minutes and flip. Cook for 2 more minutes. Turn 90 degrees. Check for doneness, remove from grill when done. Let rest on cutting board for 2 minutes. Slice on bias and serve atop white rice. Sprinkle with sesame seeds and or grilled scallions to garnish.',
        totalCalories: 528,
        totalMinutes: 180,
    },
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('recipes', { title: 'Rezepte', recipeData: recipes });
});

module.exports = router;
