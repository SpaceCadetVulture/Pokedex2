let pokemonRepository= (function(){

  let pokemonList = [];

  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function getAll(){
    return pokemonList;
  }

  return{
      add:add,
      getAll:getAll,
      addListItem: addListItem
  }
})();

pokemonRepository.add({
  name: 'Pikachu1',
  height: 3,
  type: ['thunder', 'grass'], 
});

pokemonRepository.add({
  name: 'Pikachu2',
  height: 3,
  type: ['thunder', 'grass'], 
});

pokemonRepository.add({
  name: 'Pikachu3',
  height: 3,
  type: ['thunder', 'grass'], 
});

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

function showDetails(pokemon) {
    console.log(pokemon);
}

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

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
