import { create_card } from './card.js'

export function create_deck(){
  let array = new Array(52).fill(null)

  return array.map(function(_, index){
    const suit = ['clubs', 'diamonds', 'hearts', 'spades'][Math.floor(index/13)];
    const value = (index % 13) + 1;

    const card = create_card(suit, value);

    const card_dom = card.to_dom

    card_dom.addEventListener("dragstart", card.handleDragStart.bind(card), false);
    card_dom.addEventListener("dragover", card.handleDragOver, false);
    card_dom.addEventListener("drop", card.handleDrop.bind(card), false);
    card_dom.addEventListener("dragend", card.handleDragEnd, false);

    card_dom.addEventListener("mouseup", card.mouseup.bind(card), false);
    card_dom.addEventListener("dblclick", card.dblclick.bind(card), false);
    card_dom.addEventListener("contextmenu", card.dblclick.bind(card), false);

    card_dom.addEventListener("mouseover", card.mouseover.bind(card), false);
    card_dom.addEventListener("mouseout", card.mouseout.bind(card), false);

    return card;
  });
}
