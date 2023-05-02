export function historic_update(card, skip = false){
  const action = {
    card:                    card,
    is_turned_up:            card.is_turned_up,
    skip:                    skip
  };

  if (card.parent != null){
    action.parent_old = card.parent;
    action.parent_old_is_turned_up = card.parent.is_turned_up;
  }

  this.actions.push(action);
}
