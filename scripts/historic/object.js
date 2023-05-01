import { historic_update } from './update.js'
import { historic_go_back } from './go_back.js'

export function historic_object(){
  return {
    actions: [],

    update: historic_update,
    go_back: historic_go_back
  }
}
