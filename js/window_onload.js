window.onload = () => {
  find('#main').innerHTML = "";
  switch(location.hash) {
    case "#create_role": display_create_role(); break;
    default: find('#main').innerHTML = ":0?"; break;
  }
};
window.onhashchange = () => {
  location.reload();
};