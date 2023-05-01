export function historic_update(card){
  const action = {
    card:                    card,
    is_turned_up:            card.is_turned_up,
    parent_old:              card.parent,
    parent_old_is_turned_up: card.parent.is_turned_up
  };

  this.actions.push(action);
}
