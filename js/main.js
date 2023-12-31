import CreateRoleController from '../controller/CreateRoleController.js';
import LoginController from '../controller/LoginController.js';
import MainConnectController from '../controller/MainConnectController.js';
import WsAPI from '../controller/WsAPI.js';
WsAPI.ws_send = MainConnectController.ws_send;

window.onload = () => {
  find('#main').innerHTML = "";
  switch(location.hash) {
    case "#create_role": CreateRoleController.display(); break;
    default: LoginController.display(); break;
  }
};
window.onhashchange = () => {
  location.reload();
};