    // Adding IIFE to avoid accessing the global state
let pokemonRepository= (function(){

    // List of Pokemons and their attributes
    let pokemonList = [];

    // Pokemon database
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=30";
    
    // Search button results
    let input = $("input");
    input.on("input", filterList);

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
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        listPokemon.classList.add("group-list-item");
        let button = document.createElement("button");
            // Adding features and format to buttons
        button.innerText = pokemon.name;
        button.classList.add("btn", "btn-primary", "search-button");
        button.setAttribute("data-toggle", "modal");   
        button.setAttribute("data-target", "#pokemonModal"); 
        listPokemon.append(button);
        pokemonList.append(listPokemon);
        button.addEventListener("click", function(){
            showDetails(pokemon);
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
        // Function for search engine
    function filterList() {
        let inputValue = $("input").val();
        let list = $("li");
        list.each(function() {
            let item = $(this);
            let name = item.text();
            if(name.startsWith(inputValue)) {
                item.show();
            } else {
                item.hide();
            }
        });
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
            item.types = [];
            details.types.forEach(function(detail) {
                item.types.push("" + detail.type.name);
            });
                  })
        .catch(function (e) {
            console.log.error(e);
        });
    }

       // Function for click
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() {
        // console.log(pokemon);
        showModal(item);
        });
    }

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        let pokemonName = document.createElement("h1");
        pokemonName.innerText = pokemon.name;

        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add("modal-img");
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement("p");
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonWeight = document.createElement("p");
        pokemonWeight.innerText = "Weight: " + pokemon.weight;

        let pokemonTypes = document.createElement("p");
        pokemonTypes.innerText = "Type: " + pokemon.types;

          // clear existing content of modal
        modalTitle.empty();
        modalBody.empty();

        modalTitle.append(pokemonName);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonTypes);
        modalBody.append(pokemonImage);
    }

        // Returning getAll and add functions
    return{
        add:add,
        getAll:getAll,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails,
        showDetails:showDetails,
        filterList:filterList
    };

})();

// list all pokemon from API
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

