  import { cena2 } from "./cena2.js";
  import { cena0 } from "./cena0.js";
  const cena1 = new Phaser.Scene ("Cena 1");

  var player1;
  var player2;
  var cursors;
  var up;
  var down;
  var left;
  var right;
  var timer;
  var timerText;
  var timedEvent;
  var wall;
  var walk;
  var ambient;
  var walk2;
  var lose;
  var win;
  var button;
  var FKey;
  var life;
  var lifeText;
  
  cena1.preload = function () {
    //carregamento de todos os sons do game
    this.load.audio("wall", "./sounds/hit1.mp3");
    this.load.audio("walk", "./sounds/stone1.mp3");
    this.load.audio("ambient", "./sounds/ambient.mp3");
    this.load.audio("walk2", "./sounds/stone4.mp3");
    this.load.audio("lose", "./sounds/explode1.mp3");
    //carregamento dos mapas
    this.load.tilemapTiledJSON("objectCollider", "./assets/objectCollider.json");
    this.load.image("tiles", "./assets/mapPeck.png");
    this.load.tilemapTiledJSON("map", "./assets/map.json");
    //carregamento do ícone fullscreen
    this.load.spritesheet("fullscreen", "./assets/fullscreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //carregamento dos dois personagens
    this.load.spritesheet("player1", "./assets/player1.png", {
      frameWidth: 17.5,
      frameHeight: 18,
    });
    this.load.spritesheet("player2", "./assets/player2.png", {
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
    objectCollider.setCollisionByProperty({ collider: true });
    player1 = this.physics.add.sprite(350, 170, "player1");
    player2 = this.physics.add.sprite(150, 180, "player2");
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player1, objectCollider, hitWall, null, true);
    this.physics.add.collider(player2, objectCollider, hitWall, null, true);
    //colisão que evita um personagem entrar dentro do outro
    this.physics.add.collider(player1, player2, hitWall, null, true);

    //tempo
    timer = 60;
    //contagem regressiva
     timedEvent = this.time.addEvent({
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

    //vida do personagem
    life = 100;
    //mostra o quanto de vida tem
    lifeText = this.add.text(16, 50, life, {
      fontSize: "32px",
      fill: "#cccccc",
    });
    lifeText.setScrollFactor(0);

    //tamanho do mapa alem da camera
    this.cameras.main.setBounds(0, 0, 1920, 1080);
    this.physics.world.setBounds(0, 0, 1920, 1080);
    //Camera vai seguir o personagem
    this.cameras.main.startFollow(player1, true, 0.09, 0.09);
    this.cameras.main.setZoom(5);

    //botão fullscreen
    button = this.add
    .image(800 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive()
    .setScrollFactor(0);
    
    //função que gera o evento que ocorre quando clica no button
    button.on("pointerup",function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      },
      this
    );

    // Tecla "F" também ativa/desativa tela cheia
    FKey = this.input.keyboard.addKey("F");
    FKey.on("down", function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      },
      this
    );

    //animação do personagem 1 e 2
    const anims = this.anims;
    anims.create({
      key: "left1",
      frames: anims.generateFrameNames("player1", {
        start: 9,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "left2",
      frames: anims.generateFrameNames("player2", {
        start: 10,
        end: 14,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "right1",
      frames: anims.generateFrameNames("player1", {
        start: 3,
        end: 5,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "right2",
      frames: anims.generateFrameNames("player2", {
        start: 4,
        end: 9,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "up1",
      frames: anims.generateFrameNames("player1", {
        start: 0,
        end: 2,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "up2",
      frames: anims.generateFrameNames("player2", {
        start: 15,
        end: 18,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "stopped1",
      frames: anims.generateFrameNames("player1", {
        start: 6,
        end: 8,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "stopped2",
      frames: anims.generateFrameNames("player2", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
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
      player1.body.setVelocityX(-50);
      player1.anims.play("left1", true);
    } else if (cursors.right.isDown) {
      //barulho enquanto anda
      walk.play();
      player1.body.setVelocityX(50);
      player1.anims.play("right1", true);
    } else {
      player1.body.setVelocity(0);
      player1.anims.play("stopped1", true);
    }
    if (cursors.up.isDown) {
      player1.body.setVelocityY(-50);
      player1.anims.play("up1", true);
      //barulho enquanto anda
      walk2.play();
    } else if (cursors.down.isDown) {
      player1.body.setVelocityY(50);
      //barulho enquanto anda
      walk2.play();
    } else {
      player1.body.setVelocityY(0);
    }  
    if (left.isDown) {
      player2.body.setVelocityX(-50);
      player2.anims.play("left2", true);
      walk.play();
    } else if (right.isDown) {
      player2.body.setVelocityX(50);
      player2.anims.play("right2", true);
      walk.play();
    } else {
      player2.body.setVelocity(0);
      player2.anims.play("stopped2", true);
    }
    if (up.isDown) {
      player2.body.setVelocityY(-50);
      player2.anims.play("up2", true);
      walk2.play();
    } else if (down.isDown) {
      player2.body.setVelocityY(50);
      walk2.play();
    } else {
      player2.body.setVelocityY(0);
    }
}

//função que faz o som de batida na parede, reconhece dano
function hitWall() {
  //som de batida
  wall.play(); 
  //diminui um de vida do personagem
  life -= 1;
  lifeText.setText(life);
  if (life === 0) {
    //toca som de bomba
    lose.play();
    //se a life acabar, zera o cronometro, fazendo com que o jogo acabe
    timer = 0;
    //para a musica ambient do cena1
    ambient.stop();
    //evita que fique com vida negativa
    life += 1;
  }
}

//função que faz a contagem regressiva
function countdown() {
  // Reduz o contador em 1 segundo
  timer -= 1;
  timerText.setText(timer);
  // Se o contador chegar a zero, inicia a cena 2
  if (timer <= 0 ) {
    //faz com que o temporizador mostre apenas 0 antes de trocar de cena "coisa bem rápida"
    timer = 0;
    //toca som de bomba
    lose.play();
    //começa a cena2 
    this.scene.start(cena2);
    //para a musica ambient do cena1
    ambient.stop();
  } 
}

export { cena1 };