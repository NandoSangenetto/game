import type Player from "./classes/Player";

export const pressed: PressedType = {
  right: false,
  left: false,
  up: false,
  down: false,
};

export type PressedType = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
};

const setupControls = (player: Player) => {
  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        player.v.x = -player.speed;
        pressed["left"] = true;
        break;

      case "ArrowRight":
      case "d":
        player.v.x = player.speed;
        pressed["right"] = true;
        break;

      case "ArrowUp":
      case "w":
        player.v.y = -player.speed;
        pressed["up"] = true;
        break;

      case "ArrowDown":
      case "s":
        player.v.y = player.speed;
        pressed["down"] = true;
        break;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        player.v.x = pressed["right"] ? player.speed : 0;
        pressed["left"] = false;
        break;

      case "ArrowRight":
      case "d":
        player.v.x = pressed["left"] ? -player.speed : 0;
        pressed["right"] = false;
        break;

      case "ArrowUp":
      case "w":
        player.v.y = pressed["down"] ? player.speed : 0;
        pressed["up"] = false;
        break;

      case "ArrowDown":
      case "s":
        player.v.y = pressed["up"] ? -player.speed : 0;
        pressed["down"] = false;
        break;
    }
  };
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
};

export default setupControls;
