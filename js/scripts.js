// Added IIFE to avoid accessing the global state

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

    //returning getAll and add functions
    
    return{
        add:add,
        getAll:getAll
    }


})();

pokemonRepository.add({ name: 'Pikachu', height: 3, category: 'mouse', type: 'electric', abilities: 'static', weaknesses: 'ground'});
console.log(pokemonRepository.getAll());

// forEach Loop for name and height

pokemonRepository.getAll().forEach(function(pokemon) {
    // console.log(pokemon.name + ' is ' + pokemon.height + ' feet tall.');
    // document.write(pokemon.name + ' is a type ' + pokemon.type + " pokemon and is " + pokemon.height + ' feet tall.');
   
    if (pokemon.height < 4 ) {
        document.write('<p><b> Name:</b> ' + pokemon.name + ' (Height: ' + pokemon.height + ') is a ' + pokemon.type + " type and he's tiny!</p>It is a "
        + pokemon.category + ' and has ' + pokemon.abilities + ' abilities and has ' + pokemon.weaknesses + ' weaknesses.');
    }else{
        document.write('<p><b> Name:</b> ' + pokemon.name + ' (Height: ' + pokemon.height + ') is a ' + pokemon.type + ' type.</p>It is a '
        + pokemon.category + ' and has ' + pokemon.abilities + ' abilities and has ' + pokemon.weaknesses + ' weaknesses.');}
        document.write("<br>");
});
