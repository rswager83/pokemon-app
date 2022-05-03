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
        return fetch(apiUrl).then(function (response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
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

pokemonRepository.loadList().then(function() {
    // forEach Loop for name and height
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

 