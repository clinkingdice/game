import Viewtor from './Viewtor.js';

export default class MainDisplayController {};
MainDisplayController.view = Viewtor.view;
MainDisplayController._eval = (func, $event, $this) => eval(func);

MainDisplayController.main_display = main_display;
async function main_display(TD) {
  if(TD.status != "success") return find('#main').innerHTML = TD.msg || "錯誤";
  await this.view('#main', 'main');
  let {scene} = TD.data;
  find("#location").innerHTML = scene.name.split('>').map(name => (
    `<div>${name}</div>`
  )).join("");
  find("#scene").setAttribute('scene-id', scene.id);
  find("#scene_css").href = "./css/scene/" + scene.id + ".css";
}

function scene_css_onload() {
  console.log('scene_css_onload');
  //找看看有沒有在位置上，有的話就滾動
}