import { actions } from '../globals.js';

export function stack(){
  return {
    set_child: function(card){
      if (!this.valid_child(card)) return;

      actions.historic.update(card);

      card.turn_up_parent(card);
      this.append_child(card);
    },

    valid_child: function(card){
      if (card == null) return false;
      if (this.child != null) return false;
      if (this.type == 'deck_turn_up') return false;
      if (this.type == 'deck_turn_down') return false;

      if (card.live_in.includes('deck')){
        if (card.child != null) return false;
      }

      switch(this.type){
        case 'house':
          return (card.value == 1)
        case 'table':
          return (card.value == 13)
        default:
          return false;
      }
    },

    append_child: function(card){
      if (card.parent != null) card.parent.child = null;

      card.parent = this;
      card.live_in = this.type;
      card.slot = this;

      card.to_dom.setAttribute("style", "top: 0px;");

      this.child = card;
      this.to_dom.appendChild(card.to_dom);
    },

    last_child: function(child = this){
      if (child.child == null) return child;

      return this.last_child(child.child);
    }
  }
}
