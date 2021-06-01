var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj, timeObj;
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  loseFood=createButton("Feed Dog");
  loseFood.position(600,95);
  loseFood.mousePressed(loseFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fill("white");
  text("Last Fed at 12 AM", 400, 95)

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addAnimation(happyDog);
  dog.changeAnimation(happyDog)
  loseFoods();

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function loseFoods(){
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}
