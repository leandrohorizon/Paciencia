const tables = create_slots("table", document.querySelectorAll(".casa"));
const houses = create_slots("house", document.querySelectorAll(".naipe"));
const deck_turn_down = create_deck_turn_down();
const deck_turn_up = create_deck_turn_up();

const actions = {
  selected_card: null
}

game().start();

function game(){
  let cards = create_deck();
  cards.sort(() => Math.random() - 0.5);

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
        let parent_card = null;
        let parent_dom = table.to_dom;
        for (let i = 0; i < num_cards; i++) {
          const card = cards.pop();
          const card_dom = card.to_dom;

          parent_dom.appendChild(card_dom);
          card.live_in = "table";
          card.parent = parent_card;
          card.slot = table;
          table.children.push(card);

          card_dom.style.top = parent_dom !== table.to_dom ? "20px" : "0";

          parent_dom = card_dom;
          parent_card = card;

          i === num_cards - 1 ? card.turn_up() : card.turn_down();
        }
        num_cards++;
      });
    },

    distribute_in_deck: function(){
      cards.forEach(function(card){
        card_dom = card.to_dom;

        card.turn_down();

        deck_turn_down.to_dom.appendChild(card_dom);
        deck_turn_down.children.push(card);

        card.slot = deck_turn_down;
        card.live_in = "deck";
      });
    },
  }
}

function create_deck(){
  let array = new Array(52).fill(null)

  return array.map(function(_, index){
    let suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(index/13)];
    let value = (index % 13) + 1;

    card = create_card(suit, value);

    card_dom = card.to_dom

    card_dom.addEventListener("dragstart", card.handleDragStart.bind(card), false);
    card_dom.addEventListener("dragover", card.handleDragOver, false);
    card_dom.addEventListener("drop", card.handleDrop.bind(card), false);
    card_dom.addEventListener("dragend", card.handleDragEnd, false);

    card_dom.addEventListener("mouseup", card.mouseup.bind(card), false);

    card_dom.addEventListener("mouseover", card.mouseover.bind(card), false);
    card_dom.addEventListener("mouseout", card.mouseout.bind(card), false);

    return card;
  });
}

function create_card(suit, value){
  return {
    suit:      suit,
    value:     value,
    live_in:   'deck',
    is_turned_up: true,
    child:     null,
    parent:    null,
    slot:      null,

    translate_suit: translate_suit(this.suit),
    translate_value: translate_value(this.value),

    ...stack(),
    ...dom(suit, value)
  }
}

function translate_suit(suit){
  return {
    'clubs':    '♣',
    'diamonds': '♦',
    'hearts':   '♥',
    'spades':   '♠'
  } [suit];
}

function translate_value(value){
  return {
    1:  'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  }[value] || value;
}

function stack(){
  return {
    set_child: function(card){
      if (!this.is_stackable(card)) return;

      if (this.live_in == 'house'){
        card.to_dom.setAttribute("style", "top: 0px;");
      }else if(this.live_in == 'table'){
        card.to_dom.setAttribute("style", "top: 20px;");
      }

      this.turn_up_parent(card);

      this.child = card;
      card.parent = this;
      card.live_in = this.live_in;

      card.slot.remove_child(card);
      card.slot = this.slot;

      this.to_dom.appendChild(card.to_dom);
    },

    is_stackable: function(card){
      if (this.live_in == 'deck') return false;
      if (this.child != null) return false;
      if (!card.is_turned_up) return false;

      if(this.live_in == 'house'){
        if (card.child != null) return false;

        return card.same_suit(this) && this.is_bigger_than(card)
      }

      return card.different_color(this) && this.is_lower_than(card)
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
      if (card.live_in == 'deck') return;
      if (card.parent == null) return;

      card.parent.turn_up();
      card.parent.child = null;
    }
  }
}

function dom(suit, value){
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

      if (this.live_in == 'deck' && !this.is_turned_up){
        this.turn_up();

        deck_turn_up.to_dom.appendChild(e.target);
        deck_turn_up.children.push(this);

        this.slot.remove_child(this);

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

function create_sides(side, suit, value){
  const div = document.createElement('div');
  div.classList.add(side);

  value = translate_value(value);

  const value_div = document.createElement('div');
  value_div.innerText = value;

  div.appendChild(value_div);

  suit = translate_suit(suit);

  const suit_div = document.createElement('div');
  suit_div.innerText = suit;

  div.appendChild(suit_div);

  return div;
}

function create_body(suit, value){
  suit = translate_suit(suit);

  const div = document.createElement('div');
  div.classList.add('body');

  const suit_symbols = new Array(3).fill(null);

  const configs = {
    1:  [0, 1, 0],
    2:  [0, 2, 0],
    3:  [0, 3, 0],
    4:  [2, 0, 2],
    5:  [2, 1, 2],
    6:  [3, 0, 3],
    7:  [3, 1, 3],
    8:  [4, 0, 4],
    9:  [4, 1, 4],
    10: [4, 2, 4],
  }

  const config = configs[value] || configs[1];

  suit_symbols.forEach((_, index) => {
    const suit_symbol = document.createElement('div');
    suit_symbol.classList.add('suits_symbols');

    new Array(config[index]).fill(null).forEach(() => {
      const symbol = document.createElement('div')
      symbol.classList.add('symbols');

      symbol.innerText = suit;
      suit_symbol.appendChild(symbol);
    });

    div.appendChild(suit_symbol);
  });

  return div;
}

function create_slots(type, divs){
  return [...divs].map(div => {
    div = create_slot(type, div);
    div_dom = div.to_dom;

    div_dom.addEventListener("dragover", div.prevent_default.bind(div), false);
    div_dom.addEventListener("drop", div.handleDrop.bind(div), false);
    div_dom.addEventListener("dragend", div.prevent_default.bind(div), false);
    div_dom.addEventListener("mouseup", div.handleDrop.bind(div), false);

    return div;
  });
}

function create_deck_turn_down(){
  const div = document.getElementById('baralho');
  const obj = create_slot('deck_turn_down', div);

  obj.to_dom.addEventListener("mouseup", obj.mouseup.bind(obj), false);
  return obj;
}

function create_deck_turn_up(){
  const div = document.getElementById('comprado');
  return create_slot('deck_turn_up', div);
}

function create_slot(type, dom){
  return {
    type:     type,
    children: [],

    append_child: function(card){
      if (!this.valid_child(card)) return;

      this.children.push(card);

      card.turn_up_parent(card);
      card.parent = null;
      card.live_in = this.type;
      card.to_dom.setAttribute("style", "top: 0px;");
      card.to_dom.style.opacity = "1";

      card.slot.remove_child(card);
      card.slot = this;

      this.to_dom.appendChild(card.to_dom);
    },

    valid_child: function(card){
      if (this.children.length != 0) return false;
      if (this.type == 'deck_turn_up') return false;
      if (this.type == 'deck_turn_down') return false;

      switch(this.type){
        case 'house':
          return (card.value == 1)
        case 'table':
          return (card.value == 13)
        default:
          return false;
      }
    },

    remove_child: function(card){
      if (this.children.length == 0) return;

      const index = this.children.indexOf(card);
      this.children.splice(index, this.children.length - index);
    },

    ...slot_dom(dom)
  }
}

function slot_dom(dom){
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

      this.append_child(card);

      actions.selected_card = null;
    },

    mouseup: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }


      if (this.type != 'deck_turn_down') return;

      if (this.children.length != 0) return;

      let cards = deck_turn_up.children.reverse();

      cards.forEach(card => {
        if (card.live_in != "deck") return;

        card.turn_down();

        this.children.push(card);
        this.to_dom.appendChild(card.to_dom);
      });

      deck_turn_up.children = [];
    }
  }
}
