// const input = document.querySelector(".input");
// const title = document.querySelector(".title");
// const info = document.querySelector(".info");
// const img = document.querySelector(".img");
// const ingredientsOutput = document.querySelector(".ingredients");
const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");

  const showMealInfo = (meal) => {
    
    const mealElement = document.createElement("div");
    mealElement.classList.add("meal");

    const { strMeal, strMealThumb, strInstructions } = meal;

    const title = document.createElement("h1");
    title.textContent = strMeal;
    mealElement.appendChild(title);

    const image = document.createElement("div");
    image.classList.add("meal-image");
    image.style.backgroundImage = `url(${strMealThumb})`;
    mealElement.appendChild(image);

    const instructionsHeaderA = document.createElement("h2");
    instructionsHeaderA.textContent = "Instructions";
    mealElement.appendChild(instructionsHeaderA);
    const instructions = document.createElement("p");
    
    instructions.textContent = strInstructions;
    instructions.style.maxHeight = "100px";
    mealElement.appendChild(instructions);
    
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("ingredients");

    const ingredients = [];
  
      for (let i = 1; i <= 5; i++) {
        if (meal[`strIngredient${i}`]) {    
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
  
      const html = `
      <span>${ingredients
        .map((ing) => `<li class="ing">${ing}</li>`)
        .join("")}</span>
        <button class="main-btn">$40 - Order Now</button>
    `;
    const instructionsHeader = document.createElement("h2");
    instructionsHeader.textContent = "Ingredients";
    mealElement.appendChild(instructionsHeader);
    ingredientsContainer.innerHTML = html;
    mealElement.appendChild(ingredientsContainer);

    return mealElement;
  };

  const showAlert = () => {
    alert("Meal not found :(");
  };

  const fetchMealData = async (val) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );

    const { meals } = await res.json();
    return meals;
  };

  const val = input.value.trim();

  if (val) {
    const meals = await fetchMealData(val);

    if (!meals) {
      showAlert();
      return;
    }

    const resultsContainer = document.querySelector(".results");
    resultsContainer.innerHTML = ""; 

    meals.forEach((meal) => {
      const mealElement = showMealInfo(meal);
      resultsContainer.appendChild(mealElement);
    });
  } else {
    alert("Please try searching for meal :)");
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);

const magnifier = document.querySelector(".magnifier");
magnifier.addEventListener("click", searchMeal);
