/**
 * 1. Render songs => ok / Scroll top => ok
 * 2. Play / Pause / Seek => ok
 * 3. CD rotate => ok
 * 4. Next / Previous => ok
 * 5. Show / Hide Playlist =>
 * 6. Random => ok
 * 7. Next / Repeat when ended => ok
 * 8. Active song => ok
 * 9. Scroll active song into  =>ok
 * 10. Play song when click => ok
 * 11. Volumn =>
 * 12. Change tooltip =>
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "YASUO";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn.btn-toggle-play");
const progress = $(".progress-bar");
const songDuration = $(".duration-time");
const songCurrentTime = $(".current-time");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Little do you know",
      author: "Alex & Sierra",
      image: "./assets/img/Suzy4.jpg",
      path: "./assets/music/Little_do_you_know_Alex_&_Sierra.mp3",
    },
    {
      name: "When night falls",
      author: "Eddi Kim",
      image: "./assets/img/Suzy2.jpg",
      path: "./assets/music/When_night_falls_Eddi_Kim.mp3",
    },
    {
      name: "Too late",
      author: "Addie Nicole",
      image: "./assets/img/TooLate.jfif",
      path: "./assets/music/Too_Late_Addie Nicole.mp3",
    },
    {
      name: "Versace",
      author: "The Same Persons",
      image: "./assets/img/versace.jfif",
      path: "./assets/music/Versace_The_Same_Persons.mp3",
    },
    {
      name: "Set fire to the rain",
      author: "Rain Adele ft. Vahn Remix",
      image: "./assets/img/setFireToTheRain.jfif",
      path: "./assets/music/Set_Fire_To_The_Rain_Adele_x_Vahn_Remix.mp3",
    },
    {
      name: "Kiss Remix",
      author: "Hung Bobi Remix",
      image: "./assets/img/Kiss.jfif",
      path: "./assets/music/Kiss_Hung_Bobi_Remix.mp3",
    },
    {
      name: "Trap Queen Remix",
      author: "Adriana Gomez",
      image: "./assets/img/trapQueen.jfif",
      path: "./assets/music/Trap_Queen_Remix_Adriana_Gomez.mp3",
    },
    {
      name: "Devil From Heaven",
      author: "TVT Remix",
      image: "./assets/img/Devil.jpg",
      path: "./assets/music/Ac_ma_den_tu_thien_duong_TVT_Remix.mp3",
    },
    {
      name: "Cheap Thrills",
      author: "Sia",
      image: "./assets/img/CheapThrill.jfif",
      path: "./assets/music/Cheap_Thrills_Sia.mp3",
    },
    {
      name: "Let's marriage",
      author: "Masew ft. Masiu",
      image: "./assets/img/CuoiThoi.jpg",
      path: "./assets/music/Cuoi_Thoi_Masew_x_Masiu.mp3",
    },
    {
      name: "Diamond Ver 2",
      author: "VQ Remix",
      image: "./assets/img/diamond.jfif",
      path: "./assets/music/Diamond_Ver2_VQ_Remix.mp3",
    },
    {
      name: "Everytime we touch",
      author: "Cascada",
      image: "./assets/img/Everytimewetouch.jfif",
      path: "./assets/music/Everytime_we_touch.mp3",
    },
    {
      name: "How to love",
      author: "Cash Cash ft. Sofia Reyes",
      image: "./assets/img/howtolove.jfif",
      path: "./assets/music/How_to_love_Cash_Cash_ft_Sofia_Reyes.mp3",
    },
    {
      name: "I need your love",
      author: "Madilyn Bailey",
      image: "./assets/img/IneedYourLove.jfif",
      path: "./assets/music/I_need_your_love_Madilyn_Bailey.mp3",
    },
    {
      name: "Larg Remix",
      author: "Elgit Doda",
      image: "./assets/img/larg.jfif",
      path: "./assets/music/Larg_Elgit_Doda.mp3",
    },
    {
      name: "Love me like you do",
      author: "Ellie Goulding",
      image: "./assets/img/LoveMeLikeYouDo.jfif",
      path: "./assets/music/Love_me_like_you_do_Ellie_Goulding.mp3",
    },
    {
      name: "Love story",
      author: "Taylor Swift",
      image: "./assets/img/Taylor.jpg",
      path: "./assets/music/Love_story_Taylor_Swift.mp3",
    },
    {
      name: "Love the way you lie",
      author: "Skylar Grey",
      image: "./assets/img/Suzy3.jpg",
      path: "./assets/music/Love_the_way_you_like_Skylar_Grey.mp3",
    },
    {
      name: "Nevada",
      author: "Vicetone ft. Cozi Zuehlsdorff",
      image: "./assets/img/Nevada.jfif",
      path: "./assets/music/Nevada_Vicetone_feat_Cozi_Zuehlsdorff.mp3",
    },
    {
      name: "Payphone",
      author: "Alex G",
      image: "./assets/img/payphone.jfif",
      path: "./assets/music/Payphone_Alex_G.mp3",
    },
  ],
  // H??m render list danh s??ch b??i h??t
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.author}</p>
            </div>
            <div class="music-waves ">  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>
                </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `;
    });
    playList.innerHTML = htmls.join("");
  },
  //H??m x??? l?? active b??i h??t
  activeSong: function () {
    const songs = $$(".song");
    const musicWaves = $$(".music-waves");
    const _this = this;

    songs.forEach((song, index) => {
      if (index === _this.currentIndex) {
        song.classList.add("active");
        musicWaves[index].classList.add("active");
        setTimeout(() => {
          song.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }, 300);
      } else {
        song.classList.remove("active");
        musicWaves[index].classList.remove("active");
      }
    });
  },
  // H??m ?????nh ngh??a ph????ng th???c cho object
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  //
  timeFormat(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().slice(14, 19);
  },
  // H??m x??? l?? c??c s??? ki???n
  handleEvent: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;

    // X??? l?? quay / d???ng CD
    const cdThumbAmimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        interations: Infinity,
      }
    );
    cdThumbAmimate.pause();
    // X??? l?? ph??ng to / thu nh??? CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCDWidth = cdWidth - scrollTop;
      cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
      cd.style.opacity = newCDWidth / cdWidth;
    };
    //X??? l?? khi click v??o playBtn
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Khi song ???????c play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAmimate.play();
    };
    // Khi song b??? pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAmimate.pause();
    };
    // Khi ti???n ????? b??i h??t thay ?????i
    audio.ontimeupdate = function () {
      songCurrentTime.textContent = _this.timeFormat(this.currentTime);
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // Khi tua b??i h??t
    progress.onchange = function (e) {
      const seekTime = Math.floor((audio.duration / 100) * e.target.value);
      audio.currentTime = seekTime;
    };
    // Khi click chuy???n sang b??i h??t ti???p theo
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.activeSong();
    };
    // Khi click chuy???n sang b??i h??t tr?????c ????
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.activeSong();
    };
    // X??? l?? khi b???t / t???t random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      this.classList.toggle("active", _this.isRandom);
      _this.setConfig("isRandom", _this.isRandom);
    };
    // X??? l?? b???t / t???t repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      this.classList.toggle("active", _this.isRepeat);
      _this.setConfig("isRepeat", _this.isRepeat);
    };
    // X??? l?? random / repeat khi b??i h??t k???t th??c
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
      // if (_this.isRandom) {
      //   _this.randomSong();
      // } else {
      //   _this.nextSong();
      // }
      // audio.play();
    };
    // ???n space ????? Play / Pause Music
    document.onkeyup = function (e) {
      if (e.which === 32) {
        playBtn.click();
      }
    };
    // Khi click ch???n b??i h??t tr??n list
    playList.onclick = function (e) {
      const song = e.target.closest(".song:not(.active)");
      if (song || e.target.closest(".option")) {
        if (song) {
          _this.currentIndex = Number(song.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
          _this.activeSong();
        }
      }
    };
  },
  // *
  timeFormat(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().slice(14, 19);
  },
  // Render load b??i h??t
  loadCurrentSong: function () {
    const _this = this;
    heading.textContent = this.currentSong.name;
    cdThumb.style.background = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    // X??? l?? l???y ti???n tr??nh v?? th???i l?????ng b??i h??t tr?????c khi ph??t
    audio.onloadedmetadata = function () {
      songCurrentTime.textContent = _this.timeFormat(
        this.currentTime.toFixed(2)
      );
      songDuration.textContent = _this.timeFormat(this.duration.toFixed(2));
    };
  },
  // H??m load config t??? localStorage
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  // H??m prev b??i
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  // H??m next b??i
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  // H??m render
  randomSong: function () {
    let newCurrentIndex;
    do {
      newCurrentIndex = Math.floor(Math.random() * this.songs.length);
    } while (newCurrentIndex === this.currentIndex);
    this.currentIndex = newCurrentIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // T???i c???u h??nh
    this.loadConfig();
    // ?????nh ngh??a ph????ng th???c cho object
    this.defineProperties();
    // L???ng nghe / x??? l?? c??c s??? ki???n (DOM events)
    this.handleEvent();
    // T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng
    this.loadCurrentSong();
    // Render danh s??ch b??i h??t
    this.render();

    // T???i c???u h??nh cho btn
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};
// ***
app.start();
