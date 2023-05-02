import { houses, tables, deck_turn_up } from '../globals.js';

import { actions } from '../globals.js';
import { create_sides, create_body } from './details.js';

export function dom(suit, value){
  const div = document.createElement('div');
  div.classList.add('card');

  const header = create_sides('header', suit, value);

  const body = create_body(suit, value);

  const footer = create_sides('footer', suit, value);

  div.appendChild(header);
  div.appendChild(body);
  div.appendChild(footer);

  return {
    to_dom: div,

    to_html: div.innerHTML,

    handleDragStart: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;

      const card = actions.selected_card;

      if (card != null)
        card.to_dom.style.opacity = "1";

      actions.selected_card = this;
    },

    handleDragOver: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
    },

    handleDragEnd: function(e) {
      const card = actions.selected_card;

      if (card != null)
        card.to_dom.style.opacity = "1";
    },

    handleDrop: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;

      this.set_child(actions.selected_card)
    },

    mouseup: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (e.which != 1) return;

      if (this.live_in.includes('deck') && !this.is_turned_up){
        actions.historic.update(this);

        this.turn_up();

        deck_turn_up.last_child().append_child(this);

        return;
      }

      if (!this.is_turned_up) return;

      if (actions.selected_card == null){
        actions.selected_card = this;
        this.to_dom.style.opacity = "0.8";
      }else{
        this.set_child(actions.selected_card)
        actions.selected_card.to_dom.style.opacity = "1";

        actions.selected_card = null;
      }
    },

    dblclick: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (e.preventDefault) {
        e.preventDefault();
      }

      if (!this.is_turned_up) return false;

      for (let index = 0; index < houses.length; index++) {
        const house = houses[index];
        const last_child = house.last_child();

        if (last_child.valid_child(this)){
          last_child.set_child(this);
          return false;
        }
      }

      for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        const last_child = table.last_child();

        if (last_child.valid_child(this)){
          last_child.set_child(this);
          return false;
        }
      }
    },

    mouseover: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;
      if (this.live_in != 'table') return;
      if (this.child == null) return;

      this.child.to_dom.style.top = '35px';
    },

    mouseout: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;
      if (this.live_in != 'table') return;
      if (this.child == null) return;

      this.child.to_dom.style.top = '20px';
    }
  }
}
