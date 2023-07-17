import Viewtor from './Viewtor.js';

export default class LoginController {};
LoginController.view = Viewtor.view;
LoginController._eval = (func, $event, $this) => eval(func);

LoginController.display = display;
function display() {
  this.view('#main', 'login');
}