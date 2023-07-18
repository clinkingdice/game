import MainConnectController from './MainConnectController.js';

export default class ApiController {};

/* ================================ */
/*  啟動                            */
/* ================================ */

ApiController.open = open;
function open() {
  this.ws_send({
    action: 'open',
  });
}

/* ================================ */
/*  主要顯示                        */
/* ================================ */

ApiController.main_display = main_display;
function main_display() {
  this.ws_send({
    action: 'main_display',
  });
}
