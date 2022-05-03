 function showLoadingMessage() {
    let loadingMessage = document.querySelector('.hidden-message');
    loadingMessage.classList.add('display');
    setTimeout(() => {
        loadingMessage.classList.remove('display');
    }, 5000);
 };

 function hideLoadingMessage() {
    let loadingMessage = document.querySelector('.hidden-message');
    loadingMessage.classList.remove('display');
 };
    
    // Adding IIFE to avoid accessing the global state
let pokemonRepository= (function(){

    // List of Pokemons and their attributes
    let pokemonList = [];

    // Pokemon database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        //Defining add function to add pokemon to list
    function add(pokemon){
        if(
            typeof pokemon === 'object' &&
            'name' in pokemon
        )   {
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
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
            // Adding features and format to buttons
        button.innerText = pokemon.name;
        button.classList.add('button-class');
            // DOM hierarchy
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);          
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

         // Adding event listener to the created button to listen to a click!! // 
    function addListener (button, pokemon) {
        button.addEventListener('click', function() {
          showDetails(pokemon.name);
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
                hideLoadingMessage();
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

       // Function for click
       function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

        // Returning getAll and add functions
    return{
        add:add,
        getAll:getAll,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
        showDetails:showDetails
    }
})();

// list all pokemon from API
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});