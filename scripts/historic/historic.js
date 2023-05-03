import { append, push } from './writer.js'
import { travel_to_past, travel_to_future } from './navigate.js'

export function create_historic(){
  return {
    actions_past: [],
    actions_future: [],

    append,
    push,

    travel_to_past,
    travel_to_future
  }
}
