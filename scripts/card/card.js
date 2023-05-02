import { translate_suit, translate_value } from './translate.js';
import { stack } from './stack.js';
import { dom } from './dom.js';

export function create_card(suit, value){
  return {
    suit:         suit,
    value:        value,
    live_in:      'deck',
    is_turned_up: false,
    child:        null,
    parent:       null,
    slot:         null,

    translate_suit: translate_suit(suit),
    translate_value: translate_value(value),

    ...stack(),
    ...dom(suit, value)
  }
}
