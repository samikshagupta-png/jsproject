const carouselImage = document.querySelector("#carouselImage");
const searchRecipe = document.querySelector("#searchrecipe");
const searchBtn = document.querySelector("#searchBtn");
let fact = document.querySelector("#quote");
let dishName=document.querySelector("#dishname");
let content = document.querySelector(".content");
let image=document.querySelector(".image");
let list = document.querySelector(".list");
const ingredient=document.querySelector("#ingredient");
const recipeimage = document.querySelectorAll(".dish img, .items img");





const images = [
  "food1.jpg",
  "food2.jpg",
  "food3.jpg",
  "food4.jpg",
  
];
let index=0;
function swapImages(){
    if (index<images.length){
        carouselImage.src=images[index];
        index++
    }else{
        carouselImage.src="food.jpg";
        index=0;
    }
}



const facts= [
    "🍕 Pizza existed in ancient times — Egyptians, Romans, and Greeks ate flatbreads with toppings.",

    "🍫 Chocolate was once used as currency by the Aztecs.",

    "🥛 Milk is the most stolen food item worldwide.",

    "🍌 Bananas are technically berries, while strawberries are not.",

    "🍯 Honey never spoils — jars found in Egyptian tombs are still edible.",

    "🍎 Apples float because they are 25% air.",

    "🌽 Corn cobs always have an even number of kernel rows (usually 16).",

    "🍟 French fries actually originated in Belgium, not France.",

    "🍵 Tea is the second most consumed drink in the world, after water.",

    "🥕 Carrots were originally purple before orange ones were cultivated in the Netherlands."
];
let factindex=0;

function showfact(){
    fact.textContent=facts[factindex];
    factindex = (factindex+1)% facts.length;
   
}
if (carouselImage) { setInterval(swapImages, 3000); }
if (fact) { showfact(); setInterval(showfact, 5000); }


if (searchBtn) {
  searchBtn.addEventListener("click", function() {
    const name = searchRecipe.value.trim();
    if (name) {
      window.location.href = `in.html?recipe=${encodeURIComponent(name)}`;
    }
  });
}

const params = new URLSearchParams(window.location.search);
const recipeName = params.get("recipe");

if (recipeName) {
  getRecipe(recipeName);
}


async function getRecipe(name){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();
    if (!data.meals) {
        // Show apology message in navbar
        if (dishName) {
            dishName.textContent = "😔 Sorry, recipe not found!";
        }
        return;
    }
    const meal = data.meals[0];

    // console.log(meal.strMeal);
    // console.log(meal.strMealThumb);
    // console.log(meal.strInstructions);
    if(dishName){
        dishName.textContent=meal.strMeal;
    }
    
    ingredient.innerHTML = ""; // clear old list
    for (let i = 1; i <= 20; i++) {
        const items = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (items && items.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = `${items} : ${measure}`; // set text inside <li>
            ingredient.appendChild(li); // add to the UL
        }
    
    };
    if (image) {
        image.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`;

    }
    if(list){
        list.textContent=meal.strInstructions;

    }
};
// Only runs when in.html is opened
recipeimage.forEach(img => {
  img.addEventListener("click", () => {
    console.log("Clicked:", img.dataset.recipe);
    const recipeName = img.dataset.recipe;
    if (recipeName) {
      window.location.href = `in.html?recipe=${encodeURIComponent(recipeName)}`;
    }
  });
});
