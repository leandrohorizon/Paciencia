import { actions } from "../globals.js";

export function travel_to_past(){
  if (this.actions_past.length == 0) return;

  const action = this.actions_past.pop();

  actions.historic.push({
    card: action.card,
    new_parent: action.old_parent,
    skip: action.skip,
    direction: 'future'
  });

  travel(action);

  if (action.skip) this.travel_to_past();
}

export function travel_to_future(){
  if (this.actions_future.length == 0) return;

  const action = this.actions_future.pop();

  actions.historic.push({
    card: action.card,
    new_parent: action.new_parent,
    skip: action.skip,
    direction: 'past'
  });

  travel(action);

  if (action.skip) this.travel_to_future();
}

function travel(action){
  const card                    = action.card;
  const is_turned_up            = action.is_turned_up;
  const old_parent              = action.old_parent;
  const old_parent_is_turned_up = action.old_parent_is_turned_up;
  const new_parent              = action.new_parent;
  const new_parent_is_turned_up = action.new_parent_is_turned_up;

  turn_card(card, is_turned_up);
  turn_card(old_parent, old_parent_is_turned_up);
  turn_card(new_parent, new_parent_is_turned_up);

  if (old_parent != null)
    old_parent.append_child(card);
}

function turn_card(card, is_turned_up){
  if (card == null) return;
  if (card.turn_up == null) return;
  if (card.is_turned_up == is_turned_up) return;

  if (is_turned_up) {
    card.turn_up();
  }else{
    card.turn_down();
  }
}
