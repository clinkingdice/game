function display_create_role(index) {
  get.template("create_role_main", data => {
    find('#main').innerHTML = data;
    create_role.set_select_city_options();
    create_role.set_event();
    create_role.update_check_content();
  });
}

class create_role {
  static data = {
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
  static data_err = {};
  static page(index) {
    find('#main > .border_2:not(.hidden)').classList.add('hidden');
    find('#create_role_step_' + index).classList.remove('hidden');
  }
  static set_event() {
    find('#name').addEventListener('change', create_role.name_onchange);
    find('#race').addEventListener('change', create_role.race_onchange);
    find('#img').addEventListener('change', create_role.img_onchange);
    create_role.set_test_img();
    find('#class_faction').addEventListener('change', create_role.class_faction_onchange);
    find('#role_class').addEventListener('change', create_role.role_class_onchange);
    find('#arms').addEventListener('change', create_role.arms_onchange);
    find('#handedness').addEventListener('change', create_role.handedness_onchange);
    find('#select_city').addEventListener('change', create_role.select_city_onchange);
    find('#account').addEventListener('change', create_role.account_onchange);
    find('#password').addEventListener('change', create_role.password_onchange);
    find('#plurk_url').addEventListener('change', create_role.plurk_url_onchange);
  }
  static name_onchange({target}) {
    create_role.data.name = target.value = target.value.substr(0, 15);
    create_role.update_check_content();
  }
  static race_onchange({target}) {
    create_role.data.race = target.value.split('-')[0];
    create_role.data.race_branch = target.value.split('-')[1] || "";
    create_role.update_check_content();
  }
  static img_onchange({target}) {
    let url = target.value;
    find('#img_view').src = create_role.data.img = "";
    if(!url) {
      find("#img_err").innerText = create_role.data_err.img = "";
    }
    else if(/^https:\/\//.test(url)) {
      find("#img_err").innerText = create_role.data_err.img = "圖片讀取檢查中";
      create_role.test_img.src = url;
    }
    else {
      find("#img_err").innerText = create_role.data_err.img = "圖片網址必須要是https://開頭";
    }
    create_role.update_check_content();
  }
  static set_test_img() {
    create_role.test_img = new Image();
    create_role.test_img.onload = () => {
      if(create_role.test_img.width > 250 || create_role.test_img.height > 320) {
        find("#img_err").innerText = create_role.data_err.img = "圖片尺寸超過250x320像素";
      }
      else {
        find('#img_view').src = create_role.data.img = create_role.test_img.src;
        find("#img_err").innerText = create_role.data_err.img = "";
      }
      create_role.update_check_content();
    };
    create_role.test_img.onerror = () => {
      find("#img_err").innerText = create_role.data_err.img = "無法讀取的圖片";
      create_role.update_check_content();
    };
  }
  static class_faction_onchange({target}) {
    let class_faction_str = target.value;
    create_role.data.class_faction = target.value;
    let option_el = find(target, `[value="${target.value}"]`);
    create_role.data.class_faction_i = +option_el.getAttribute('data-val');
    create_role.set_learn(target);
    create_role.set_class_options();
    create_role.set_arms_options();
    create_role.update_check_content();
  }
  static role_class_onchange({target}) {
    create_role.data.role_class = target.value;
    create_role.set_arms_options();
    create_role.update_check_content();
  }
  static arms_onchange({target}) {
    create_role.data.arms = target.value;
    create_role.update_check_content();
  }
  static handedness_onchange({target}) {
    create_role.data.handedness = target.value;
    create_role.update_check_content();
  }
  static select_city_onchange({target}) {
    create_role.data.city = target.value;
    create_role.update_check_content();
  }
  static account_onchange({target}) {
    create_role.data.account = target.value = target.value.replace(/[^a-z0-9_]/ig, '').substr(0, 15);
    create_role.update_check_content();
  }
  static password_onchange({target}) {
    create_role.data.password = target.value = target.value.substr(0, 100);
    create_role.update_check_content();
  }
  static plurk_url_onchange({target}) {
    let url = target.value;
    let err_str = "";
    if(!url) {
      create_role.data.plurk_url = "";
    }
    else if(!/^https:\/\/www\.plurk\.com\//.test(url)) {
      err_str = "網址錯誤";
    }
    else if(url.replace(/^https:\/\/www\.plurk\.com\//, '').length == 0) {
      err_str = "網址錯誤，不可以是官網";
    }
    else if(/[^a-z0-9_]/i.test(url.replace(/^https:\/\/www\.plurk\.com\//, ''))) {
      err_str = "不存在的河道網址";
    }
    else {
      create_role.data.plurk_url = url;
    }
    find("#plurk_url_err").innerText = create_role.data_err.plurk_url = err_str;
    create_role.update_check_content();
  }
  static update_check_content() {
    let is_err = false;
    let content = Object.entries(create_role.data).map(([key, val]) => {
      if(key == "class_faction_i") return;
      let err = create_role.data_err[key];
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
  static set_learn() {
    let list = [97, 92, 84, 75, 63, 48, 30, 48, 63, 75, 84, 92];
    let index = create_role.data.class_faction_i;
    if(index != -1) list.unshift(...list.splice(+index * -1));
    else list.fill(0);
    find_all('#class_faction_view span').forEach((el, i) => {
      el.innerText = list[i];
    });
  }
  static set_class_options() {
    create_role.data.role_class = "";
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
    ][create_role.data.class_faction_i];
    if(!list) return;
    list.forEach(role_class_name => {
      new_el_to_el('#role_class', 'option', {value: role_class_name}, role_class_name);
    });
  }
  static set_arms_options() {
    create_role.data.arms = "";
    find_all('#arms option:not([placeholder])').forEach(el => el.remove());
    let role_class_name = create_role.data.role_class;
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
  static set_select_city_options() {
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
  static submit() {
    create_role.page('submit');
    post.create_role(create_role.data, data => {
      console.log(data);
      create_role.page('done');
    });
  }
}