import API from '../js/API.js';
import SceneDisplayController from './SceneDisplayController.js';

export default class MainDisplayController {};

MainDisplayController.main_display = main_display;
async function main_display(TD) {
  find("#main").innerHTML = "";
  API.get_display_type()
  .then(res => {
    switch(res.display_type) {
      case "scene": SceneDisplayController.display(); break;
      default: error_html("不存在的顯示類型");
    }
  })
  .catch(err => {
    error_html();
  });
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
    ${msg || "取得顯示類型錯誤"}
  </div>
</div>`;
}
