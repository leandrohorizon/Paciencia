export function historic_go_back(){
  if (this.actions.length == 0) return;

  const action = this.actions.pop();

  const card                    = action.card;
  const is_turned_up            = action.is_turned_up;
  const parent_old              = action.parent_old;
  const parent_old_is_turned_up = action.parent_old_is_turned_up;

  turn_card(card, is_turned_up);
  turn_card(parent_old, parent_old_is_turned_up);

  console.log(card, card.child);

  parent_old.append_child(card);

  if (action.skip) this.go_back();
}

function turn_card(card, is_turned_up){
  if (!card.turn_up) return;
  if (card.is_turned_up == is_turned_up) return;

  if (is_turned_up) {
    card.turn_up();
  }else{
    card.turn_down();
  }
}
