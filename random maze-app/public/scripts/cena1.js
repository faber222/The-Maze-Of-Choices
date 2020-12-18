  import { cena2 } from "../scripts/cena2.js";

  const cena1 = new Phaser.Scene ("cena1");

  var player1;
  var player2;
  var cursors;
  var up;
  var down;
  var left;
  var right;
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
    //carregamento dos mapas
    this.load.tilemapTiledJSON("objectCollider", "../assets/objectCollider.json");
    this.load.image("tiles", "../assets/mapPeck.png");
    this.load.tilemapTiledJSON("map", "../assets/map.json");
    //carregamento dos dois personagens
    this.load.spritesheet("player1", "../assets/player1.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("player2", "../assets/player2.png", {
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
    //colocando os mapas para funcionar
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("assets", "tiles");
    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);
    //código que adiciona a física de posição de spawn, colisão com borda e colisão entre parede
    player1 = this.physics.add.sprite(100, 100, "player1");
    player2 = this.physics.add.sprite(100, 110, "player2");
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player1, objectCollider, hitWall, null, true);
    this.physics.add.collider(player2, objectCollider, hitWall, null, true);
    //colisão que evita um personagem entrar dentro do outro
    this.physics.add.collider(player1, player2, hitWall, null, true);
    objectCollider.setCollisionByProperty({ collider: true });

    //tempo
    timer = 60;
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
    this.cameras.main.startFollow(player1);
  
    //animação do personagem 1 e 2
    const anims = this.anims;
    anims.create({
      key: "left1",
      frames: anims.generateFrameNames("player1", {
        start: 4,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "left2",
      frames: anims.generateFrameNames("player2", {
        start: 4,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "right1",
      frames: anims.generateFrameNames("player1", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "right2",
      frames: anims.generateFrameNames("player2", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "stopped1",
      frames: anims.generateFrameNames("player1", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: "stopped2",
      frames: anims.generateFrameNames("player2", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //seleção do controle dos personagens 1 e 2
    cursors = this.input.keyboard.createCursorKeys();
    up = this.input.keyboard.addKey("W");
    down = this.input.keyboard.addKey("S");
    left = this.input.keyboard.addKey("A");
    right = this.input.keyboard.addKey("D");    
    }
  
  //código que comanda o que fazer quando ambos andarem
  cena1.update = function () {
    if (cursors.left.isDown) {
      //barulho enquanto anda
      walk.play();
      player1.body.setVelocityX(-100);
      player1.anims.play("left1", true);
    } else if (cursors.right.isDown) {
      //barulho enquanto anda
      walk.play();
      player1.body.setVelocityX(100);
      player1.anims.play("right1", true);
    } else {
      player1.body.setVelocity(0);
      player1.anims.play("stopped1", true);
    }
    if (cursors.up.isDown) {
      player1.body.setVelocityY(-100);
      //barulho enquanto anda
      walk2.play();
    } else if (cursors.down.isDown) {
      player1.body.setVelocityY(100);
      //barulho enquanto anda
      walk2.play();
    } else {
      player1.body.setVelocityY(0);
    }

    if (left.isDown) {
      player2.body.setVelocityX(-100);
      player2.anims.play("left2", true);
      walk.play();
    } else if (right.isDown) {
      player2.body.setVelocityX(100);
      player2.anims.play("right2", true);
      walk.play();
    } else {
      player2.body.setVelocity(0);
      player2.anims.play("stopped2", true);
    }
    if (up.isDown) {
      player2.body.setVelocityY(-100);
      walk2.play();
    } else if (down.isDown) {
      player2.body.setVelocityY(100);
      walk2.play();
    } else {
      player2.body.setVelocityY(0);
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