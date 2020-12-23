// Importar a próxima cena
import { cena0 } from "./cena0.js";

// Criar a cena 2
const cena2 = new Phaser.Scene("Cena 2");
var loser;

cena2.preload = function () {
  // Imagem de fundo
  this.load.image("gameover", "./random maze-app/public/assets/gameover.png");
  //musica de fundo
  this.load.audio("loser", "./random maze-app/public/sounds/abertura.mp3");
};

cena2.create = function () {
    //toca a musica de fundo
    loser = this.sound.add("loser");
    loser.play();
    loser.setLoop(true);
  // Botão com a imagem de fundo
  var button = this.add.image(400, 375, "gameover", 0).setInteractive();
  // Ao clicar no botão, volta para a cena 1
  button.on("pointerdown", function () {
      this.scene.start(cena0);
      //para a musica
      loser.stop();
    },
    this
  );
};

cena2.update = function () {};

// Exportar a cena
export { cena2 };