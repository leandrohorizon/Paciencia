import { create_deck } from '../card/deck.js';
import { tables, deck_turn_down } from "../globals.js";
import { actions } from "../globals.js";

export function game(){
  let cards = create_deck();
  cards.sort(() => Math.random() - 0.5);

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key == 'z') {
      actions.historic.travel_to_past();
    }

    if (event.ctrlKey && event.key == 'y') {
      actions.historic.travel_to_future();
    }
  });

  return {
    start: function(){
      this.distribute_cards();
    },

    distribute_cards: function(){
      this.distribute_in_table();
      this.distribute_in_deck();
    },

    distribute_in_table: function() {
      let num_cards = 1;

      tables.forEach(table => {
        let parent = table;
        for (let i = 0; i < num_cards; i++) {
          const card = cards.pop();

          parent.append_child(card);
          parent = card;

          i == num_cards - 1 ? card.turn_up() : card.turn_down();
        }

        num_cards++;
      });
    },

    distribute_in_deck: function(){
      cards.forEach(function(card){
        card.turn_down();

        deck_turn_down.append_child(card);
      });
    },
  }
}
