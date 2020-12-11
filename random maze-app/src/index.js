
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
    this.load.tilemapTiledJSON("objectCollider", "../public/assets/objectCollider.json")
    this.load.image("tiles", "../public/assets/mapPeck.png")
    this.load.tilemapTiledJSON("map", "../public/assets/map.json")
    this.load.spritesheet("player", "../public/assets/player.png", {frameWidth:16, frameHeight:16})
   
  }
    
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