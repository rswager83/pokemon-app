    // Adding IIFE to avoid accessing the global state
let pokemonRepository= (function(){

    // List of Pokemons and their attributes
    let pokemonList = [];

    // Pokemon database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';

    let modalContainer = document.querySelector('#modal-container');

        //Defining add function to add pokemon to list
    function add(pokemon){
        if(typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        }
        if(pokemon.name && pokemon.detailsUrl) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    } 
      

        //Defining getAll function to return pokemonList
    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon) {
            // Creating variables
        let pokedex = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');

        let button = document.createElement('button');
            // Adding features and format to buttons
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.addEventListener('click', function(event){
            showDetails(pokemon);
            event.target.blur();
        });
        
        // DOM hierarchy
        listPokemon.appendChild(button);
        pokedex.appendChild(listPokemon);
    }

         // Adding event listener to the created button to listen to a click!! // 
    function addListener (button, pokemon) {
        button.addEventListener('click', function() {
          showDetails(pokemon.name);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response){
            return response.json();
        })
        .then(function(json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);               
            });
        })
        .catch(function (e) {
            console.log.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        })
        .then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        })
        .catch(function (e) {
            console.log.error(eS);
        });
    }

       // Function for click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
        // console.log(pokemon);
        showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        // //clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // // Add the new modal content (close button)
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innterText = 'Close';
        // // Required to close from the close button on modal
        closeButtonElement.addEventListener('click', hideModal);
            
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        // let contentElement = document.createElement('div'); // Use to add something to modal
        // contentElement.classList.add('modal-text');

        modal.appendChild(pokemonName);
        modal.appendChild(closeButtonElement);
        // modal.appendChild(contentElement); // Use to add something to modal
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }
        // document.querySelector('#show-modal').addEventListener('click', () => {
        //     showModal('Modal title', 'This is the modal content');
        // });
    
        
        // To close the modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

         // Press esc to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

        // Close when click on container
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


        // Returning getAll and add functions
    return{
        add:add,
        getAll:getAll,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
        showDetails:showDetails
    };

})();

// list all pokemon from API
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});





// 