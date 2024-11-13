
// 音乐默认声音大小
var musicVolume = 0.8;

document.addEventListener("DOMContentLoaded", function () {
  window.refreshFn = function () {
    naokuo.changeMusicList();
    naokuo.naoDarkButton('nav-naoDark', '.components');
  };

  refreshFn();
});
