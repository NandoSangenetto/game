import type { Application } from "pixi.js";
import { HEIGHT, WIDTH } from "../config";
import Circle from "./Circle";

class Player extends Circle {
  public speed!: number;

  constructor(
    color: number,
    radius: number,
    v: { x: number; y: number },
    app: Application
  ) {
    super(color, radius, v, app);
    this.reset();
  }

  reset() {
    this.circle.x = WIDTH / 2;
    this.circle.y = HEIGHT / 2;
    this.speed = 3;
  }

  update() {
    let x = this.circle.x + this.v.x;
    let y = this.circle.y + this.v.y;

    this.circle.x = Math.min(Math.max(x, this.radius), WIDTH - this.radius);
    this.circle.y = Math.min(Math.max(y, this.radius), WIDTH - this.radius);
  }
}

export default Player;
