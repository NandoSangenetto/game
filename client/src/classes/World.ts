import { Application, Text } from "pixi.js";
import Monster from "./Monster";
import { HEIGHT, NUMBER_MONSTERS, WIDTH } from "../config";
import Player from "./Player";
import setupControls from "../controls";
import Coin from "./Coin";

class World {
  private app: Application;
  private monsters: Monster[] = [];
  private player!: Player;
  private coin!: Coin;
  private score: number = 0;
  private scoreText!: Text;
  private monsterText!: Text;
  private loserMessage!: Text;
  private loserMessageTimeoutId!: number | null;

  constructor(app: Application) {
    this.app = app;
  }

  update() {
    this.player.update();
    this.coin.update();
    this.monsters.forEach((c) => {
      c.update();
    });

    this.monsters.forEach((m) => {
      if (this.player.collide(m)) {
        this.reset();
      }
    });

    if (this.player.collide(this.coin)) {
      this.getCoin();
    }
  }

  getCoin() {
    this.coin.random();
    this.addMonster();
    this.score = this.score + 1;
    this.updateScoreText();
  }

  updateScoreText() {
    this.scoreText.text = `Score: ${this.score}`;
  }

  updateMonsterText() {
    this.monsterText.text = `Monsters: ${this.monsters.length}`;
  }

  showLoserMessage() {
    const MESSAGE_TIME = 2500;
    const score = this.score;
    this.loserMessage.text = `Parabéns! Você é um perdedor!\nSeu score: ${score}. Tente novamente, bonzão.`;
    this.loserMessage.visible = true;
    if (this.loserMessageTimeoutId) {
      clearTimeout(this.loserMessageTimeoutId);
    }
    this.loserMessageTimeoutId = setTimeout(() => {
      this.loserMessage.visible = false;
      this.loserMessageTimeoutId = null;
    }, MESSAGE_TIME);
  }

  reset() {
    this.showLoserMessage();

    this.monsters.forEach((monster) => {
      monster.remove();
    });
    this.player.reset();
    this.monsters = [];
    this.addMonsters();
    this.coin.random();
    this.score = 0;
    this.updateScoreText();
  }

  showScoreMessage() {
    const message = "Score: 0";
    this.scoreText = new Text(message, {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x00ffff,
    });
    this.scoreText.y = 15;
    this.scoreText.x = WIDTH - this.scoreText.width - 15;
    this.app.stage.addChild(this.scoreText);
  }

  showMonstersMessage() {
    const message = `Monsters: 0`;
    this.monsterText = new Text(message, {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x00ffff,
    });
    this.monsterText.y = 15;
    this.monsterText.x = 15;
    this.app.stage.addChild(this.monsterText);
  }

  setupLoserMessage() {
    const message = `Parabéns! Você é um perdedor!\nSeu score: 0. Tente novamente, bonzão.`;
    this.loserMessage = new Text(message, {
      align: "center",
      fontSize: 16,
      fill: 0xcfc547,
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowColor: 0x504214,
      dropShadowDistance: 3,
      dropShadowBlur: 4,
    });
    this.loserMessage.y = HEIGHT - this.loserMessage.height - 15;
    this.loserMessage.x = WIDTH / 2 - this.loserMessage.width / 2;
    this.loserMessage.visible = false;

    this.app.stage.addChild(this.loserMessage);
  }

  init() {
    this.showScoreMessage();
    this.showMonstersMessage();
    this.setupLoserMessage();

    this.player = new Player(0xfcf8ec, 10, { x: 0, y: 0 }, this.app);
    this.coin = new Coin(0xfcf8ec, 10, { x: 0, y: 0 }, this.app);
    this.coin.random();
    setupControls(this.player);
    this.addMonsters();
  }

  addMonsters() {
    for (let i = 0; i < NUMBER_MONSTERS; i++) {
      this.addMonster();
    }
  }

  addMonster() {
    this.monsters.push(
      new Monster(
        0x79a3b1,
        Math.random() * 10 + 10,
        {
          x: 2 + Math.random(),
          y: 2 + Math.random(),
        },
        this.app
      )
    );
    this.updateMonsterText();
  }
}

export default World;
