import { cena2 } from "./cena2.js";
  const cena1 = new Phaser.Scene ("Cena 1");

  var player;
  var player2;
  var timer;
  var timerText;
  var timedEvent;
  var pointer;
  var touchX;
  var touchY;
  var wall;
  var walk;
  var ambient;
  var walk2;
  var lose;
  var win;
  var button;
  var FKey;
  var jogador;
  var self;
  var physics;
  var time;
  var cameras;
  var socket;
  var ice_servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  var localConnection;
  var remoteConnection;
  var midias;
  const audio = document.querySelector("audio");
  
  cena1.preload = function () {
    //carregamento de todos os sons do game
    this.load.audio("wall", "./sounds/hit1.mp3");
    this.load.audio("walk", "./sounds/stone1.mp3");
    this.load.audio("ambient", "./sounds/ambient.mp3");
    this.load.audio("walk2", "./sounds/stone4.mp3");
    this.load.audio("lose", "./sounds/explode1.mp3");
    //carregamento dos mapas
    this.load.tilemapTiledJSON("objectCollider", "./assets/objectCollider.json");
    this.load.tilemapTiledJSON("map", "./assets/map.json");
    this.load.image("tiles", "./assets/mapPeck.png");
    //carregamento do ícone fullscreen
    this.load.spritesheet("fullscreen", "./assets/fullscreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //carregamento dos dois personagens
    this.load.spritesheet("player", "./assets/player.png", {
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
    player = this.physics.add.sprite(350, 170, "player");
    player2 = this.physics.add.sprite(350, 180, "player2");

    //tamanho do mapa alem da camera
    this.cameras.main.setBounds(0, 0, 1920, 1080);
    //this.cameras.main.setViewport(0, 0, 800, 600);
<<<<<<< HEAD
    this.fadeCamera = this.cameras.add(0, 700, 800, 800); 
=======
    this.fadeCamera = this.cameras.add(0, 720, 800, 800); 
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
    this.physics.world.setBounds(0, 0, 1920, 1080);

    //botão fullscreen
    button = this.add
    .image(425, 17, "fullscreen", 0)
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
      frames: anims.generateFrameNames("player", {
        start: 9,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "left2",
      frames: anims.generateFrameNames("player2", {
        start: 9,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "right1",
      frames: anims.generateFrameNames("player", {
        start: 3,
        end: 5,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "right2",
      frames: anims.generateFrameNames("player2", {
        start: 3,
        end: 5,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "up1",
      frames: anims.generateFrameNames("player", {
        start: 0,
        end: 2,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "up2",
      frames: anims.generateFrameNames("player2", {
        start: 0,
        end: 2,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "stopped1",
      frames: anims.generateFrameNames("player", {
        start: 6,
        end: 8,
      }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "stopped2",
      frames: anims.generateFrameNames("player2", {
        start: 6,
        end: 8,
      }),
      frameRate: 3,
      repeat: -1,
    });
<<<<<<< HEAD
    // Interação por toque de tela (até 2 toques simultâneos: 0 a 1)
    pointer = this.input.addPointer(1);
    // D-pad
    esquerda = this.add
      .image(50, 50, "esquerda", 0)
      .setInteractive()
      .setScrollFactor(0);
    direita = this.add
      .image(120, 50, "direita", 0)
      .setInteractive()
      .setScrollFactor(0);
    cima = this.add
      .image(680, 50, "cima", 0)
      .setInteractive()
      .setScrollFactor(0);
    baixo = this.add
      .image(750, 50, "baixo", 0)
      .setInteractive()
      .setScrollFactor(0);

=======
    //seleção do controle dos personagens
    cursors = this.input.keyboard.createCursorKeys();
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
    //Conectar no servidor via WedSocket
    this.socket = io();
    //Dispadar evento quando jogador entra na partida
    self = this;
    physics = this.physics;
    cameras = this.cameras;
    time = this.time;
    socket = this.socket;

    this.socket.on("jogadores", function(jogadores){
      if(jogadores.primeiro === self.socket.id){
        //Define jogador como o primeiro
        jogador = 1;
        player.setCollideWorldBounds(true);
        physics.add.collider(player, objectCollider, hitWall, null, true);
        //Camera vai seguir o personagem
        cameras.main.startFollow(player, true, 0.09, 0.09);
        cameras.main.setZoom(5);
<<<<<<< HEAD
        // D-pad: para cada direção já os eventos
        // para tocar a tela ("pointerover")
        // e ao terminar essa interação ("pointerout")
        esquerda.on("pointerover", () => {
          if (timer > 0) {
            esquerda.setFrame(1);
            player.setVelocityX(-50);
            player.anims.play("left1", true);
          }
        });
        esquerda.on("pointerout", () => {
          if (timer > 0) {
            esquerda.setFrame(0);
            player.setVelocityX(0);
            player.anims.play("stopped1", true);
          }
        });
        direita.on("pointerover", () => {
          if (timer > 0) {
            direita.setFrame(1);
            player.setVelocityX(50);
            player.anims.play("right1", true);
          }
        });
        direita.on("pointerout", () => {
          if (timer > 0) {
            direita.setFrame(0);
            player.setVelocityX(0);
            player.anims.play("stopped1", true);
          }
        });
        cima.on("pointerover", () => {
          if (timer > 0) {
            cima.setFrame(1);
            player.setVelocityY(-50);
            player.anims.play("up1", true);
          }
        });
        cima.on("pointerout", () => {
          if (timer > 0) {
            cima.setFrame(0);
            player.setVelocityY(0);
            player.anims.play("stopped1", true);
          }
        });
        baixo.on("pointerover", () => {
          if (timer > 0) {
            baixo.setFrame(1);
            player.setVelocityY(50);
            player.anims.play("stopped1", true);
          }
        });
        baixo.on("pointerout", () => {
          if (timer > 0) {
            baixo.setFrame(0);
            player.setVelocityY(0);
            player.anims.play("stopped1", true);
          }
        });
=======
        
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
        navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));

      } else if (jogadores.segundo === self.socket.id){
        //Define jogador como o segundo
        jogador = 2;
        player2.setCollideWorldBounds(true);
        physics.add.collider(player2, objectCollider, hitWall, null, true);
        //Camera vai seguir o personagem
        cameras.main.startFollow(player2, true, 0.09, 0.09);
        cameras.main.setZoom(5);
<<<<<<< HEAD
        // D-pad: para cada direção já os eventos
        // para tocar a tela ("pointerover")
        // e ao terminar essa interação ("pointerout")
        esquerda.on("pointerover", () => {
          if (timer > 0) {
            esquerda.setFrame(1);
            player2.setVelocityX(-50);
            player2.anims.play("left2", true);
          }
        });
        esquerda.on("pointerout", () => {
          if (timer > 0) {
            esquerda.setFrame(0);
            player2.setVelocityX(0);
            player2.anims.play("stopped2", true);
          }
        });
        direita.on("pointerover", () => {
          if (timer > 0) {
            direita.setFrame(1);
            player2.setVelocityX(50);
            player2.anims.play("right2", true);
          }
        });
        direita.on("pointerout", () => {
          if (timer > 0) {
            direita.setFrame(0);
            player2.setVelocityX(0);
            player2.anims.play("stopped2", true);
          }
        });
        cima.on("pointerover", () => {
          if (timer > 0) {
            cima.setFrame(1);
            player2.setVelocityY(-50);
            player2.anims.play("up2", true);
          }
        });
        cima.on("pointerout", () => {
          if (timer > 0) {
            cima.setFrame(0);
            player2.setVelocityY(0);
            player2.anims.play("stopped2", true);
          }
        });
        baixo.on("pointerover", () => {
          if (timer > 0) {
            baixo.setFrame(1);
            player2.setVelocityY(50);
            player2.anims.play("stopped2", true);
          }
        });
        baixo.on("pointerout", () => {
          if (timer > 0) {
            baixo.setFrame(0);
            player2.setVelocityY(0);
            player2.anims.play("stopped2", true);
          }
        });
=======
        
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias.getTracks().forEach((track) => 
            localConnection.addTrack(track, midias));
            localConnection.onicecandidate = ({ candidate }) => {
              candidate &&
                socket.emit("candidate", jogadores.primeiro, candidate);
            };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection.createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));

      }
      //começa a contagem apenas quando os dois estão conectados
      console.log(jogadores);
      if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
        //tempo
        timer = 0;
        //contagem regressiva
        timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
      };
    });

    this.socket.on("offer", (socketId, description) => {
      remoteConnection = new RTCPeerConnection(ice_servers);
      midias
        .getTracks()
        .forEach((track) => remoteConnection.addTrack(track, midias));
      remoteConnection.onicecandidate = ({ candidate }) => {
        candidate && socket.emit("candidate", socketId, candidate);
      };
      remoteConnection.ontrack = ({ streams: [midias] }) => {
        audio.srcObject = midias;
      };
      remoteConnection
        .setRemoteDescription(description)
        .then(() => remoteConnection.createAnswer())
        .then((answer) => remoteConnection.setLocalDescription(answer))
        .then(() => {
          socket.emit("answer", socketId, remoteConnection.localDescription);
        });
    });
  
    socket.on("answer", (description) => {
      localConnection.setRemoteDescription(description);
    });
  
    socket.on("candidate", (candidate) => {
      const conn = localConnection || remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    //desenha o outro jogador na tela
    this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
      if (jogador === 1){
        player2.setFrame(frame);
        player2.x = x;
        player2.y = y;
      } else if (jogador === 2) {
        player.setFrame(frame);
        player.x = x;
        player.y = y;
      }
    });
      //relógio na tela
      timerText = this.add.text(16, 16, timer, {
       fontSize: "32px",
       fill: "#FFF",
     });
     timerText.setScrollFactor(0);
<<<<<<< HEAD
    }
=======
}
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
  //código que comanda o que fazer quando ambos andarem
cena1.update = function () {
  if (jogador === 1) {
    let frame;
    // Controle do personagem por direcionais
    if (jogador === 1) {
      // Testa se há animação do oponente,
      // caso contrário envia o primeiro frame (0)
      try {
        frame = player.anims.currentFrame.index;
      } catch (e) {
        frame = 0;
      }
      this.socket.emit("estadoDoJogador", {
        frame: frame,
        x: player.body.x,
        y: player.body.y,
      });
      
    } else if (jogador === 2) {
      try {
        frame = player2.anims.currentFrame.index;
      } catch (e) {
        frame = 0;
      }
      this.socket.emit("estadoDoJogador", {
        frame: frame,
        x: player2.body.x,
        y: player2.body.y,
      });
    }
  }
}

//função que faz o som de batida na parede, reconhece dano
function hitWall() {
  //som de batida
  wall.play(); 
<<<<<<< HEAD
  //if (life === 0) {
    //toca som de bomba
    //lose.play();
    //se a life acabar, zera o cronometro, fazendo com que o jogo acabe
    //para a musica ambient do cena1
    //ambient.stop();  
=======
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9
}

//função que faz a contagem regressiva
function countdown() {
<<<<<<< HEAD
  // Reduz o contador em 1 segundo
  timer += 1;
  timerText.setText(timer);
  }
=======
  // soma 1 segundo
  timer += 1;
  timerText.setText(timer);
}
>>>>>>> a42b48155f9da3430c8537d3be3723b5e09ddfe9

export { cena1 };