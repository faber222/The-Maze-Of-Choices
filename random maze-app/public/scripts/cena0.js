// Importar a próxima cena
import { cena1 } from "../scripts/cena1.js";

// Criar a cena 0
const cena0 = new Phaser.Scene("Cena 0");
var abertura; 
var button;

cena0.preload = function () {
  // Imagem de fundo  
  this.load.image("start", "../assets/cena0.png");
  this.load.audio("abertura", "../sounds/wait.mp3");
};

cena0.create = function () {
    //Som de abertura
    abertura = this.sound.add("abertura");
    abertura.play();
    abertura.setLoop(true);
     

    // Botão com a imagem de fundo
   button = this.add.image(400, 400, "start", 0).setInteractive();

  // Ao clicar no botão, inicia a cena 1
    button.on( "pointerdown", function () {
        this.scene.start(cena1);
        //para a musica
        abertura.stop();
    },
        this
    );
};

cena0.update = function () {};

// Exportar a cena
export { cena0 };