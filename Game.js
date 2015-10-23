var game = new Phaser.Game(800, 600, Phaser.AUTO, 'FlappyCena', { preload: preload, create: create , update: update});

var Bird;
var Birds;
var jumpButton;
var jumpSpeed = -50;
var playing = true;
var hasClicked = false;
var flapSound;
var BirdDieSound;
var upperPipe;
var lowerPipe;
var pipes;

function preload(){
    game.load.image("Bird", "CenaFace.png");
    game.load.audio("Flap", "flappycena_flap.ogg");
    game.load.audio("Die", "flappycena_dead.ogg");
    game.load.image("UPipe", "upperPipe.png");
    game.load.image("DPipe", "lowerPipe.png");
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.mouse.capture = true;
    
    pipes = game.add.group();

    pipes.enableBody = true;
    
    Bird = game.add.sprite(100,100,"Bird");
    game.physics.arcade.enable(Bird);
    Bird.scale.setTo(0.06, 0.06);
    Bird.body.collideWorldBounds = true;
    Bird.body.gravity.y = 400;
        
    flapSound = game.add.audio("Flap");
    BirdDieSound = game.add.audio("Die");
    
    game.time.events.loop(1500, createPipes, this);

}

function createPipes(){
    upperPipe = pipes.create(750, Math.floor(Math.random() * 131) + 1, "UPipe");
    upperPipe.scale.setTo(4, 4);
    game.physics.arcade.enable(upperPipe);
    upperPipe.body.velocity.x = -200;
    upperPipe.body.immovable = true;

    
    lowerPipe = pipes.create(750, upperPipe.y + 88 + 88 +  Math.floor(Math.random() * 120) + 115, "DPipe");
    lowerPipe.scale.setTo(4, 4);
    game.physics.arcade.enable(lowerPipe);
    lowerPipe.body.velocity.x = -200;
    lowerPipe.body.immovable = true;


}

function killCena(){
    BirdDieSound.play();
}

function update(){    
    game.physics.arcade.collide(Bird, pipes);
    game.physics.arcade.overlap(Bird, pipes, killCena, null, this)

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