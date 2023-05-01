export function historic_go_back(){
  if (this.actions.length == 0) return;

  const action = this.actions.pop();

  const card                    = action.card;
  const is_turned_up            = action.is_turned_up;
  const parent_old              = action.parent_old;
  const parent_old_is_turned_up = action.parent_old_is_turned_up;

  if (is_turned_up) {
    card.turn_up();
  }else{
    card.turn_down();
  }

  if (parent_old != null && parent_old_is_turned_up != null) {
    if (parent_old_is_turned_up) {
      parent_old.turn_up();
    }else{
      parent_old.turn_down();
    }
  }

  parent_old.append_child(card);
}
