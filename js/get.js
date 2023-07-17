class get {
  static async template(name) {
    return await get._send("./template/" + name + ".html", {});
  }
  static async _send(url, form = {}) {
    if(!window.XMLHttpRequest) { alert('無法連線，請更換瀏覽器'); return; }
    if(!url) { alert('未設定url'); return; }
    let form_str = Object.entries(form).map(({key, val}) => {
      return key + "=" + encodeURI(val);
    }).join("&");
    if(form_str) url += "?" + form_str;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    return new Promise((resolve, reject) => {
      xhr.addEventListener('load', () => {
        if(xhr.readyState != 4) return;
        if(xhr.status == 200){
          resolve(xhr.responseText);
        }
        else {
          reject('連線失敗: ' + xhr.status);
        }
      });
      xhr.addEventListener('error', (err) => {
        reject(err);
      });
      xhr.send();
    });
  }
}