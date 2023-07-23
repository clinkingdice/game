import LoginController from './LoginController.js';
import MainDisplayController from './MainDisplayController.js';

export default class MsgController {};

MsgController.index = index;
function index(TD) {
  switch(TD.action) {
    case "open": return LoginController.connect_result(TD);
  }
}
