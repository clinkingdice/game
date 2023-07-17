export default class Viewtor {};

Viewtor.view = view;
async function view(target, file_name) {
  let template_html = await get.template(file_name);
  if(typeof target == "string") target = find(target);
  target.innerHTML = template_html || "";
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
}
