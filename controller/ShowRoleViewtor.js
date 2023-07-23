export default class ShowRoleViewtor {};

/* ================================ */
/*   剛顯示時初始化                 */
/* ================================ */

ShowRoleViewtor.create = create;
function create({rid, name, img, tags}) {
  return new_el("div.show_role", [
    create_tag_row(tags),
    new_el('div.show_role_name', name),
    create_img(img),
  ]);
}

function create_tag_row(tags) {
  new_el("div.show_role_tags");
  return null;
}

function create_img(src) {
  return new_el("img.role_img", {src});
}