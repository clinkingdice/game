import API from '../js/API.js';
import Viewtor from './Viewtor.js';
import SceneViewtor from './SceneViewtor.js';

export default class SceneDisplayController {};
SceneDisplayController.view = Viewtor.view;
SceneDisplayController._eval = (func, $event, $this) => eval(func);

SceneDisplayController.display = display;
function display() {
  error_html("AS");
  API.get_display_data_scene()
  .then(res => {
    start_display(res);
  })
  .catch(err => {
    error_html(err.msg);
  });
}

async function start_display(res) {
  await SceneDisplayController.view('#main', 'main');
  SceneViewtor.init();
  SceneViewtor.change_scene(res);
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
    ${msg || "場景顯示錯誤"}
  </div>
</div>`;
return null;
}
