let pokemonRepository = (function() {
  let pokemonList = [];
  console.log(pokemonList)

  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
          showModal(pokemon);
      });
  }

  // Implement the modal
  function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = ' ';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('.modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h3');
      titleElement.innerText = pokemon.name;

      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      let modalImage = document.createElement('div');
      modalImage.classList.add('modal-image');
      let image = document.createElement('img');
      image.src = pokemon.imageUrl;


      let contentElement = document.createElement('p');
      contentElement.innerText = `Height : ${pokemon.height}`;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modalImage.appendChild(image);
      modalContent.appendChild(modalImage);
      modalContent.appendChild(contentElement);
      modal.appendChild(modalContent);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  // Add a LoadList() function as a return key that uses fetch to GET the complete list of Pokémon from here: https://pokeapi.co/api/v2/pokemon/
  function loadList() {
      return fetch(apiURL).then(function (response) {
          return response.json();
      }).then(function (json) {
          json.results.forEach(function (item) {
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url
              };
              add(pokemon);
              console.log(pokemon);
          });
      }).catch(function (e) {
          console.error(e);
      });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
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
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
