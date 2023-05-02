import { dom } from './dom.js';
import { stack } from './stack.js';

export function create_slot(type, div){
  return {
    type:  type,
    child: null,

    ...dom(div),
    ...stack()
  }
}
