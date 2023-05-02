import { historic_update } from './update.js'
import { historic_go_back } from './go_back.js'

export function create_historic(){
  return {
    actions: [],

    update: historic_update,
    go_back: historic_go_back
  }
}
