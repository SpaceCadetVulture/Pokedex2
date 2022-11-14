var pokemonRepository = (function() {
	  var pokemonList = [];
	  console.log(pokemonList)
	

	  var apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	

	  // Create function to add pokemon to pokemonList
	  function add(pokemon) {
	      pokemonList.push(pokemon)
	  }
	

	function addListItem(pokemon) {
	    const allPokemon = document.querySelector('.pokemon-list');
	    const listItem = document.createElement('li');
	    //listItem.classList.add('list-group-item')
	    const button = document.createElement('button');
	    //to enable the for each loop return each name of the pokemon characters do not put the pokemon.name in quotation marks
	    button.innerText = pokemon.name;
	    button.classList.add('button');
	    button.setAttribute('data-toggle', 'modal');
	    button.setAttribute('data-target', '#pokemon-modal')
	    button.classList.add('btn')
	    listItem.appendChild(button);
	    allPokemon.appendChild(listItem);
	    //listens to clicks on the pokemon buttons created and returns the information of the button
	    button.addEventListener('click', function(event) { // the event in the function can be any word but its best to stick with event
	      showDetails(pokemon); //event handler
	    });
	  };
	

	  // Call the loadDetails() function from above, pass as parameter the Pokémon object.
	  function showDetails(pokemon) {
	      loadDetails(pokemon).then(function () {
	          showModal(pokemon);
	      });
	  }
	

	  // Implement the modal
	  function showModal(item) {
	    let modalBody = $(".modal-body");
	    let modalTitle = $(".modal-title");
	    let modalHeader = $(".modal-header");
	    // let $modalContainer = $("#modal-container");
	    //clear existing content of the model
	    // modalHeader.empty();
	    modalTitle.empty();
	    modalBody.empty();
	

	    //creating element for name in modal content
	    let nameElement = $("<h1>" + item.name + "</h1>");
	    // // creating img in modal content
	    let imageElementFront = $('<img class="modal-img" style="width:50%">');
	    imageElementFront.attr("src", item.imageUrlFront);
	    let imageElementBack = $('<img class="modal-img" style="width:50%">');
	    imageElementBack.attr("src", item.imageUrlBack);
	    // //creating element for height in modal content
	    let heightElement = $("<p>" + "height : " + item.height + "</p>");
	    // //creating element for weight in modal content
	    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
	    // //creating element for type in modal content
	    let typesElement = $("<p>" + "types : " + item.types + "</p>");
	    // //creating element for abilities in modal content
	    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
	

	    modalTitle.append(nameElement);
	    modalBody.append(imageElementFront);
	    modalBody.append(imageElementBack);
	    modalBody.append(heightElement);
	    modalBody.append(weightElement);
	    modalBody.append(typesElement);
	    modalBody.append(abilitiesElement);
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

