import { actions, deck_turn_up } from '../globals.js';

export function dom(dom){
  return {
    to_dom: dom,

    prevent_default: function(e){
      if (e.preventDefault) {
        e.preventDefault();
      }
    },

    handleDrop: function(e){
      if (e.preventDefault) {
        e.preventDefault();
      }

      let card = actions.selected_card;

      this.set_child(card);

      actions.selected_card = null;
    },

    mouseup: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (this.type != 'deck_turn_down') return;
      if (this.child != null) return;

      let card = deck_turn_up.last_child();
      actions.historic.update(card, false);

      while(card != null){
        if(card.turn_down == null) break;

        card.turn_down();
        const new_card = card.parent;

        this.append_child(card);

        card = new_card;
        actions.historic.update(card, true);
      }
    }
  }
}
