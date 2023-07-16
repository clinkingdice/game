function find_all(param1, param2) {
  if(typeof param1 == 'string') return document.querySelectorAll(param1);
  else return param1.querySelectorAll(param2);
}
function find(param1, param2) {
  if(typeof param1 == 'string') return document.querySelector(param1);
  else return param1.querySelector(param2);
}
function new_el_to_el(target_el, tag_str, param1, param2) {
  let el = new_el(tag_str, param1, param2);
  if(typeof target_el == "string") target_el = find(target_el);
  if(target_el) target_el.appendChild(el);
  return el;
}
function new_el(tag_str, param1, param2) {
  let id, class_list;
  if(tag_str.search('#') != -1) id = tag_str.match(/#[^\.]*/)[0].substr(1);
  class_list = tag_str.split('.').slice(1).filter(v=>v);
  let tagName = tag_str.match(/[^#\.]*/)[0];
  
  let attr = {}, innerHTML;
  if(is_attr(param1)) Object.assign(attr, param1);
  if(is_attr(param2)) Object.assign(attr, param2);
  
  let innerText = "";
  if(typeof param1 == 'string' || typeof param1 == 'number') innerText = param1;
  if(typeof param2 == 'string' || typeof param2 == 'number') innerText = param2;
  
  let child_arr = [];
  if(is_HTMLElement_arr(param1)) child_arr = child_arr.concat(param1);
  if(is_HTMLElement_arr(param2)) child_arr = child_arr.concat(param2);
  if(param1 instanceof HTMLElement) child_arr.push(param1);
  if(param2 instanceof HTMLElement) child_arr.push(param2);
  
  let el = document.createElement(tagName);
  if(id) el.id = id;
  for(let className of class_list) el.classList.add(className);
  for(let key in attr) el.setAttribute(key, attr[key]);
  if(innerText) el.innerText = innerText;
  else if(child_arr.length) {
    child_arr.forEach(sub_el => el.appendChild(sub_el));
  }
  return el;

  function is_HTMLElement_arr(param) {
    if(Array.isArray(param)) {
      for(let p of param) {
        if(!(p instanceof HTMLElement)) return false;
      }
      return true;
    }
    return false;
  }
  function is_attr(param) {
    if(!param || param.constructor !== Object) return false;
    if(typeof param != 'object' || Array.isArray(param) || param instanceof HTMLElement) return false;
    for(let key in param) {
      if(param[key] === true) param[key] = '';
      if(param[key] == undefined || param[key] == null || param[key] === false) delete param[key];
      else if(typeof param[key] != 'number' && typeof param[key] != 'string') return false;
    }
    return true;
  }
}
