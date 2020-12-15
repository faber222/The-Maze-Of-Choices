  //import { cena2 } from "./";

  var cena1 = new Phaser.Scene ("cena1");
  let player;
  var cursors;
  
  cena1.preload = function () {
    this.load.tilemapTiledJSON("objectCollider", "../assets/objectCollider.json");
    this.load.image("tiles", "../assets/mapPeck.png");
    this.load.tilemapTiledJSON("map", "../assets/map.json");
    this.load.spritesheet("player", "../assets/player.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  
  cena1.create = function () {
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
  
  cena1.update = function () {
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

export { cena1 };