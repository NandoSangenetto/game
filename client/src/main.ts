import "./style.css";

import { Application, Text } from "pixi.js";
import { HEIGHT, WIDTH } from "./config";
import World from "./classes/World";

const app = new Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0x456268,
});
const world = new World(app);
world.init();

app.ticker.add(() => world.update());

let paused = false;

const pausedGameText = new Text("Jogo pausado", {
  fontSize: 18,
  fill: 0xcfc547,
  dropShadow: true,
  dropShadowAlpha: 0.8,
  dropShadowColor: 0x504214,
  dropShadowDistance: 3,
  dropShadowBlur: 4,
});
pausedGameText.y = HEIGHT / 2 - pausedGameText.height / 2;
pausedGameText.x = WIDTH / 2 - pausedGameText.width / 2;
pausedGameText.y = 15;
pausedGameText.visible = false;
app.stage.addChild(pausedGameText);

window.addEventListener("keydown", (event) => {
  if (event.key === "p") {
    if (paused) {
      paused = false;
      pausedGameText.visible = false;
      app.start();
    } else {
      pausedGameText.visible = true;
      paused = true;
      app.ticker.addOnce(() => app.stop());
    }
  }
});

document.body.appendChild(app.view);
