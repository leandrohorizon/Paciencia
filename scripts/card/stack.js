import { actions } from '../globals.js';

export function stack(){
  return {
    set_child: function(card){
      if (!this.valid_child(card)) return;

      actions.historic.update(card);

      this.turn_up_parent(card);
      this.append_child(card);
    },

    valid_child: function(card){
      if (this.live_in.includes('deck')) return false;
      if (this.child != null) return false;
      if (!card.is_turned_up) return false;

      if (card.live_in.includes('deck')){
        if (card.child != null) return false;
      }

      if(this.live_in == 'house'){
        if (card.child != null) return false;

        return card.same_suit(this) && this.is_bigger_than(card)
      }

      return card.different_color(this) && this.is_lower_than(card)
    },

    append_child: function(card){
      if (card.parent != null) card.parent.child = null;

      card.parent = this;
      card.live_in = this.live_in;
      card.slot = this.slot;

      if (this.live_in == 'table'){
        card.to_dom.setAttribute("style", "top: 20px;");
      }else{
        card.to_dom.setAttribute("style", "top: 0px;");
      }

      this.child = card;
      this.to_dom.appendChild(card.to_dom);
    },

    same_suit: function(card){
      return this.suit == card.suit;
    },

    different_color: function(card){
      return this.color() != card.color();
    },

    color: function(){
      return this.suit == 'diamonds' || this.suit == 'hearts' ? 'red' : 'black';
    },

    is_lower_than: function(card){
      return card.value == (this.value -1);
    },

    is_bigger_than: function(card){
      return card.value == (this.value +1);
    },

    turn_up: function(){
      this.is_turned_up = true;
      this.to_dom.classList.remove("cartaVirada");
      this.to_dom.innerHTML = this.to_html;

      this.to_dom.setAttribute("draggable", "true");
      this.to_dom.classList.add(this.suit);
    },

    turn_down: function(){
      this.is_turned_up = false;
      this.to_dom.classList.add("cartaVirada");
      this.to_dom.innerHTML = "";
      this.to_dom.setAttribute("draggable", "false");
      this.to_dom.classList.remove(this.suit);
    },

    turn_up_parent: function(card){
      if (card.live_in.includes('deck')) return;
      if (card.parent == null) return;

      const parent = card.parent;
      parent.child = null;

      if (parent.turn_up == null) return;
      parent.turn_up();
    }
  }
}
