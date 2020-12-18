  import { cena2 } from "../scripts/cena2.js";

  const cena1 = new Phaser.Scene ("cena1");

  var player;
  var cursors;
  var timer;
  var timerText;
  var wall;
  var walk;
  var ambient;
  var walk2;
  var lose;
  var win;
  
  cena1.preload = function () {
    //carregamento de todos os sons do game
    this.load.audio("wall", "../sounds/hit1.ogg");
    this.load.audio("walk", "../sounds/stone1.ogg");
    this.load.audio("ambient", "../sounds/ambient.ogg");
    this.load.audio("walk2", "../sounds/stone4.ogg");
    this.load.audio("lose", "../sounds/explode1.ogg");

    this.load.tilemapTiledJSON("objectCollider", "../assets/objectCollider.json");
    this.load.image("tiles", "../assets/mapPeck.png");
    this.load.tilemapTiledJSON("map", "../assets/map.json");
    this.load.spritesheet("player", "../assets/player.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  
  cena1.create = function () {
    //musicas
    wall = this.sound.add("wall");
    walk = this.sound.add("walk");
    walk2 = this.sound.add("walk2");
    lose = this.sound.add("lose");
    ambient = this.sound.add("ambient");
    //musica ambient tocada em looping
    ambient.play();
    ambient.setLoop(true);

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("assets", "tiles");
    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);

    player = this.physics.add.sprite(100, 100, "player");
    objectCollider.setCollisionByProperty({ collider: true });
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, objectCollider, hitWall, null, true);
    //tempo
    timer = 10;
  
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

    //contagem regressiva
    var timedEvent = this.time.addEvent({
      delay: 1000,
      callback: countdown,
      callbackScope: this,
      loop: true,
    });

    //relógio na tela
    timerText = this.add.text(16, 16, timer, {
      fontSize: "32px",
      fill: "#FFF",
    });
    timerText.setScrollFactor(0);

    //Camera vai seguir o personagem
    this.cameras.main.startFollow(player);
  }
  
  cena1.update = function () {
    if (cursors.left.isDown) {
      //barulho enquanto anda
      walk.play();
      player.body.setVelocityX(-100);
      player.anims.play("left", true);
      
    } else if (cursors.right.isDown) {
      //barulho enquanto anda
      walk.play();
      player.body.setVelocityX(100);
      player.anims.play("right", true);
      
    } else {
      player.body.setVelocity(0);
      player.anims.play("stopped", true);

    }
  
    if (cursors.up.isDown) {
      player.body.setVelocityY(-100);
      //barulho enquanto anda
      walk2.play();
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(100);
      //barulho enquanto anda
      walk2.play();
    } else {
      player.body.setVelocityY(0);
    }
}
function hitWall(objectCollider) {
  //som de batida
  wall.play();
}

//função que faz a contagem regressiva
function countdown() {
  // Reduz o contador em 1 segundo
  timer -= 1;
  timerText.setText(timer);

  // Se o contador chegar a zero, inicia a cena 2
  if (timer === 0) {
    //toca som de bomba
    lose.play();
    //trilha.stop();
    this.scene.start(cena2);
    //para a musica ambient do cena1
    ambient.stop();
  } 
}

export { cena1 };