import Phaser from "phaser";
import { Bullets } from "./Bullet";

export default class ShooterScene extends Phaser.Scene {
  constructor() {
    super("ShootingScene");      
  }

 preload() {
    const baseUrl = "../images/";
    this.load.image("player_handgun", `${baseUrl}player_handgun.png`);    
    this.load.image("bullet", `${baseUrl}bullet.png`);
    this.load.image("enemy", `${baseUrl}enemy.png`);
    this.load.image("friend", `${baseUrl}friend.png`);
    this.load.spritesheet("explode", `${baseUrl}explode.png`, { frameWidth: 58, frameHeight: 65 });

    this.load.audio("explode", `${baseUrl}explode.mp3`);
    this.load.audio("shoot", `${baseUrl}shoot.mp3`);       
    this.load.audio("gameOver", `${baseUrl}gameOver.mp3`);       
  }

  create() {
    this.cameras.main.setBackgroundColor("0x27AE60");
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    this.player = this.physics.add.sprite(gameWidth/2, gameHeight/2, 'player_handgun');
    this.bullets = new Bullets(this);

    this.createEnemies(gameWidth, gameHeight);    
    this.createFriend(gameWidth, gameHeight);
    this.createSounds();   
        
    this.input.on('pointerdown', (pointer, time, lastFired) => this.fireABullet(), this);  
  }

  createEnemies(gameWidth, gameHeight) {
    const enemy1 = this.createMovingObject(gameWidth/2 + 200, gameHeight/2, 'enemy', 200, 0xffffff, false, 3000);
    const enemy2 = this.createMovingObject(gameWidth/2 + 200, gameHeight/2, 'enemy', 200, 0xffffff, false, 3000, 1500);
    this.enemies = [enemy1, enemy2];
  }

  createFriend(gameWidth, gameHeight) {
    this.friend = this.createMovingObject(gameWidth/2 + 100, gameHeight/2, 'friend', 100, 0xffffff, true, 2000);
  }

  createMovingObject(pathStartX, pathStartY, spriteKey, radius, color, yoyo, duration, startDelay = 0) {
    const path = new Phaser.Curves.Path(pathStartX, pathStartY).circleTo(radius);
    
    var graphics = this.add.graphics();
    graphics.lineStyle(1, color, 1);
    path.draw(graphics, 128);

    const movingObject = this.add.follower(path, 0, 0, spriteKey);
    this.physics.world.enable(movingObject);

    if(startDelay === 0) {
      movingObject.startFollow({
        positionOnPath: true,
        duration: duration,      
        repeat: -1,
        yoyo: yoyo,
        rotateToPath: true,
        verticalAdjust: true
      });
    } else {
      this.time.delayedCall(startDelay, () => {
        movingObject.startFollow({
          positionOnPath: true,
          duration: duration,      
          repeat: -1,
          yoyo: yoyo,
          rotateToPath: true,
          verticalAdjust: true
      }, null, this);
    });  
  }
    return movingObject;
  }

  createSounds() {
    this.explodeSound = this.sound.add("explode");
    this.shootSound = this.sound.add("shoot");
    this.gameOverSound = this.sound.add("gameOver");
  }  

  fireABullet() {
    //this.shootSound.play();
    let bullet = this.bullets.get().setActive(true).setVisible(true);

     if (bullet)
     {
         this.shootSound.play();
         bullet.fire(this.player);
         this.enemies.forEach(target => {
           this.physics.add.collider(target, bullet, (x,y) => {this.targetHitCallback(x,y)}, null, this);
         });
         this.physics.add.collider(this.friend, bullet, (x,y) => {this.targetHitCallback(x,y)}, null, this);
      }
  }

  targetHitCallback(target, bullet) {
    const x = target.x;
    const y = target.y;
    const isFriendHit = target === this.friend;

    if(!isFriendHit) { //one of enemies hit
      const index = this.enemies.indexOf(target);
      if(index !== -1) {
        this.enemies.splice(index, 1)
      } 
    } 

    bullet.destroy();
    target.destroy();

    this.showExplosion(x, y,  x => this.checkGameStatus(isFriendHit));    
  }

  showExplosion(x, y, onAnimatonCompleteCallback) {
    this.explodeSound.play();
    let explode = this.physics.add.sprite(x, y, "explode", 0);
   
    var explodeAnimConfig = {
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explode',{ start: 0,end: 4}),
      frameRate: 8,
      repeat: 0
    };
    this.anims.create(explodeAnimConfig);

    explode.on('animationcomplete', () => {
      explode.destroy();
      onAnimatonCompleteCallback();
    } , this);
    
    this.explodeSound.play();
    explode.anims.play('explosion');
  }

  update() {
    this.player.angle += 1;
  }

  checkGameStatus(isFriendHit) {    
    if(isFriendHit) { 
      this.gameOverSound.play();
      alert('game over. you have lost!');
    } else if(this.enemies.length == 0) { 
      this.gameOverSound.play();
      alert('game over. You have won!');
    }    
  }  
}
