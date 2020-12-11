<<<<<<< HEAD

const config = {
    type: Phaser.AUTO, 
    width: 800, 
    height: 800,
    parent: "game-container", 
    physics:{
      default:"arcade",
      arcade: {
        gravity: {y: 0}
      }
=======
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
>>>>>>> b91618d71e8d585ddd7cf649704556348a305323
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
<<<<<<< HEAD
  };
  
  const game = new Phaser.Game(config);
  let player;
  var cursors;
  
  function preload() {
    this.load.tilemapTiledJSON("objectCollider", "../public/assets/objectCollider.json")
    this.load.image("tiles", "../public/assets/mapPeck.png")
    this.load.tilemapTiledJSON("map", "../public/assets/map.json")
    this.load.spritesheet("player", "../public/assets/player.png", {frameWidth:16, frameHeight:16})
   
  }
  
  function create() {
    const map = this.make.tilemap({key : "map"});
    const map2 = this.make.tilemap({key: "objectCollider"});
    const tileset = map.addTilesetImage("assets", "tiles");
  
    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    const ground2 = map2.createStaticLayer("ground2", tileset, 0, 0);
    const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);
    const aboveCollider = map.createStaticLayer("aboveObject", tileset, 0, 0);
  
    player = this.physics.add.sprite(100,200, "player");
=======
};

var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;
var gameOver = false;

const game = new Phaser.Game(config);

function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create () {
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //----------------X----Y--
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
>>>>>>> b91618d71e8d585ddd7cf649704556348a305323
    
    objectCollider.setCollisionByProperty({ collides: true });
    ground.setCollisionByProperty({ collides: true });
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, map);
  
    const anims = this.anims;
    anims.create({
      key:"left",
      frame: anims.generateFrameNames("player", {
        start: 0, 
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key:"right",
      frame: anims.generateFrameNames("player", {
        start: 10, 
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key:"stopped",
      frame: anims.generateFrameNames("player", {
        start: 0, 
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }
  
  function update() {
    player.body.setVelocity(0);
     
    cursors = this.input.keyboard.createCursorKeys()
  
    if(cursors.left.isDown){
      player.body.setVelocityX(-200);
    } else if (cursors.right.isDown){
      player.body.setVelocityX(200);
    } else if (cursors.up.isDown){
      player.body.setVelocityY(-200);
    } else if (cursors.down.isDown){
      player.body.setVelocityY(200);
    }
   
  
  }