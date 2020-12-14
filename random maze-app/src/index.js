
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    parent: "game-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  const game = new Phaser.Game(config);
  let player;
  var cursors;
  
  function preload() {
    this.load.tilemapTiledJSON("objectCollider", "../public/assets/objectCollider.json");
    this.load.image("tiles", "../public/assets/mapPeck.png");
    this.load.tilemapTiledJSON("map", "../public/assets/map.json");
    this.load.spritesheet("player", "../public/assets/player.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("assets", "tiles");
  
    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);
  
    player = this.physics.add.sprite(100, 100, "player");
  
    objectCollider.setCollisionByProperty({ collider: true });
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, objectCollider);
  
    const anims = this.anims;
    anims.create({
      key: "left",
      frames: anims.generateFrameNames("player", {
        start: 4,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "right",
      frames: anims.generateFrameNames("player", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "stopped",
      frames: anims.generateFrameNames("player", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
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
