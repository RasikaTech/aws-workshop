import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import ShooterScene from './ShootingScene';

export default function ShootingGame() {
  const gameState = {
    initialize: true,
    game: {
      height: "100%",
      width: "100%",
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 864,
        min: {
          width: 360,
          height: 640,
        },
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },      
      scene: [       
        new ShooterScene()     
      ],
    },
  };
  return <IonPhaser game={gameState.game} initialize={gameState.initialize} />;
}
