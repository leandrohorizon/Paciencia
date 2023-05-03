export function append({ card, new_parent, skip = false } = {}){
  this.push({
    card, new_parent, skip, direction: 'past'
  });

  this.actions_future = [];
}

export function push({ card, new_parent, skip = false, direction } = {}){
  const action = {
    card:         card,
    is_turned_up: card.is_turned_up,
    skip:         skip
  };

  if (card.parent != null){
    action.old_parent = card.parent;
    action.old_parent_is_turned_up = card.parent.is_turned_up;
  }

  if (new_parent != null){
    action.new_parent = new_parent;
    action.new_parent_is_turned_up = new_parent.is_turned_up;
  }

  if (direction == 'past'){
    this.actions_past.push(action);
  } else {
    this.actions_future.push(action);
  }
}
