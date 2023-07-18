import Viewtor from './Viewtor.js';
import MsgController from './MsgController.js';
import ApiController from './ApiController.js';

export default class MainConnectController {};
MainConnectController.view = Viewtor.view;
MainConnectController._eval = (func, $event, $this) => eval(func);

const ws_url = location.hostname == 'localhost' ? 'ws://localhost:3000' : '';
let ws = null, token = null;
MainConnectController.connect = connect;
function connect(new_token) {
  token = new_token;
  if(!ws_url) return;
  ws = new WebSocket(ws_url);
  ws.onopen = ws_onopen;
  ws.onclose = ws_onclose;
  ws.onmessage = event => {
    try {
      let json = JSON.parse(event.data);
      MsgController.index(json);
    }
    catch (err) {
      console.log(err);
    }
  };
}

function ws_onopen() {
  console.log('open connection');
  ApiController.open();
}

function ws_onclose() {
  console.log('close connection');
  ws.close();
  ws = null;
  token = null;
  MainConnectController.view('#main', 'connect_close');
}

MainConnectController.ws_send = ws_send;
function ws_send(json) {
  if(!ws) return;
  let send_json = Object.assign({}, json, {token});
  let json_str = JSON.stringify(send_json);
  ws.send(json_str);
}
