// Importar a próxima cena
import { cena1 } from "../scripts/cena1.js";

// Criar a cena 2
const cena2 = new Phaser.Scene("Cena 2");
var loser;

cena2.preload = function () {
  // Imagem de fundo
  this.load.image("gameover", "../assets/gameover.png");
  //musica de fundo
  this.load.audio("loser", "../assets/abertura.mp3");
};

cena2.create = function () {
    //toca a musica de fundo
    loser = this.sound.add("loser");
    loser.play();
    loser.setLoop(true);

  // Botão com a imagem de fundo
  var button = this.add.image(400, 400, "gameover", 0).setInteractive();

  // Ao clicar no botão, volta para a cena 1
  button.on("pointerdown", function () {
      this.scene.start(cena1);
      //para a musica
      loser.stop();
    },
    this
  );
};

cena2.update = function () {};

// Exportar a cena
export { cena2 };