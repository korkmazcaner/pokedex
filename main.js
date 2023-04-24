const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector(".searchInput");
const pokeContainer = document.querySelector("#pokeContainer");

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

const bgColor = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

// Fİrst Function
async function getPokeList() {
  for (let i = 0; i < 151; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
      .then((res) => res.json())
      .then((pokemon) => {
        const pokeType = pokemon.types[0].type.name;
        const pokeId = pokemon.id.toString().padStart(3, "0");
        pokeContainer.innerHTML += `
        <div class="pokemon" style="background-color:${bgColor[pokeType]}">
        <div class="imageHolder">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="" />
        </div>
        <span class="pokeId">#${pokeId}</span>
        <h3>${pokemon.name}</h3>
        <div class="spans">
          <span><i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp</span>
          <span><i class="fa-solid fa-weight-scale"></i> ${pokemon.weight} Kg</span>
          <span><i class="fa-brands fa-uncharted"></i> ${pokeType} </span>
        </div>
      </div>
        `;
      });
  }
}

getPokeList();

// Second Function

function filterPokeList() {
  const pokeNameList = document.querySelectorAll(".pokemon h3");
  pokeNameList.forEach((pokeName) => {
    if (pokeName.innerHTML.includes(searchInput.value.toLowerCase())) {
      pokeName.parentElement.style.display = "flex";
    } else {
      pokeName.parentElement.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterPokeList);

fetch(`https://pokeapi.co/api/v2/pokemon/1`)
  .then((res) => res.json())
  .then((obj) => console.log(obj));
