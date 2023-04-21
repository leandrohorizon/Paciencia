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
    ...dom(suit)
  }
}

function stack(){
  return {
    set_child: function(card){
      if (!this.is_stackable(card)) return;

      if (this.live_in == 'house'){
        card.to_dom.setAttribute("style", "top: 0px;");
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
      this.to_dom.innerHTML = this.translate_value() + this.translate_suits();
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
      if (card.live_in == 'table' && card.parent != null){
        card.parent.turn_up();
        card.parent.child = null;
      }
    }
  }
}

function dom(suit){
  const div = document.createElement('div');
  div.classList.add('card');

  return {
    to_dom: div,

    handleDragStart: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;

      actions.source = this;
    },

    handleDragOver: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      if (!this.is_turned_up) return;
    },

    handleDrop: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (!this.is_turned_up) return;

      this.set_child(actions.source)
    },
    // handleDragEnd

    mouseup: function(e){
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (this.live_in == 'deck' && !this.is_turned_up){
        this.turn_up();

        divComprado.appendChild(e.target);
        actions.bought_cards.push(this)
      }
    }

  }
}

function translate(){
  return {
    translate_suits: function(){
      return {
        'clubs':    '♣',
        'diamonds': '♦',
        'hearts':   '♥',
        'spades':   '♠'
      } [this.suit];
    },

    translate_value: function(){
      return {
        1:  'A',
        11: 'J',
        12: 'Q',
        13: 'K'
      }[this.value] || this.value;
    }
  }
}

let actions = {
  source: null,
  bought_cards: []
}

function create_deck(){
  let deck = [];
  for (let i = 0; i < 52; i++){
    let suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(i/13)];
    let value = (i % 13) + 1;

    card = create_card(suit, value);

    card_dom = card.to_dom

    card_dom.addEventListener("dragstart", card.handleDragStart.bind(card), false);
    card_dom.addEventListener("dragover", card.handleDragOver.bind(card), false);
    card_dom.addEventListener("drop", card.handleDrop.bind(card), false);
    card_dom.addEventListener("mouseup", card.mouseup.bind(card), false);

    deck.push(card);
  }
  return deck;
}

let deck = create_deck();

deck.sort(() => Math.random() - 0.5);

const divBaralho = document.getElementById("baralho");
const divComprado = document.getElementById("comprado");

let casas = document.querySelectorAll(".casa");
let naipes = document.querySelectorAll(".naipe");
let qtdCasa = 1;

function handleDragOver2(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
}

function handleDragEnd2(e) {
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

  e.target.appendChild(card.to_dom);
  card.live_in = "table";
  card.to_dom.setAttribute("style", "top: 0px;");
}

for (i = 0; i < casas.length; i++) {
  casas[i].addEventListener("dragover", handleDragOver2, false);
  casas[i].addEventListener("drop", moverParaCasa, false);
  casas[i].addEventListener("dragend", handleDragEnd2, false);
}

function moverParaNaipe(e){
  if (e.preventDefault) {
    e.preventDefault();
  }

  let card = actions.source;

  if (card.value != 1) return;

  card.turn_up_parent(card);

  e.target.appendChild(card.to_dom);
  card.live_in = "house";
  card.to_dom.setAttribute("style", "top: 0px;");
}

for (i = 0; i < naipes.length; i++) {
  naipes[i].addEventListener("dragover", handleDragOver2, false);
  naipes[i].addEventListener("drop", moverParaNaipe, false);
  naipes[i].addEventListener("dragend", handleDragEnd2, false);

  // naipes[i].addEventListener("click", selecionarCarta, false);
}

distribute_cards();

function distribute_cards() {
  let qtd = qtdCasa;
  let index2 = 0;

  for (index = 0; index < casas.length; index++) {
    let parent_card = null;
    let pai = casas[index];

    for (; index2 < qtd; index2++) {
      card = deck[index2];
      card_dom = deck[index2].to_dom;

      pai.appendChild(card_dom);
      card.live_in = "table";
      card.parent = parent_card;

      if (pai.className != "casa")
        card_dom.setAttribute("style", "top: 20px;");

      pai = card_dom;
      parent_card = card;

      if (index2 < qtd - 1) {
        card.turn_down();
      } else {
        card.turn_up();
      }
      // deck[index2].classList.add("sombra");
    }

    qtd = index2 + index + qtdCasa + 1;
  }

  for (i = index2; i < deck.length; i++) {
    card = deck[i];
    card_dom = deck[i].to_dom;

    card.turn_down();
    divBaralho.appendChild(card_dom);
    card.live_in = "deck";

    // if (i == deck.length - 1) card_dom.classList.add("sombra");

    iniciando = false;
  }
}

divBaralho.addEventListener("mouseup", voltarCartas);

function voltarCartas(e){
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (actions.bought_cards.length == 0) return;

  let cards = actions.bought_cards;

  cards.forEach(card => {
    if (card.live_in != "deck") return;

    card.turn_down();
    divBaralho.appendChild(card.to_dom);
  });

  actions.bought_cards = [];
}
