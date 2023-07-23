import MainConnectController from '../controller/MainConnectController.js';

export default class API {};

/* ================================ */
/*   登入                           */
/* ================================ */

API.login = login;
async function login(account, password) {
  return await _post("/login", {account, password});
}

/* ================================ */
/*   取得顯示類型                   */
/* ================================ */

API.get_display_type = get_display_type;
async function get_display_type() {
  return await _post("/get_display_type");
}

/* ================================ */
/*   取得場景顯示                   */
/* ================================ */

API.get_display_data_scene = get_display_data_scene;
async function get_display_data_scene() {
  return await _post("/get_display_data_scene");
}

/* ================================ */
/*   通用處理                       */
/* ================================ */

async function _post(path, form) {
  if(!form) form = {};
  form.token = MainConnectController.get_token();
  if(!post.server_url) throw new Error("連線錯誤");
  return await post._send({
    url: post.server_url,
    path: path,
  }, form);
}
