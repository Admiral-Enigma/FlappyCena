var game = new Phaser.Game(800, 600, Phaser.AUTO, 'FlappyCena', { preload: preload, create: create , update: update});

var Bird;
var Birds;
var jumpButton;
var jumpSpeed = -50;
var playing = true;
var hasClicked = false;
var flapSound;
var BirdDieSound;

function preload(){
    game.load.image("Bird", "CenaFace.png");
    game.load.audio("Flap", "flappycena_flap.ogg");
    game.load.audio("Die", "flappycena_dead.ogg");
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.mouse.capture = true;
    
    Bird = game.add.sprite(100,100,"Bird");
    game.physics.arcade.enable(Bird);
    Bird.scale.setTo(0.06, 0.06);
    Bird.body.collideWorldBounds = true;
    Bird.body.gravity.y = 400;
    
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
    
    flapSound = game.add.audio("Flap");

}

function update(){

    if(game.input.activePointer.leftButton.isDown){
        if(playing && !hasClicked){
            Bird.body.velocity.y = -200;
            hasClicked = true;
            flapSound.play();
        }
    }
    
    if(game.input.activePointer.leftButton.isUp){
        hasClicked = false;
    }
}