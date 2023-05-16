let AllDinos=[];
const dino = new Dino();  
const human = new Human();

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species= species;
    this.weight= weight;
    this.height= height;
    this.diet= diet;
    this.where= where;
    this.when= when;
    this.fact= fact;
}

// Create Dino Objects
function DinoInfo() {
fetch('./dino.json')
.then(resp => resp.json())
.then(jsondata => {
  AllDinos = jsondata.Dinos;
   let arrayOfDinos= AllDinos.map(
       d => {
   let temp=  JSON.parse(JSON.stringify(d));
   return temp;
  });
  TilesGenerate(arrayOfDinos);
})
};




// Create Human Object
function Human(species, height, weight, diet) {
    this.species = species;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}
//to get elements
function element(e){
    return document.getElementById(e);
}

// Use IIFE to get human data from form

let DataOfHuman = (function () {
        let feet=  parseInt(element('feet').value) * 12;
        let inches= parseInt(element('inches').value);
    return {
        human: () => { 
    human.species = element('name').value;
    human.height = feet + inches;
    human.weight = element('weight').value;
    human.diet = element('diet').value;
    }
  }
})();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compare (dino,human){
    return dino - human;
}
function eq (dino,human){
    return dino === human;
}
Dino.prototype.weightCompare = function(dino,human) {
    let fact = "";
    if(compare (dino.weight,human.weight) > 0)
     fact =`the ${dino.species} is fatter than you !`;
       
   else 
        fact = `the ${dino.species} is thinner than you !`;

        return fact;
        };


// Create Dino Compare Method 2
Dino.prototype.heightCompare = function(dino,human) {
    let fact = "";
    if(compare(dino.height,human.height) > 0)
          fact = `the ${dino.species} is taller than you !`;
    
    else
         fact = `the ${dino.species} is shorter than you !`;

return fact;
};



// Create Dino Compare Method 3
Dino.prototype.dietCompare = function(dino,human) {
        let fact = "";
    if (eq(human.diet , dino.diet)) {
        fact = `you and ${dino.species} have same diet`;
    } else {
        fact = `you are not in the same diet! ${dino.species} is on ${dino.diet} but your diet is ${human.diet}`;
    }
    return fact;
};

// Generate Tiles for each Dino in Array

function TilesGenerate (dinosArray) {
    
    
let newDino = [];
    
dinosArray.forEach(dino => {
newDino.push({
  species: dino.species,
  height: dino.height,
  weight: dino.weight,
  diet: dino.diet,
//  fact:(dino.weight ===0.5) ? "All birds are dinosaurs.": dinosArray[Math.floor( dinosArray.length * Math.random())].fact
    fact: dinosArray[Math.floor( dinosArray.length * Math.random())].fact
} );
});

newDino.splice(4, 0, human);

    for (let i = 0; i < newDino.length; i++) {
        addTile(newDino[i]);
    }
    
    //newDino.forEach(addTile);
};

function elementCreater(e){
    return document.createElement(e);
}
// Add tiles to DOM
function addTile (dino) {
    const tile1 = elementCreater("div");
    tile1.classList.add('grid-item');
    
     const tile4 = elementCreater("p");
   tile4.textContent = dino.fact;
   
    const tile2 = elementCreater("img");
        if(!(dino instanceof Human))
       tile2.src = `./images/${dino.species.toLowerCase()}.png`;
    else
         tile2.src = "./images/human.png";
    
  
    const tile3 = elementCreater("h3");
    tile3.textContent = dino.species;
  

    tile1.append(tile3, tile2, tile4);
    element('grid').append(tile1);
  };
  
function eventStart(){
    DinoInfo();
DataOfHuman.human();
    
    // Remove form from screen
element("dino-compare").innerHTML="";
}

// On button click, prepare and display infographic

element("btn").addEventListener("click",eventStart);