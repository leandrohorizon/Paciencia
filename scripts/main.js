import { actions } from "./globals.js";
import { game } from "./game/game.js";

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z') {
    actions.historic.go_back();
  }
});

game().start();
