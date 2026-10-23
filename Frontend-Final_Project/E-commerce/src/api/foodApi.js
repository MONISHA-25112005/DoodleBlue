
// const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// // Convert TheMealDB meal data into ShopKart product format
// function mapMeal(meal) {
//   const ingredients = [];

//   for (let i = 1; i <= 20; i++) {
//     const ingredient = meal[`strIngredient${i}`]?.trim();
//     const measure = meal[`strMeasure${i}`]?.trim();

//     if (ingredient) {
//       ingredients.push(
//         measure ? `${ingredient} - ${measure}` : ingredient
//       );
//     }
//   }

//   return {
//     id: String(meal.idMeal),
//     title: meal.strMeal || "Unnamed Meal",
//     image: meal.strMealThumb || "",
//     category: meal.strCategory || "Meals",
//     area: meal.strArea || "Not specified",
//     description: meal.strInstructions || "",
//     ingredients,
//     // TheMealDB does not provide selling prices.
//     price: 99 + (Number(meal.idMeal) % 400),
//     rating: 4.5,
//   };
// }

// // Search meals by name
// export async function searchFoodProducts(query = "chicken") {
//   const searchTerm = query.trim() || "chicken";

//   const response = await fetch(
//     `${BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch meals: ${response.status}`);
//   }

//   const data = await response.json();

//   return (data.meals || []).map(mapMeal);
// }

// // Get one meal using its TheMealDB ID
// export async function getProductById(id) {
//   const response = await fetch(
//     `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch meal: ${response.status}`);
//   }

//   const data = await response.json();
//   const meal = data.meals?.[0];

//   if (!meal) {
//     throw new Error("Meal not found.");
//   }

//   return mapMeal(meal);
// }




const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Convert API meal data into our app's product format
function mapMeal(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push(
        measure ? `${ingredient} - ${measure}` : ingredient
      );
    }
  }

  return {
    id: String(meal.idMeal),
    title: meal.strMeal || "Unnamed Food",
    image: meal.strMealThumb || "",
    category: meal.strCategory || "Food",
    area: meal.strArea || "Unknown",
    description: meal.strInstructions || "",
    ingredients,
    price: 99 + (Number(meal.idMeal) % 400),
    rating: 4.5,
  };
}

// Fetch foods by name
export async function searchFoodProducts(query = "chicken") {
  const searchTerm = query.trim() || "chicken";

  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch foods. Please try again.");
  }

  const data = await response.json();

  return (data.meals || []).map(mapMeal);
}

// Fetch one food using its ID
export async function getProductById(id) {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch food details.");
  }

  const data = await response.json();
  const meal = data.meals?.[0];

  if (!meal) {
    throw new Error("Food not found.");
  }

  return mapMeal(meal);
}
