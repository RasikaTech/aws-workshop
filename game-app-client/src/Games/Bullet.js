import Phaser from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y) {
        super(scene, x, y, 'bullet');

        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    fire (shooter) {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.scene.physics.velocityFromRotation(this.rotation, 600, this.body.velocity);
        this.born = 0; // Time since new bullet spawned
    }

    makeInactive () {
        this.setActive(false);
        this.setVisible(false);
        this.setVelocity(0);
    }

    preUpdate (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (shooter, target)
    {
        let bullet = this.get(false);

        if (bullet)
        {
            bullet.fire(shooter, target);
        }
    }
}