import { translate_suit, translate_value } from './translate.js';

export function create_sides(side, suit, value){
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

export function create_body(suit, value){
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
