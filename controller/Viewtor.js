export default class Viewtor {};

Viewtor.view = view;
async function view(target, file_name) {
  try {
    let template_html = await get.template(file_name);
    if(typeof target == "string") target = find(target);
    target.innerHTML = template_html || "";
  }
  catch (err) {
    find("#main").innerHTML = error_html;
    return;
  }
  find_all('[Eclick]').forEach(el => {
    let func = el.getAttribute('Eclick');
    el.addEventListener('click', event => this._eval(func, event, el));
    el.removeAttribute('Eclick');
  });
  find_all('[Echange]').forEach(el => {
    let func = el.getAttribute('Echange');
    el.addEventListener('change', event => this._eval(func, event, el));
    el.removeAttribute('Echange');
  });
  find_all('[Einput]').forEach(el => {
    let func = el.getAttribute('Einput');
    el.addEventListener('input', event => this._eval(func, event, el));
    el.removeAttribute('Einput');
  });
  find_all('[Eload]').forEach(el => {
    let func = el.getAttribute('Eload');
    el.addEventListener('load', event => this._eval(func, event, el));
    el.removeAttribute('Eload');
  });
}

let error_html =
`<style>
  #html_error .border_1_in {
    padding: 20px;
  }
</style>
<div id="html_error" class="border_1 thin walnut_wood">
  <div class="border_1_in bg_tv">
    畫面顯示錯誤
  </div>
</div>`;