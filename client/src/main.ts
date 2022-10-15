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

let paused = false;

const pausedGameText = new Text("Jogo pausado (aperte P)", {
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

const setPauseGame = (state: boolean) => {
  paused = state;
  pausedGameText.visible = state;
};

window.addEventListener("keydown", (event) => {
  if (event.key === "p") {
    if (paused) {
      setPauseGame(false);
    } else {
      setPauseGame(true);
    }
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    setPauseGame(true);
  }
});

setInterval(() => {
  if (!paused) {
    world.update();
  }
}, 1000 / 60);

document.body.appendChild(app.view);
