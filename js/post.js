class post {
  static google_sheet_url = "https://script.google.com/macros/s/AKfycbyuJRRfBauGecGZaQ8zePEy2_H335lvUUUMFaQkhMQLJUjTu1xCbvS9_vNIZRLnKRT9/exec";
  static async create_role(form) {
    await post._send({
      url: post.google_sheet_url,
      action: "API_create_role",
    }, form);
  }
  static async _send({url = "", path = "", action}, form) {
    if(!window.XMLHttpRequest) { alert('無法連線，請更換瀏覽器'); return; }
    form = JSON.parse(JSON.stringify(form));
    if(action) form.action = action;
    if(!url) { alert('未設定url'); return; }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url + path, true);
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if(xhr.readyState != 4) return;
        if(xhr.status == 200){
          try {
            let data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        }
        else {
          reject('連線失敗: ' + xhr.status);
        }
      }
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      let content = JSON.stringify(form);
      xhr.send("content=" + encodeURI(content));
    });
  }
}