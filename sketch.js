
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground;

var tree1, tree2, tree3, tree4, bush1, bush2;
var fire1, fire2;
var treesGroup;
var fireGroup;
var firefighter, fighterObject;

var fireSpreadInterval = 200;
var score = 0;


function preload()
{
	ground=loadImage("images/ground.png");

	tree1=loadImage("images/tree1.png");
	tree2=loadImage("images/tree2.png");
	tree3=loadImage("images/tree3.png");
	tree4=loadImage("images/tree4.png");
	bush1=loadImage("images/bush1.png");
	bush2=loadImage("images/bush2.png");
	fire1=loadImage("images/fire1.png");
	fire2=loadImage("images/fire2.png");

	firefighter=loadImage("images/firefighter.png");






}

function setup() {
	createCanvas(windowWidth, windowHeight-100);
	

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	


	Engine.run(engine);
  
	treesGroup=new Group();
	fireGroup=new Group();

	for(var i = 0; i < 80; i++) {
		generateTree();
	}

	for(var i = 0; i < 1; i++) {
		generateFire(random(600, windowWidth - 20), random(500, windowHeight - 300));
		
	}

	fighterObject = new Firefighter();
	fighterObject.player.scale=0.2;
	fighterObject.player.debug=true;
	fighterObject.player.setCollider("rectangle", 80, 0, 600, 500);
	


}


function draw() {
  background("white");
  background(ground);

	fighterObject.moveThePlayer();
	
	if(frameCount % fireSpreadInterval === 0) {
		spreadFire();
	}
	
   if(fireSpreadInterval > 1 && frameCount % 10 === 0) {
	fireSpreadInterval -= 1;
   }
	

	if(fighterObject.player.isTouching(fireGroup)) {
		for(var i = 0; i < fireGroup.length; i++) {
			var f = fireGroup.get(i);
			if(f.isTouching(fighterObject.player)) {
				f.destroy();
				score=score+1;
			}
		}
	}
	fill("black");
	textSize(50);
	text("Your score : " + score, 200, 100);
	

  drawSprites();
 
}

function spreadFire() {
	if(fireGroup.isTouching(treesGroup)) {
		for(var i = 0; i < treesGroup.length; i++) {
			var t = treesGroup.get(i);
			if(t.isTouching(fireGroup)) {
				generateFire(t.x, t.y);
			}
		}
	}
}

function generateTree() {
	var tree = createSprite(random(500, windowWidth - 50), random(450, windowHeight - 300), 20, 20);
	
	var r = Math.round(random(1, 6));
	switch(r) {
		case 1 : tree.addImage("tree1", tree1);
		 break;
		case 2 : tree.addImage("tree2", tree2);
		 break;
		case 3 : tree.addImage("tree3", tree3);
		 break;
		case 4 : tree.addImage("tree4", tree4);
		 break;
		case 5 : tree.addImage("bush1", bush1);
		 break;
		case 6 : tree.addImage("bush2", bush2);
		 break;		 
	}

	tree.scale = 0.3;
	 tree.debug = true;
	tree.setCollider("rectangle", 0, 0, 500, 200);
	treesGroup.add(tree);
	
}

function generateFire(x, y) {
	var fire = createSprite(x, y, 20, 20);

	var f = Math.round(random(1, 2));
	switch(f) {
		case 1 : fire.addImage("fire1", fire1);
		break;
		case 2 : fire.addImage("fire2", fire2);
		break;
	}

	fire.scale = 0.5;
	fire.debug = true;
	fire.setCollider("rectangle", 0, 0, 90, 100);
	fireGroup.add(fire);
}

