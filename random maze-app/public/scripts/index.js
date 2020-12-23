import { cena0 } from "../scripts/cena0.js";
import { cena1 } from "../scripts/cena1.js";
import { cena2 } from "../scripts/cena2.js";


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    parent: "game-container",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "game",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 800,
    },
    scene: [cena0, cena1, cena2],
  };

const game = new Phaser.Game(config);