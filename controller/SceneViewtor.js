import ShowRoleViewtor from './ShowRoleViewtor.js';
import GameController from './GameController.js';

export default class SceneViewtor {};

let scene_el, scene_img_el, seat_list_el, location_el, scene_css_el;
let scene_data = {};
let cur_ratio = 1;

/* ================================ */
/*   剛顯示時初始化                 */
/* ================================ */

SceneViewtor.init = init;
function init() {
  scene_el = find("#scene");
  scene_img_el = find("#scene_img");
  seat_list_el = find("#role_seat_list");
  location_el = find("#location");
  scene_css_el = find("#scene_css");
  scene_css_el.onload = scene_css_onload;
  window.onresize = () => window_onresize();
}

/* ================================ */
/*   視窗大小改變                   */
/* ================================ */

function window_onresize() {
  cur_ratio = scene_img_el.offsetHeight / 588;
  seat_list_el.style.setProperty('transform', 'scale(' + cur_ratio + ')');
}

/* ================================ */
/*   切換場景                       */
/* ================================ */

SceneViewtor.change_scene = change_scene;
function change_scene({scene, players}) {
  scene_data = scene;
  location_display();
  role_seat_list_display();
  in_seat_player_display(players);
  scene_el.setAttribute('scene-id', scene_data.id);
  scene_css_el.href = "./css/scene/" + scene_data.id + ".css";
}

/* ================================ */
/*   場景css載入後                  */
/* ================================ */

function scene_css_onload() {
  window_onresize();
  let self_rid = GameController.get_rid();
  let self_seat_el = find(seat_list_el, `.role_seat[guest="${self_rid}"]`);
  scroll_to_seat(self_seat_el);
}

/* ================================ */
/*   顯示場景名稱                   */
/* ================================ */

function location_display() {
  location_el.innerHTML = "";
  if(!scene_data.name) return;
  scene_data.name.split(">").forEach(sub_name => {
    new_el_to_el(location_el, "div", sub_name);
  });
}

/* ================================ */
/*   顯示位置                       */
/* ================================ */

function role_seat_list_display() {
  seat_list_el.innerHTML = "";
  if(!scene_data.seat_count) return;
  for(let i=0; i<scene_data.seat_count; i++) {
    let seat_el = new_el_to_el(seat_list_el, "div.role_seat");
    seat_el.onclick = () => {
      console.log(seat_el.getAttribute('guest'));
    };
  }
}

/* ================================ */
/*   顯示位置上的玩家               */
/* ================================ */

function in_seat_player_display(players) {
  players.forEach(player => {
    let seat_el = find_all(seat_list_el, '.role_seat')[player.scene_seat];
    if(!seat_el) return;
    seat_el.innerHTML = "";
    let show_role_el = ShowRoleViewtor.create(player);
    seat_el.appendChild(show_role_el);
    seat_el.setAttribute('guest', player.rid);
  });
}

/* ================================ */
/*   滾動場景到目標位置             */
/* ================================ */

let scroll_interval;
function scroll_to_seat(seat_el) {
  if(!seat_el) return;
  let seat_offset_left = seat_el.offsetLeft * cur_ratio;
  let scroll_left = seat_offset_left - scene_el.offsetWidth / 2;
  clearInterval(scroll_interval);
  scroll_interval = setInterval(() => {
    if(scene_el.scrollWidth == scene_el.offsetWidth) return;
    scene_el.scrollTo(scroll_left, 0);
    clearInterval(scroll_interval);
  }, 5);
}
