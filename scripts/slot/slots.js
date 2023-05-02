import { create_slot } from './slot.js';

export function create_slots(type, divs){
  return [...divs].map(div => {
    const slot = create_slot(type, div);
    const div_dom = slot.to_dom;

    div_dom.addEventListener("dragover", slot.prevent_default.bind(slot), false);
    div_dom.addEventListener("drop", slot.handleDrop.bind(slot), false);
    div_dom.addEventListener("dragend", slot.prevent_default.bind(slot), false);
    div_dom.addEventListener("mouseup", slot.handleDrop.bind(slot), false);

    return slot;
  });
}

export function create_deck_turn_down(){
  const div = document.getElementById('baralho');
  const obj = create_slot('deck_turn_down', div);

  obj.to_dom.addEventListener("mouseup", obj.mouseup.bind(obj), false);
  return obj;
}

export function create_deck_turn_up(){
  const div = document.getElementById('comprado');
  return create_slot('deck_turn_up', div);
}
