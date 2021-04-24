// Importar a próxima cena
import { cena0 } from "./cena0.js";
import { cena1 } from "./cena1.js";
// Criar a cena 2
const cena3 = new Phaser.Scene("Cena 3");
var winner;

cena3.preload = function () {
  // Imagem de fundo
  this.load.image("victory", "./assets/victory.png");
  //musica de fundo
  this.load.audio("winner", "./sounds/abertura.mp3");
};
 
cena3.create = function () {
    //toca a musica de fundo
    winner = this.sound.add("winner");
    winner.play();
    winner.setLoop(true);
  // Botão com a imagem de fundo
  var button = this.add.image(400, 400, "victory", 0).setInteractive();
  // Ao clicar no botão, volta para a cena 1
  button.on("pointerdown", function () {
      this.scene.start(cena0);
      //para a musica
      winner.stop();
    },
    this
  );
};

cena3.update = function () {
};

// Exportar a cena
export { cena3 };