import API from '../js/API.js';
import Viewtor from './Viewtor.js';
import GameController from './GameController.js';
import MainConnectController from './MainConnectController.js';
import MainDisplayController from './MainDisplayController.js';

export default class LoginController {};
LoginController.view = Viewtor.view;
LoginController._eval = (func, $event, $this) => eval(func);

LoginController.display = display;
function display() {
  this.view('#main', 'login');
}

function page(name) {
  find('#main > .border_2:not(.hidden)').classList.add('hidden');
  find('#login_' + name).classList.remove('hidden');
}
function login_oninput() {
  find("#error_msg").innerText = "";
}

function login_onclick() {
  let account = find("#account").value;
  let password = find("#password").value;
  if(!account) return find("#error_msg").innerText = "帳號未填寫";
  if(!password) return find("#error_msg").innerText = "密碼未填寫";
  page('submit');
  API.login(account, password)
  .then(res => {
    page('connect');
    MainConnectController.connect(res.token);
    GameController.set_rid(res.rid);
  })
  .catch(err => {
    page('form');
    if(err.status == "fail") {
      find("#error_msg").innerText = err.msg;
    }
    else {
      find("#error_msg").innerText = "連線錯誤";
    }
  });
}

LoginController.connect_result = connect_result;
function connect_result(TD) {
  if(TD.status == "success") {
    page('loading');
    MainDisplayController.main_display();
  }
  else {
    page('form');
    find("#error_msg").innerText = TD.msg || "錯誤";
  }
}