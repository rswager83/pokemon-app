    // Adding IIFE to avoid accessing the global state
let pokemonRepository= (function(){

    // List of Pokemons and their attributes
let pokemonList = [
        {
        name: 'Zacian',
        height: 9,
        category: 'warrior',
        type: 'fairy',
        abilities: 'intrepid sword',
        weaknesses: ['Steel', ' and Posion']
        },
        {
        name: 'Grimmsnarl', 
        height: 4, 
        category: 'bulk up', 
        type: ['dark', ' fairy'], 
        abilities: ['frisk', ' prankster'], 
        weaknesses: ['steel', ' fairy', ' posion']
        },
        {
        name: 'Eisue', 
        height: 4, 
        category: 'penguin', 
        type: 'ice', 
        abilities: 'ice face', 
        weaknesses: ['fire', ' steel', ' fighting', ' rock']
        },
        {
        name: 'Centiskorch', 
        height: 9, 
        category: 'radiator', 
        type: ['fire', ' bug'], 
        abilities: ['flash fire', ' white smoke'], 
        weaknesses: ['water', ' flying', ' rock']
        },
        {
        name: 'Silicobra', 
        height: 7, 
        category: 'sand snake', 
        type: 'ground', 
        abilities: ['shed skin', ' sand spit'], 
        weaknesses: ['water', ' grass', ' ice']
        },
        {
        name: 'Drednaw', 
        height: 3, 
        category: 'bite',
        type: ['water', ' rock'], 
        abilities: ['shell armor', ' strong jaw'], 
        weaknesses: ['grass', ' electric', ' fighting', ' ground']
        }
    ];

        //Defining add function to add pokemon to list
    function add(pokemon){
        pokemonList.push(pokemon);
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
        addListener(button, pokemon);
    }

         // Adding event listener to the created button to listen to a click!! // 
    function addListener (button, pokemon) {
        button.addEventListener('click', function() {
          showDetails(pokemon.name);
        });
    }

        // Function for click
    function showDetails(pokemon) {
        console.log(pokemon);
    }

        // Returning getAll and add functions
    return{
        add:add,
        getAll:getAll,
        addListItem:addListItem,
        showDetails:showDetails
    }
})();

pokemonRepository.add({ name: 'Pikachu', height: 3, category: 'mouse', type: 'electric', abilities: 'static', weaknesses: 'ground'});
console.log(pokemonRepository.getAll());

    // forEach Loop for name and height
pokemonRepository.getAll().forEach(function(pokemon) {
   pokemonRepository.addListItem(pokemon);
});