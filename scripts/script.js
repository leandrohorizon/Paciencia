function create_card(suit, value){
  return {
    suit:      suit,
    value:     value,
    live_in:   'deck',
    is_turned_up: true,
    child:     null,
    parent:    null,

    ...stack(),
    ...translate(),
    ...dom(suit, value)
  }
}

function stack(){
  return {
    set_child: function(card){
      console.log(this, card);
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

      actions.source = this;
    },

    handleDrop: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;

      this.set_child(actions.source)
    },

    mouseup: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      console.log(this);

      if (this.live_in == 'deck' && !this.is_turned_up){
        this.turn_up();

        divComprado.appendChild(e.target);
        actions.bought_cards.push(this)
      }
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
  suit = {
    'clubs':    '♣',
    'diamonds': '♦',
    'hearts':   '♥',
    'spades':   '♠'
  } [suit];

  const div = document.createElement('div');
  div.classList.add('body');

  const suit_symbols = new Array(3).fill(null);
  console.log(suit_symbols.length);

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

function translate(){
  return {
    translate_suit: translate_suit(this.suit),
    translate_value: translate_value(this.value)
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

function create_deck(){
  return {
    cards: function(){
      let array = new Array(52).fill(null)

      return array.map(function(_, index){
        let suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(index/13)];
        let value = (index % 13) + 1;

        card = create_card(suit, value);

        card_dom = card.to_dom

        card_dom.addEventListener("dragstart", card.handleDragStart.bind(card), false);
        card_dom.addEventListener("drop", card.handleDrop.bind(card), false);
        card_dom.addEventListener("mouseup", card.mouseup.bind(card), false);

        return card;
      })
    },

    to_dom: function(){
      let deck_dom = document.getElementById("baralho");

      deck_dom.addEventListener("mouseup", voltarCartas);

      function voltarCartas(e){
        if (e.stopPropagation) {
          e.stopPropagation();
        }

        if (actions.bought_cards.length == 0) return;

        let cards = actions.bought_cards;

        cards.forEach(card => {
          if (card.live_in != "deck") return;

          card.turn_down();
          deck_dom.appendChild(card.to_dom);
        });

        actions.bought_cards = [];
      }

      return deck_dom;
    }
  }
}

function create_tables(){
  let tables = document.querySelectorAll(".casa");
  let prevent_default = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  function moverParaCasa(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    let card = actions.source;

    if (card.value != 13) return;

    card.turn_up_parent(card);
    card.parent = null

    e.target.appendChild(card.to_dom);
    card.live_in = "table";
    card.to_dom.setAttribute("style", "top: 0px;");
  }

  return [...tables].map(table => {
    table.addEventListener("dragover", prevent_default, false);
    table.addEventListener("drop", moverParaCasa, false);
    table.addEventListener("dragend", prevent_default, false);

    return table;
  })
}

function create_houses(){
  let houses = document.querySelectorAll(".naipe");

  let prevent_default = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  function moverParaNaipe(e){
    if (e.preventDefault) {
      e.preventDefault();
    }

    let card = actions.source;

    if (card.value != 1) return;

    card.turn_up_parent(card);
    card.parent = null;

    e.target.appendChild(card.to_dom);
    card.live_in = "house";
    card.to_dom.setAttribute("style", "top: 0px;");
  }

  return [...houses].map(house => {
    house.addEventListener("dragover", prevent_default, false);
    house.addEventListener("drop", moverParaNaipe, false);
    house.addEventListener("dragend", prevent_default, false);

    return house;
  })
}

function game(){
  let deck = create_deck();
  let cards = deck.cards();
  cards.sort(() => Math.random() - 0.5);

  return {
    start: function(){
      this.distribute_cards();
    },

    distribute_cards: function(){
      this.distribute_in_table();
      this.distribute_in_deck();
    },

    distribute_in_table: function(){
      let qtd = 1;

      tables.forEach(function(casa){
        let parent_card = null;
        let parent_dom = casa;

        for (index = 0; index < qtd; index++){
          card = cards.pop();
          card_dom = card.to_dom;

          parent_dom.appendChild(card_dom);

          card.live_in = "table";
          card.parent = parent_card;

          if (parent_dom != casa)
            card_dom.setAttribute("style", "top: 20px;");

          parent_dom = card_dom;
          parent_card = card;

          if (index < qtd - 1) {
            card.turn_down();
          } else {
            card.turn_up();
          }
        }

        qtd++;
      });
    },

    distribute_in_deck: function(){
      cards.forEach(function(card){
        card_dom = card.to_dom;

        card.turn_down();
        divBaralho.appendChild(card_dom);
        card.live_in = "deck";
      });
    },
  }
}

const actions = {
  source: null,
  bought_cards: []
}

const tables = create_tables();
const houses = create_houses();
const divBaralho = create_deck().to_dom();
const divComprado = document.getElementById("comprado");

game().start();
