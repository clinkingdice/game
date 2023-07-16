class get {
  static url = "./";
  static template(name, done_function) {
    get._send("template/" + name + ".html", {}, done_function);
  }
  static _send(path = "", form = {}, done_function) {
    if(!window.XMLHttpRequest) { alert('無法連線，請更換瀏覽器'); return; }
    if(!get.url) { alert('未設定url'); return; }
    let form_url = get.url + path;
    let form_str = Object.entries(form).map(({key, val}) => {
      return key + "=" + encodeURI(val);
    }).join("&");
    if(form_str) form_url += "?" + form_str;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", form_url, true);
    xhr.addEventListener('load', () => {
      if(xhr.readyState == 4 && xhr.status == 200){
        if(typeof done_function == "function") {
          done_function(xhr.responseText);
        }
      }
    });
    xhr.send();
  }
}