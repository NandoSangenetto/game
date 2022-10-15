import { HEIGHT, WIDTH } from "../config";
import Circle from "./Circle";

class Monster extends Circle {
  update() {
    this.circle.x += this.v.x;
    this.circle.y += this.v.y;

    if (this.circle.x >= WIDTH - this.radius || this.circle.x <= this.radius) {
      this.v.x *= -1;
    }

    if (this.circle.y >= HEIGHT - this.radius || this.circle.y <= this.radius) {
      this.v.y *= -1;
    }
  }
}

export default Monster;
