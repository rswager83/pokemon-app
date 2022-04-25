// List of Pokemons and their attributes
let pokemonList = [
    {
    name: 'Zacian',
    height: 9,
    category: 'Warrior',
    type: 'Fairy',
    abilities: 'Intrepid Sword',
    weaknesses: ['Steel', ' and Posion']
    },
    {
    name: 'Grimmsnarl', 
    height: 4, 
    category: 'Bulk Up', 
    type: ['Dark', ' Fairy'], 
    abilities: ['Frisk', ' Prankster'], 
    weaknesses: ['Steel', ' Fairy', ' Posion']
    },
    {
    name: 'Eisue', 
    height: 4, 
    category: 'Penguin', 
    type: 'Ice', 
    abilities: 'Ice Face', 
    weaknesses: ['Fire', ' Steel', ' Fighting', ' Rock']
    },
    {
    name: 'Centiskorch', 
    height: 9, 
    category: 'Radiator', 
    type: ['Fire', ' Bug'], 
    abilities: ['Flash Fire', ' White Smoke'], 
    weaknesses: ['Water', ' Flying', ' Rock']
    },
    {
    name: 'Silicobra', 
    height: 7, 
    category: 'Sand Snake', 
    type: 'Ground', 
    abilities: ['Shed Skin', ' Sand Spit'], 
    weaknesses: ['Water', ' Grass', ' Ice']
    },
    {
    name: 'Drednaw', 
    height: 3, 
    category: 'Bite',
    type: ['Water', ' Rock'], 
    abilities: ['Shell Armor', ' Strong Jaw'], 
    weaknesses: ['Grass', ' Electric', ' Fighting', ' Ground']
    }
];

// console.log(pokemonList);


//  for loop for list of Pokemons on page

// for (let i = 0; i < pokemonList.length; i++) {
    // if (pokemonList[i].height < 4) { //use if-else seperate items and show special value/result 
    //     document.write(" Name: " + pokemonList[i].name + " (Height: " + pokemonList[i].height + ")" + " He's tiny!");
    // }else {  
    //     document.write(" Name: " + pokemonList[i].name + " (Height : " + pokemonList[i].height + ")")};
    // document.write(`Name: ${pokemonList[i].name} (Height: ${pokemonList[i].height})`);
    // document.write(`Category: ${pokemonList[i].category}`);
    // document.write(`Type: ${pokemonList[i].type}`);
    // document.write(`Ability: ${pokemonList[i].abilities}`);
    // document.write(`Weakness: ${pokemonList[i].weaknesses}`);
    // document.write("<br>");
// };

// forEach Loop for name and height
pokemonList.forEach(function(pokemon) {
    // console.log(pokemon.name + ' is ' + pokemon.height + ' feet tall.');
    // document.write(pokemon.name + ' is a type ' + pokemon.type + " pokemon and is " + pokemon.height + ' feet tall.');
   
    if (pokemon.height < 4 ) {
        document.write('<p><b> Name:</b> ' + pokemon.name + ' (Height: ' + pokemon.height + ') is a ' + pokemon.type + " type and he's tiny!</p>They are category "
        + pokemon.category + ' and have ' + pokemon.abilities + ' abilities and have ' + pokemon.weaknesses + ' weaknesses.');
    }else{
        document.write('<p><b> Name:</b> ' + pokemon.name + ' (Height: ' + pokemon.height + ') is a ' + pokemon.type + ' type.</p>They are category '
        + pokemon.category + ' and have ' + pokemon.abilities + ' abilities and have ' + pokemon.weaknesses + ' weaknesses.');}
    // document.write("<br>");
});


