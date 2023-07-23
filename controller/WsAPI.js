import MainConnectController from './MainConnectController.js';

export default class WsAPI {};

/* ================================ */
/*  啟動                            */
/* ================================ */

WsAPI.open = open;
function open() {
  this.ws_send({
    action: 'open',
  });
}
