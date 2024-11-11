const anzhiyu = {
  animateIn: (ele, text) => {
    ele.style.display = "block";
    ele.style.animation = text;
  },

  animateOut: (ele, text) => {
    ele.addEventListener("animationend", function f() {
      ele.style.display = "";
      ele.style.animation = "";
      ele.removeEventListener("animationend", f);
    });
    ele.style.animation = text;
  },

  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const anMusicBg = document.getElementById("an_music_bg");

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      musiccover && (anMusicBg.style.backgroundImage = musiccover.style.backgroundImage);
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        if (musiccover) {
          clearInterval(timer);
          // 绑定事件
          anzhiyu.addEventListenerMusic();
          // 确保第一次能够正确替换背景
          anzhiyu.changeMusicBg();

        }
      }, 100);
    }
  },

  // 监听音乐背景改变
  addEventListenerMusic: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    const metingAplayer = naokuo_ap;

    //初始化音量
    metingAplayer.volume(0.8, true);
    // 加载完设置背景
    metingAplayer.on("loadeddata", function () {
      anzhiyu.changeMusicBg();
    });

    aplayerIconMenu.addEventListener("click", function () {
      const menu_mask = document.getElementById("menu-mask"),
        aplayer_list = anMusicPage.querySelector(".aplayer.aplayer-withlist .aplayer-list");
      if (menu_mask && aplayer_list) {
        menu_mask.style.display = "block";
        menu_mask.style.animation = "0.5s ease 0s 1 normal none running to_show";
        aplayer_list.style.opacity = "1";
      }
    });

    function anMusicPageMenuAask() {
      if (document.body.getAttribute("data-type") !== "music") {
        document.getElementById("menu-mask").removeEventListener("click", anMusicPageMenuAask);
        return;
      }
      // document.getElementById("eo-music-list").classList.remove("eomusic-onoff"),
        anMusicPage.querySelector(".aplayer-list") && anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
    }

    document.getElementById("menu-mask").addEventListener("click", anMusicPageMenuAask);

    // 监听键盘事件
    //空格控制音乐
    document.addEventListener("keydown", function anMusicKeyDown(event) {
      if (document.body.getAttribute("data-type") !== "music") {
        document.removeEventListener("keydown", anMusicKeyDown);
        return;
      }
      //暂停开启音乐
      if (event.code === "Space") {
        event.preventDefault();
        metingAplayer.toggle();
      }
      //切换下一曲
      if (event.keyCode === 39) {
        event.preventDefault();
        metingAplayer.skipForward();
      }
      //切换上一曲
      if (event.keyCode === 37) {
        event.preventDefault();
        metingAplayer.skipBack();
      }
      //增加音量
      if (event.keyCode === 38) {
        if (musicVolume <= 1) {
          musicVolume += 0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
      //减小音量
      if (event.keyCode === 40) {
        if (musicVolume >= 0) {
          musicVolume += -0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
    });
  },

  // 切换歌单
  changeMusicList: async function () {
    const currentTime = new Date().getTime();
    const cacheData = JSON.parse(localStorage.getItem("musicData")) || { timestamp: 0 };
    let songs = [];

      // 如果缓存的数据没有过期，直接使用
      if (currentTime - cacheData.timestamp < 24 * 60 * 60 * 1000) {
        songs = cacheData.songs;
      } else {
        // 否则重新从服务器获取数据
        const response = await fetch("/json/music.json");
        songs = await response.json();
        cacheData.timestamp = currentTime;
        cacheData.songs = songs;
        localStorage.setItem("musicData", JSON.stringify(cacheData));
      }

    // 清除当前播放列表并添加新的歌曲
    naokuo_ap.list.clear();
    naokuo_ap.list.add(songs);

    anzhiyu.changeMusicBg(false);
  },

};

const naokuo_ap = new APlayer({
  container: document.querySelector('#music-container'),
  mini: false,
  autoplay: false,
  theme: 'var(--anzhiyu-main)',
  loop: 'all',
  order: 'list',
  preload: 'auto',
  volume: 0.7,
  mutex: true,
  listFolded: false,
  listMaxHeight: 'calc(100vh - 169px)!important',
  lrcType: 3,
  audio: []
});

const NaoKuo = {
  naoDarkButton: function (elementId, childSelector) {
    const willChangeMode = document.documentElement;
    const element = document.getElementById(elementId);
    if (element && childSelector) {
      const childElement = element.querySelector(childSelector);
      childElement && childElement.addEventListener("click", () => {
        const isMode = willChangeMode.getAttribute("data-theme") === "dark" ? "light" : "dark";
        willChangeMode.setAttribute("data-theme", isMode);
        saveToLocal.set('theme', isMode, 0.5)
      });
    }
  }
}