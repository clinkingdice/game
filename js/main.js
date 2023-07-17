import CreateRoleController from '../controller/CreateRoleController.js';
import LoginController from '../controller/LoginController.js';

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