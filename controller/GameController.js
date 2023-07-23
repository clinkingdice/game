import MsgController from './MsgController.js';

export default class GameController {};

let rid;

GameController.set_rid = set_rid;
function set_rid(new_rid) {
  rid = new_rid;
}

GameController.get_rid = get_rid;
function get_rid() {
  return rid;
}
