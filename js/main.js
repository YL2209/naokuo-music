// 第一次播放音乐
var anzhiyu_musicFirst = false;
// 音乐播放状态
var anzhiyu_musicPlaying = false;

// 音乐歌单切换初始值
var indexNum = null, indexNex = null;

// 已随机的歌曲
var selectRandomSong = [];
// 音乐默认声音大小
var musicVolume = 0.8;
// 是否切换了周杰伦音乐列表
var changeMusicListFlag = false;
// 当前默认播放列表
var defaultPlayMusicList = [];

document.addEventListener("DOMContentLoaded", function () {

  //监听蒙版关闭
  document.addEventListener(
    "touchstart",
    e => {
      anzhiyu.removeRewardMask();
    },
    { passive: true }
  );
  
  // sidebar menus
  const sidebarFn = {
    open: () => {
      anzhiyu.sidebarPaddingR();
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      document.getElementById("sidebar-menus").classList.add("open");
      mobileSidebarOpen = true;
    },
    close: () => {
      const $body = document.body;
      $body.style.paddingRight = "";
      anzhiyu.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
      document.getElementById("sidebar-menus").classList.remove("open");
      mobileSidebarOpen = false;
    },
  };

  const unRefreshFn = function () {
    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });
  };

  window.refreshFn = function () {

    // anzhiyu.getCustomPlayList();
    anzhiyu.changeMusicList();
    anzhiyu.addEventListenerConsoleMusicList(false);
  };

  refreshFn();
  unRefreshFn();
});
