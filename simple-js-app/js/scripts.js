let pokemonList = [{name: 'Pikachu', height: 3, type: ['thunder', 'grass']  },
{name: 'Charmander', height: 5, type:['fire', 'flying']},
{name: 'Blastoise', height: 20, type:['water', 'strength']}];


for (let i = 0; i < pokemonList.length; ) {
 document.write(pokemonList[i].name + " ");
   document.write("<br>");
   document.write("<br>");
 console.log("random")
  i++;
}

let repository = [
   {
    name:"Pikachu",
    height: 3,
    type:['thunder','grass']
  },
    {
     name:"Charmander",
     height: 5,
     type:['fire','flying']
   },
     {
      name:"Blastoise",
      height: 20,
      type:['water','strength']
    }
  ];

  for (let i = 0; i < repository.length; ) {
  if (repository[i].height > 5) {
    // document.write(repository[i].name + ' - ' + "Wow, that's big!");
  document.write(repository[i].name + ' (height: ' + repository[i].height + ') ' + ' - ' + "Wow, that's big!");
  document.write("<br>");
  document.write("<br>")
  }else {
    document.write(repository[i].name + ' (height: ' + repository[i].height + ') ');
      document.write("<br>");
      document.write("<br>")
  }

    i++;
  }
