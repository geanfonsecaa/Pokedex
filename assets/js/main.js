const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonAttacksList = document.getElementById('pokemonAttacks');

const maxRecords = 386;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}" data-name="${pokemon.name}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img src="${pokemon.photo}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;

      // Adicione um ouvinte de evento de clique para cada Pokémon carregado
      const pokemonItems = pokemonList.querySelectorAll('.pokemon');
      pokemonItems.forEach((pokemonItem) => {
          pokemonItem.addEventListener('click', () => {
              showPokemonAttacks(pokemonItem.getAttribute('data-name'));
          });
      });
  });
}

function showPokemonAttacks(pokemonName) {
  // Substitua esta parte do código pela lógica que busca os ataques do Pokémon
  const attacks = getPokemonAttacks(pokemonName); // Função a ser implementada

  // Limpe a lista de ataques
  pokemonAttacksList.innerHTML = '';

  // Exiba os ataques na lista de ataques
  attacks.forEach((attack) => {
      const attackItem = document.createElement('li');
      attackItem.textContent = attack;
      pokemonAttacksList.appendChild(attackItem);
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
      loadPokemonItens(offset, limit);
  }
});
