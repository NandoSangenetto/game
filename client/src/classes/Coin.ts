import { HEIGHT, WIDTH } from "../config";
import Circle from "./Circle";

class Coin extends Circle {
  random() {
    this.circle.x = this.radius + Math.random() * (WIDTH - 2 * this.radius);
    this.circle.y = this.radius + Math.random() * (HEIGHT - 2 * this.radius);
  }

  update() {
    const scale = 1 + Math.sin(new Date().getTime() * 0.01) * 0.2;
    this.circle.scale.set(scale, scale);
  }
}

export default Coin;
