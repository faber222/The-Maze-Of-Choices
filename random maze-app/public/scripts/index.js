import { cena1 } from "../scripts/cena1.js";

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
    scene: [cena1],
  };

const game = new Phaser.Game(config);