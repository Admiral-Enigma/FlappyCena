var game = new Phaser.Game(800, 600, Phaser.AUTO, 'FlappyCena', { preload: preload, create: create , update: update});
var Bird;
var Birds;

function preload(){
    game.load.image("Bird", "CenaFace.png");
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    Bird = game.add.sprite(100,100,"Bird");
    game.physics.arcade.enable(Bird);
    Bird.scale.setTo(0.06, 0.06);
    Bird.body.collideWorldBounds = true;
    Bird.body.gravity.y = 20;
}

function update(){

}