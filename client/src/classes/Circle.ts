import { Graphics } from "pixi.js";
import type { Application, Graphics as IGraphics } from "pixi.js";

class Circle {
  protected radius: number;
  public v: { x: number; y: number };
  protected circle: IGraphics;
  protected app: Application;

  constructor(
    color: number | undefined,
    radius: number,
    v: { x: number; y: number },
    app: Application
  ) {
    this.radius = radius;
    this.v = v;
    this.app = app;

    const circle = new Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.endFill();
    circle.x = radius;
    circle.y = radius;
    this.app.stage.addChild(circle);

    this.circle = circle;
  }

  remove() {
    this.app.stage.removeChild(this.circle);
  }

  collide(other: Circle) {
    const dx = other.circle.x - this.circle.x;
    const dy = other.circle.y - this.circle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist < this.radius + other.radius;
  }
}

export default Circle;
