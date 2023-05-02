export function translate_suit(suit){
  return {
    'clubs':    '♣',
    'diamonds': '♦',
    'hearts':   '♥',
    'spades':   '♠'
  } [suit];
}

export function translate_value(value){
  return {
    1:  'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  }[value] || value;
}
