class post {
  static url = "https://script.google.com/macros/s/AKfycbyuJRRfBauGecGZaQ8zePEy2_H335lvUUUMFaQkhMQLJUjTu1xCbvS9_vNIZRLnKRT9/exec";
  static create_role(post_data, done_function) {
    post_data = JSON.parse(JSON.stringify(post_data));
    post_data.action = "API_create_role";
    post._send(post_data, done_function);
  }
  static _send(post_data, done_function) {
    if(!window.XMLHttpRequest) { alert('無法連線，請更換瀏覽器'); return; }
    if(!post.url) { alert('未設定url'); return; }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", post.url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4 && xhr.status == 200){
        try {
          let data = JSON.parse(xhr.responseText);
          if(typeof done_function == "function") {
            done_function(data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let content = JSON.stringify(post_data);
    xhr.send("content=" + encodeURI(content));
  }
}