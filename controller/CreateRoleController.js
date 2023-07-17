import Viewtor from './Viewtor.js';

export default class CreateRoleController {};
CreateRoleController.view = Viewtor.view;
CreateRoleController._eval = (func, $event, $this) => eval(func);

CreateRoleController.display = display;
async function display() {
  await this.view('#main', 'create_role');
  set_select_city_options();
  update_check_content();
  set_test_img();
};

function page(index) {
  find('#main > .border_2:not(.hidden)').classList.add('hidden');
  find('#create_role_step_' + index).classList.remove('hidden');
}

function set_select_city_options() {
  find('#select_city').innerHTML = "";
  [
    {name: '哥羅伊', img: 'https://images.plurk.com/3e0Xp0ol6KwacL7N5ymd6.png'},
    {name: '馬須納宣', img: 'https://images.plurk.com/1c1iC2mbjlzIA3QHTIxeib.png'},
    {name: '埃拉科久', img: 'https://images.plurk.com/1XeL4JmjpUoaU5qntBJwsl.png'},
    {name: '梅卡格梅', img: 'https://images.plurk.com/6lzS7Efyuc6jlAkvVFQMKq.png'},
    {name: '賽廉斯', img: 'https://images.plurk.com/3bL6paK79C2sJTm6NvtZDv.png'},
    {name: '多亞', img: 'https://images.plurk.com/79AcP2gY8Ks7Ssq6CjktEh.png'},
    {name: '米芙歐爾', img: 'https://images.plurk.com/1HR1lF929wGAxiPpSTigtl.png'},
    {name: '戴佛霍', img: 'https://images.plurk.com/65fpIjbHTCI5Em5Q3AVALg.png'},
    {name: '昂勒絲翠德', img: 'https://images.plurk.com/F919bWhNw1HHCMqvE7Te7.png'},
    {name: '米奧特恩', img: 'https://images.plurk.com/7JRNuMMSSqHnYldf6MWvpg.png'},
    {name: '豐饒之海', img: 'https://images.plurk.com/43lYSzqsnlYUJfFDNWN9zK.png'},
    {name: '尼爾思達', img: 'https://images.plurk.com/5ykbi2JWb9OuYftHPL0IYp.png'},
    {name: '奧羅拉', img: 'https://images.plurk.com/5oW7EKuQyJJTLsfQWW7XHw.png'},
  ].forEach(({name, img}) => {
    new_el_to_el('#select_city', 'label', [
      new_el('img', {src: img}),
      new_el('input.radio', {type: "radio", name: "city", value: name}),
      new_el('span', name),
    ]);
  });
}

/* ================================ */
/*  輸入事件                        */
/* ================================ */

function name_onchange(target) {
  data.name = target.value = target.value.substr(0, 15);
  update_check_content();
}

function race_onchange(target) {
  data.race = target.value.split('-')[0];
  data.race_branch = target.value.split('-')[1] || "";
  update_check_content();
}

function img_onchange(target) {
  let url = target.value;
  if(!url) set_data_img("");
  else if(/^https:\/\//.test(url)) {
    set_img_err("圖片讀取檢查中");
    test_img.src = url;
  }
  else set_img_err("圖片網址必須要是https://開頭");
  update_check_content();
}

function class_faction_onchange(target) {
  let class_faction_str = target.value;
  data.class_faction = target.value;
  let option_el = find(target, `[value="${target.value}"]`);
  data.class_faction_i = +option_el.getAttribute('data-val');
  set_learn();
  set_class_options();
  set_arms_options();
  update_check_content();
}

function role_class_onchange(target) {
  data.role_class = target.value;
  set_arms_options();
  update_check_content();
}

function arms_onchange(target) {
  data.arms = target.value;
  update_check_content();
}

function handedness_onchange(target) {
  data.handedness = target.value;
  update_check_content();
}

function select_city_onchange({target}) {
  data.city = target.value;
  update_check_content();
}

function account_onchange(target) {
  data.account = target.value = target.value.replace(/[^a-z0-9_]/ig, '').substr(0, 15);
  update_check_content();
}

function password_onchange(target) {
  data.password = target.value = target.value.substr(0, 100);
  update_check_content();
}

function plurk_url_onchange(target) {
  let url = target.value;
  let err_str = "";
  if(!url) set_data_plurk_url("");
  else if(!/^https:\/\/www\.plurk\.com\//.test(url)) set_plurk_url_err("網址錯誤");
  else if(url.replace(/^https:\/\/www\.plurk\.com\//, '').length == 0)
    set_plurk_url_err("網址不可以是官網");
  else if(/[^a-z0-9_]/i.test(url.replace(/^https:\/\/www\.plurk\.com\//, '')))
    set_plurk_url_err("不存在的河道網址");
  else set_data_plurk_url(url);
  update_check_content();
}

/* ================================ */
/*  圖片處理                        */
/* ================================ */

let img_view, test_img;

function set_test_img() {
  test_img = new Image();
  test_img.onload = () => {
    if(test_img.width > 250 || test_img.height > 320) set_img_err("圖片尺寸超過250x320像素");
    else set_data_img(test_img.src);
    update_check_content();
  };
  test_img.onerror = () => {
    set_img_err("無法讀取的圖片");
    update_check_content();
  };
}

function set_data_img(src) {
  find("#img_err").innerText = data_err.img = "";
  find('#img_view').src = data.img = src;
}

function set_img_err(msg) {
  find("#img_err").innerText = data_err.img = msg;
  find('#img_view').src = data.img = "";
}

/* ================================ */
/*  河道網址處理                    */
/* ================================ */

function set_data_plurk_url(url) {
  find("#plurk_url_err").innerText = data_err.plurk_url = "";
  data.plurk_url = url;
}

function set_plurk_url_err(msg) {
  find("#plurk_url_err").innerText = data_err.plurk_url = msg;
  data.plurk_url = "";
}

/* ================================ */
/*  學習難度表更新                  */
/* ================================ */

function set_learn() {
  let list = [97, 92, 84, 75, 63, 48, 30, 48, 63, 75, 84, 92];
  let index = data.class_faction_i;
  if(index != -1) list.unshift(...list.splice(+index * -1));
  else list.fill(0);
  find_all('#class_faction_view span').forEach((el, i) => {
    el.innerText = list[i];
  });
}

/* ================================ */
/*  選項設定                        */
/* ================================ */

function set_class_options() {
  data.role_class = "";
  find_all('#role_class option:not([placeholder])').forEach(el => el.remove());
  let list = [
    ['魔法師', '吟遊詩人'],
    ['亡靈法師', '蟲使'],
    ['咒術師', '熔蝕'],
    ['毒師', '血祭司'],
    ['刺客', '忍者'],
    ['盜賊', '格鬥家'],
    ['戰士', '劍士'],
    ['槍使', '護衛'],
    ['盾戰士', '聖騎士'],
    ['守林人', '召喚師'],
    ['德魯伊', '棋策家'],
    ['演奏家', '占卜師'],
  ][data.class_faction_i];
  if(!list) return;
  list.forEach(role_class_name => {
    new_el_to_el('#role_class', 'option', {value: role_class_name}, role_class_name);
  });
}

function set_arms_options() {
  data.arms = "";
  find_all('#arms option:not([placeholder])').forEach(el => el.remove());
  let role_class_name = data.role_class;
  if(!role_class_name) return;
  let list = {
    '魔法師': ['書、魔法戒', '雙手杖'],
    '吟遊詩人': ['書、書籤', '弦樂器'],
    '亡靈法師': ['杖、侵蝕物', '水晶球'],
    '蟲使': ['杖、侵蝕物', '侵蝕物'],
    '咒術師': ['刀、侵蝕物', '針、侵蝕物'],
    '熔蝕': ['侵蝕物', '刀、侵蝕物'],
    '毒師': ['刀、侵蝕物', '針、侵蝕物'],
    '血祭司': ['杖、侵蝕物', '祭司杖、侵蝕物'],
    '刺客': ['劍、毒', '刀、毒'],
    '忍者': ['鎖鐮', '苦無、撒菱'],
    '盜賊': ['雙手刀', '雙刀'],
    '格鬥家': ['雙指虎', '指虎、刀'],
    '戰士': ['雙手劍', '雙手錘'],
    '劍士': ['雙劍', '劍、刀'],
    '槍使': ['槍', '雙槍'],
    '護衛': ['劍、盾', '槍、盾'],
    '盾戰士': ['大盾', '盾劍'],
    '聖騎士': ['大盾', '長槍、盾'],
    '守林人': ['盾、提燈', '盾、鈴鐺'],
    '召喚師': ['錘、召喚笛', '劍、召喚笛'],
    '德魯伊': ['杖、元素石', '雙元素石'],
    '棋策家': ['錘、卷', '元素石、卷'],
    '演奏家': ['管樂器', '弦樂器'],
    '占卜師': ['水晶球', '紙牌'],
  }[role_class_name];
  list.forEach(arms_name => {
    new_el_to_el('#arms', 'option', {value: arms_name}, arms_name);
  });
}

/* ================================ */
/*  最後檢查                        */
/* ================================ */

const data = {
  name: "",
  img: "",
  race: "",
  race_branch: "",
  class_faction: "",
  class_faction_i: null,
  role_class: "",
  arms: "",
  handedness: "",
  city: "",
  account: "",
  password: "",
  plurk_url: "",
};

const data_err = {};

function update_check_content() {
  let is_err = false;
  let content = Object.entries(data).map(([key, val]) => {
    if(key == "class_faction_i") return;
    let err = data_err[key];
    is_err = is_err || err;
    val = err ? "<error>" + err + "</error>" : val;
    if(!val && typeof val != "number") {
      val = "<error>未填寫</error>";
      is_err = true;
    }
    else if(!err && key == "password") {
      val = val.split('').fill("*").join('');
    }
    return "<div>" + {
      name: "名字",
      img: "圖片網址",
      race: "種族",
      race_branch: "種族分支",
      class_faction: "職業系別",
      role_class: "職業",
      arms: "初始裝備",
      handedness: "慣用手",
      city: "初始城市",
      account: "帳號",
      password: "密碼",
      plurk_url: "河道網址",
    }[key] + "</div><div>" + val + "</div>";
  });
  find('#check_content').innerHTML = content.filter(v => v).join('');
  if(is_err) find('#submit_btn').setAttribute('disabled', '');
  else find('#submit_btn').removeAttribute('disabled');
}

/* ================================ */
/*  送出                            */
/* ================================ */

function submit() {
  page('submit');
  post.create_role(data)
  .then(res => page('done'))
  .catch(err => page('submit_fail'));
}
