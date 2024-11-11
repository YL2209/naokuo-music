
// 音乐默认声音大小
var musicVolume = 0.8;

document.addEventListener("DOMContentLoaded", function () {

  // sidebar menus
  const sidebarFn = {
    open: () => {
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
    },
    close: () => {
      anzhiyu.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
    },
  };

  const unRefreshFn = function () {
    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });
  };

  window.refreshFn = function () {
    anzhiyu.changeMusicList();
    NaoKuo.naoDarkButton('nav-naoDark', '.components');
  };

  refreshFn();
  unRefreshFn();
});
