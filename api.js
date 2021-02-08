const searchButton = document.getElementById("searchButton");
const foodDetails = document.getElementById("mealDetails");
searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        const mealList = document.getElementById("meal");
        let allMealList = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                allMealList += `
                <div onclick="displayMeals('${meal.idMeal}')" id = "mealItem" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}">
                    </div>
                    <div class = "meal-name">
                        <h3> ${meal.strMeal}</h3>
                    </div>
                </div>
                `;   
            });
        }else{
            allMealList = "Error";
        }

        mealList.innerHTML = allMealList;
    });
});


const displayMeals = idMeal => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php/?i=${idMeal}`)
        .then(res => res.json())
        .then(data => displayMealsDetails(data.meals[0]));

}



const displayMealsDetails = meal => {
    const IngredientsDetails = document.getElementById("mealsDetails");
    IngredientsDetails.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul>
    <li>${meal.strIngredient1}</li>
    <li>${meal.strIngredient2}</li>
    <li>${meal.strIngredient3}</li>
    <li>${meal.strIngredient4}</li>
    <li>${meal.strIngredient5}</li>
    <li>${meal.strIngredient6}</li>
    </ul>
    `;
}