let pokemonRepository= (function(){

  let pokemonList = [];
  console.log(pokemonList)

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Create function to add pokemon to pokemonList
  function add(pokemon) {
      pokemonList.push(pokemon)
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    console.log(pokemonList)
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("poke-button")
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
        showDetails(pokemon)
    });
  }

   // Call the loadDetails() function from above, pass as parameter the Pokémon object.
   function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        console.log(pokemon)
    });
  }

  // Add a LoadList() function as a return key that uses fetch to GET the complete list of Pokémon from here: https://pokeapi.co/api/v2/pokemon/
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Create funtion that returns pokemonList
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  }
})();

// Call the LoadList() function of pokemonRepository, execute getAll from the pokemonRepository, 
// call the addListItem() function
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
