// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=50';


  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // created function to add, within the pokemon-list ul, list items with buttons holding a Pokemon's name as its inner text.
  function addListItem(pokemon) {
    let pokemonList = $('#pokemon-list');
    let pokemonListItembutton = $('<button></button>')
      .addClass('list-group-item  text-capitalize list-group-item-action text-center')
      .addClass('shadow p-3 mb-5  rounded pokemon-list-item')
      .attr("data-toggle", "modal")
      .attr("role", "listitem")
      .attr("type", "button")
      .attr("data-target", "#pokemonModal")
      .text(pokemon.name)
      .on({
        click: () => {
          showDetails(pokemon);
        }
      });
    pokemonList.append(pokemonListItembutton);
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();
    let nameElement = $('<h2>' + pokemon.name + '</h2>');

    let imageElementBack = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let typesElement = $('<p>' + 'Types: ' + pokemon.types.map(item => item.type.name).join(", ") + '</p>');

    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities.map(item => item.ability.name).join(", ") + '</p>');

    let imageElementFront = $('<img class=\'pokemon-modal-image\'>');
    imageElementFront.attr('src', pokemon.imageUrl);


    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
    modalBody.append(typesElement);

  }

  // function to load list of pokemon from apiURL, stores name & detailsUrl in pokemonList via add()
  function loadList() {
    return fetch(apiURL).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // function to load further details about pokemon (items) in the pokemonList: image, height & types
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  }

  // Create funtion that returns pokemonList
  function getAll() {
    return pokemonList;
  }

  // function to show details of the pokemon on the button 'click' event, called above within addListItem function
  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Call the LoadList() function of pokemonRepository, execute getAll from the pokemonRepository, 
// call the addListItem() function
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
