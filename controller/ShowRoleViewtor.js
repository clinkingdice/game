export default class ShowRoleViewtor {};

/* ================================ */
/*   剛顯示時初始化                 */
/* ================================ */

ShowRoleViewtor.create = create;
function create({rid, name, img}) {
  return new_el("div.show_role", [
    create_img(img),
  ]);
}

function create_img(src) {
  return new_el("img.role_img", {src});
}