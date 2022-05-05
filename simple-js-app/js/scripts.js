

let pokemonRepository= (function(){

  let pokemonList = [
    {
    name: 'Pikachu',
    height: 3,
    type: ['thunder', 'grass']
      },
  {
    name: 'Charmander',
    height: 5,
    type:['fire', 'flying']
    },
  {
    name: 'Blastoise',
    height: 20,
    type:['water', 'strength']
    }];


function add(pokemon){
        pokemonList.push(pokemon);
    }


    function getAll(){
       return pokemonList;
   }
   return{
           add:add,
           getAll:getAll
       }


   })();

   pokemonRepository.add({
     name: 'Pikachu',
     height: 3,
     type: ['thunder', 'grass'], });
   console.log(pokemonRepository.getAll());

const pokemon = pokemonRepository.getAll()

pokemons.forEach((element) => {
  if (element.height > 5)
});

   document.write(repository[i].name + ' (height: ' + repository[i].height + ') ' + ' - ' + "Wow, that's big!");
   document.write("<br>");
   document.write("<br>")
   }else {
     document.write(repository[i].name + ' (height: ' + repository[i].height + ') ');
       document.write("<br>");
       document.write("<br>")

  console.log(pokemons);
