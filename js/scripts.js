    // Adding IIFE to avoid accessing the global state
let pokemonRepository= (function(){

    // List of Pokemons and their attributes
    let pokemonList = [];

    // Pokemon database
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10";

    let modalContainer = document.querySelector("#modal-container");

        //Defining add function to add pokemon to list
    function add(pokemon){
        
        if(pokemon.name && pokemon.detailsUrl) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    } 
      

        //Defining getAll function to return pokemonList
    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon) {
            // Creating variables
        let pokedex = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        listPokemon.classList.add("list-group-item");
        let button = document.createElement("button");
            // Adding features and format to buttons
        button.innerText = pokemon.name;
        button.classList.add("btn-primary", "search-button");
        button.setAttribute("data-toggle", "modal");   
        button.setAttribute("data-target", "#pokemonModal"); 
        listPokemon.append(button);
        button.addEventListener("click", function(event){
            showDetails(pokemon);
            event.target.blur();
        });
        
        // DOM hierarchy
        listPokemon.appendChild(button);
        pokedex.appendChild(listPokemon);
    }

         // Adding event listener to the created button to listen to a click!! // 
    // function addListener (button, pokemon) {
    //     button.addEventListener('click', function() {
    //       showDetails(pokemon.name);
    //     });
    // }

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
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        })
        .catch(function (e) {
            console.log.error(e);
        });
    }

       // Function for click
    function showDetails(item) {
        loadDetails(item).then(function() {
        // console.log(pokemon);
        showModal(item);
        });
    }

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        // let modalHeader = $(".modal-header");

        // clear existing content of modal
        // modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();

        // Creating element for name in modal content
        let pokemonName = $("<h1>" + pokemon.name + "</h1>");
        // creating img in modal content
        let imageElement = $('<img class="modal-img" style="width:50%>');
        imageElement.attr("src", pokemon.imageUrl);
        // Creating element for height in modal content
        let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
        // Creating element for weight in modal content
        // let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");
        // Creating element for type in modal content
        // let pokemonTypes = $("<p>" + "Types: " + item.type + "</p>");
        // Creating element for abilities in modal content
        // let pokemonAbilities = $("<p>" + "Abilities: " + item.abilities + "</p>");

        modalTitle.append(pokemonName);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        // modalBody.append(weightElement);
        // modalBody.append(pokemonWeight);
        // modalBody.append(pokemonTypes);
        // modalBody.append(pokemonAbilities);
    
            
        // let pokemonName = document.createElement("h1");
        // pokemonName.innerText = pokemon.name;

        // let pokemonImage = document.createElement("img");
        // pokemonImage.classList.add("modal-img");
        // pokemonImage.src = pokemon.imageUrl;

        // let pokemonHeight = document.createElement("p");
        // pokemonHeight.innerText = "Height: " + pokemon.height;
    }

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

