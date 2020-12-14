
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
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
var cursors;

function preload() {
  this.load.tilemapTiledJSON("objectCollider", "../assets/objectCollider.json")
  this.load.image("tiles", "../assets/mapPeck.png")
  this.load.tilemapTiledJSON("map", "../assets/map.json")
  this.load.spritesheet("player", "../assets/player.png", {frameWidth:16, frameHeight:16})
 
}


function create() {
  const map = this.make.tilemap({key : "map"});
  const tileset = map.addTilesetImage("assets", "tiles");

  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);

  player = this.physics.add.sprite(100,200, "player");
  
  objectCollider.setCollisionByProperty({ collider: true });
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, objectCollider);

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
  cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  //player.body.setVelocity(0); 
   
  

  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
    player.anims.play("right", true);
  } else {
    player.body.setVelocity(0);
    player.anims.play("stopped", true);
  }

  if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  } else {
    player.body.setVelocityY(0);
  }
}
