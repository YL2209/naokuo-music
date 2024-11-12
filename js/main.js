
// 音乐默认声音大小
var musicVolume = 0.8;

document.addEventListener("DOMContentLoaded", function () {
  window.refreshFn = function () {
    anzhiyu.changeMusicList();
    NaoKuo.naoDarkButton('nav-naoDark', '.components');
  };

  refreshFn();
});
