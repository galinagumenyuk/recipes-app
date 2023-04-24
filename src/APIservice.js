// const key = "f95d9195e7114ffc9be334209a52d0bb";

export function fetchRandomRecipes() {
  return fetch(
    "https://api.spoonacular.com/recipes/random?number=9&apiKey=f95d9195e7114ffc9be334209a52d0bb&tags=vegetarian,dessert"
  ).then((res) => res.json());
}

export function fetchRecipeByKeyWord() {
  return fetch(
    "https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=6&apiKey=f95d9195e7114ffc9be334209a52d0bb"
  ).then((res) => res.json().then((data) => data.results));
}
