import Viewtor from './Viewtor.js';
import SceneViewtor from './SceneViewtor.js';

export default class MainDisplayController {};
MainDisplayController.view = Viewtor.view;
MainDisplayController._eval = (func, $event, $this) => eval(func);

MainDisplayController.main_display = main_display;
async function main_display(TD) {
  if(TD.status != "success") return error_html(TD.msg);
  await this.view('#main', 'main');
  SceneViewtor.init();
  SceneViewtor.change_scene(TD.data);
}

function error_html(msg) {
find('#main').innerHTML =
`<style>
  #html_error .border_1_in {
    padding: 20px;
  }
</style>
<div id="html_error" class="border_1 thin walnut_wood">
  <div class="border_1_in bg_tv">
    ${msg || "場景讀取錯誤"}
  </div>
</div>`;
return null;
}
