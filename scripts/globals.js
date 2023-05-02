import { create_historic } from "./historic/historic.js";
import { create_slots, create_deck_turn_down, create_deck_turn_up } from "./slot/slots.js";

export const actions = {
  selected_card: null,
  historic: create_historic()
}

export const tables = create_slots("table", document.querySelectorAll(".casa"))
export const houses = create_slots("house", document.querySelectorAll(".naipe"))
export const deck_turn_down = create_deck_turn_down()
export const deck_turn_up = create_deck_turn_up()
