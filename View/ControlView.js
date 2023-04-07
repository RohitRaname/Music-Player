"use strict";

import {
  findEl,
  closest,
  removeClass,
  addClass,
  contains,
  toggleClass,
  removeAllActiveElClassInArr,
  setActiveElInArr,
} from "../utils/_domFunction.js";
import { formatTime } from "../utils/_helper.js";
import ParentView from "./ParentView.js";
import PlaylistSongView from "./playlistSongs.js";

class ControlView extends ParentView {
  _sectionOverview = findEl("section-overview");
  _currentSectionEl;
  _body = document.querySelector("body");
  _parent = findEl("section-control");
  _subParent = findEl("control");

  _audio = findEl("audio");
  _imgEl = findEl("curMusic__img");
  _titleEl = findEl("curMusic__heading");
  _artistEl = findEl("curMusic__artist");
  _curTimeEl = findEl("progressBar__time--curTime");
  _durationEl = findEl("progressBar__time--duration");
  _progressBarMainContainer = findEl("progressBar--main");
  _progressBarVolumeContainer = findEl("progressBar--volume");
  _mainProgressBar = findEl("progressBar__line--main");

  _controlFullImg = findEl("control--fullView-img");

  // settings appear when clicking setting btn
  _controlSetting = findEl("control__settings");
  _controlSettingOptionList = [
    ...document.querySelectorAll(".control__setting"),
  ];
  _controlSettingOptionListItemOptions = [
    ...document.querySelectorAll(".control__setting-option"),
  ];

  _playBtn = this._parent.querySelector(".music__play-btn");
  _volumeBtn = findEl('control__btn[data-action="volume"]');
  _SettingBtn = findEl('control__btn[data-action="setting"]');
  _shuffleBtn = findEl('control__btn[data-action="shuffle"]');
  _nextBtn = this._parent.querySelector('.control__btn[data-action="next"]');
  _prevBtn = this._parent.querySelector('.control__btn[data-action="prev"]');

  _playBtnIcon = this._playBtn.querySelector("i");

  // to set duration only when meta data is ready and then play song

  // not important did to show these will be install inside the state obj
  _currentTime;
  _duration;
  _volume;
  _speed;

  constructor() {
    super();
    this._setDuration();
    this._updateCurTimeAndProgressBar();
    this._updateProgressBarByClicking();
    this._toggleActiveElWhenFocusChange();
    this._controlSettingHoverEvent();
  }

  _toggleActiveElWhenFocusChange() {
    this._body.addEventListener("click", (e) => {
      const target = e.target;
      if (!closest(target, "control__btn--active[data-action='volume']")) {
        this._volumeBtn.classList.remove("control__btn--active");
      }
      if (closest(target, "progressBar__container--volume")) {
        this._volumeBtn.classList.add("control__btn--active");
      }

      if (closest(target, "control__setting[data-action='speed'] ")) {
        this._SettingBtn.classList.add("control__btn--active");
      }

      if (
        !closest(target, "control__settings") &&
        !closest(target, 'control__btn[data-action="setting"]')
      ) {
        removeClass(this._SettingBtn, "control__btn--active");
        removeAllActiveElClassInArr(this._controlSettingOptionList);
      }
    });
  }

  // controller just get the data here

  // we get the duration after audio metadata is laode
  _setDuration() {
    this._audio.addEventListener("loadedmetadata", () => {
      /////////////////////////////////////////////
      this._duration = Number(this._audio.duration);
      this._durationEl.textContent = formatTime(this._audio.duration);
    });
  }

  // Update time and progressbar movement
  _updateCurTimeAndProgressBar() {
    this._audio.addEventListener("timeupdate", (e) => {
      this._curTimeEl.textContent = formatTime(this._audio.currentTime);

      this._currentTime = +this._audio.currentTime;

      const percent = Math.floor(
        (Number(this._audio.currentTime) / Number(this._audio.duration)) * 100
      );

      this._mainProgressBar.style.width = `${percent}%`;
    });
  }

  _updateProgressBarByClicking() {
    [this._progressBarMainContainer, this._progressBarVolumeContainer].forEach(
      (mov) =>
        mov.addEventListener("click", (e) => {
          const target = e.target;
          const { belongTo } = mov.dataset;
          const progressWidth = +mov.offsetWidth;

          // respect to target
          const clickWidthFromStart = Number(e.offsetX);
          const percent = Math.round(
            (clickWidthFromStart / progressWidth) * 100
          );

          mov.querySelector(".progressBar__line").style.width = `${percent}%`;

          // update music settings
          if (belongTo === "main") {
            this._currentTime = Math.floor((percent / 100) * this._duration);
            this._audio.currentTime = this._currentTime;
          }

          if (belongTo === "volume") {
            this._volume = (percent / 100) * 1;
            this._volume = this._volume.toFixed(2);

            this._audio.volume = this._volume;
          }
        })
    );
  }

  autoPlayNextSong(handle) {
    this._audio.addEventListener("ended", function () {
      handle("ended");
    });
  }

  // functionality
  playSong() {
    this._audio.play();
    this._playBtn.dataset.action === "pause";
    this._playBtnIcon.classList.replace("fa-play", "fa-pause");
  }

  pauseSong() {
    this._audio.pause();
    // this._currentTime = this._audio.currentTime;
  }

  // next song -> loadsong

  // To set song El from arr

  // load song (play song)

  setAudioOptions(songOptions) {
    if (!songOptions) return;

    if (songOptions.currentTime) this._audio.currentTime = 0;
    if (songOptions.playBtn) {
      this._playBtn.dataset.action === "pause";
      this._playBtnIcon.classList.replace("fa-play", "fa-pause");
    }

    if (songOptions.toggle === "shuffle")
      removeClass(this._shuffleBtn, "control__btn--active");
    if (songOptions.setShuffle === "on")
      addClass(this._shuffleBtn, "control__btn--active");
  }

  loadSong(song, songOptions) {
    // set basic el

    this._audio.src = `./music/${song.music}`;
    this._imgEl.src = `./img/${song.img}`;
    this._titleEl.textContent = song.name;
    this._artistEl.textContent = song.author;
    this._controlFullImg.src = `./img/${song.img}`;

    this.setAudioOptions(songOptions);
  }

  // addHandlerControl(handle) ************************************

  _checkIfSectionIsPlaylistSongs() {
    const currentSection = this.getCurrentSection();
    if (contains(currentSection, "section-playlistSong")) return true;
    return false;
  }

  // check if current Section is playlist then get Current Song Index
  _ifSectionPlaylistExistThenGetCurrentSongIndex() {
    const isPlaylistSection = this._checkIfSectionIsPlaylistSongs();
    let playlistSongIndex;
    if (!isPlaylistSection) return false;

    playlistSongIndex = PlaylistSongView.getActiveItemIndex();
    playlistSongIndex = Number(playlistSongIndex);
    return playlistSongIndex;
  }

  _handlePlayNextSong(handle) {
    const playlistIndex = this._ifSectionPlaylistExistThenGetCurrentSongIndex();

    if (!playlistIndex) return handle("next");

    return handle("next", null, {}, playlistIndex);
  }

  _handlePlayPreviousSong(handle) {
    const playlistIndex = this._ifSectionPlaylistExistThenGetCurrentSongIndex();

    if (!playlistIndex) return handle("prev");

    return handle("prev", null, {}, playlistIndex);
  }

  disableSongChangeBtns(type) {
    console.log(type)
    console.log(this._prevBtn,this._nextBtn)
    if (type === "both") {
      this._prevBtn.disabled = true;
      return (this._nextBtn.disabled = true);
    }
    if (type === "prev") return (this._prevBtn.disabled = true);
    if (type === "next") return (this._nextBtn.disabled = true);
  }

  enableSongChangeBtns(type) {
    if (type === "both") {
      this._prevBtn.disabled = false;
      return (this._nextBtn.disabled = false);
    }
    if (type === "prev") return (this._prevBtn.disabled = tfalseue);
    if (type === "next") return (this._nextBtn.disabled = false);
  }

  addHandlerControl(handle) {
    this._parent.addEventListener("click", (e) => {
      let target = e.target;

      const btn = target.closest(".control__btn");
      let action;
      if (btn) action = btn.dataset.action;

      // BUTTONS *******************************************
      if (action === "next") this._handlePlayNextSong(handle);
      if (action === "prev") this._handlePlayPreviousSong(handle);

      if (action === "pause") {
        this._playBtnIcon.classList.replace("fa-pause", "fa-play");
        btn.dataset.action = "play";

        return handle("pause", {
          currentTime: this._audio.currentTime,
        });
      }
      if (action === "play") {
        btn.dataset.action = "pause";
        this._playBtnIcon.classList.replace("fa-play", "fa-pause");
        return handle("play");
      }

      if (action === "volume") {
        btn.classList.toggle("control__btn--active");

        return handle("volume", { volume: this._audio.volume });
      }

      if (action === "expand") {
        this._parent
          .querySelector(".control--fullView-img ")
          .classList.toggle("hidden");
        this._subParent.classList.toggle("control--fullView");
        return handle("fullScreen", { fullScreen: true });
      }

      if (action === "reset") handle("reset");

      if (action === "shuffle") {
        toggleClass(btn, "control__btn--active");

        if (contains(btn, "control__btn--active"))
          handle("shuffle", null, true);
        else handle("shuffle", null, false);
      }

      if (action === "setting") {
        toggleClass(btn, "control__btn--active");
      }

      // ****************************************************************

      // Other than btn
      if (closest(target, "control__left")) {
        this._parent
          .querySelector(".control--fullView-img ")
          .classList.toggle("hidden");

        this._subParent.classList.toggle("control--fullView");
      }

      //  To increase speed and fast forward or backward
      if (closest(target, "control__setting")) {
        const { action } = closest(target, "control__setting").dataset;

        if (!action) return;

        if (action === "speed") {
          const selectedControlSettingOption = closest(
            target,
            "control__setting-option"
          );

          if (!selectedControlSettingOption) return;
          // getting value from selected option in options
          const { value } = selectedControlSettingOption.dataset;

          // Set it active the current option
          setActiveElInArr(
            this._controlSettingOptionListItemOptions,
            selectedControlSettingOption,
            "nav__item--active"
          );

          this._speed = +value;
          this._audio.playbackRate = this._speed;

          return handle(action, { speed: this._audio.playbackRate });
        }

        if (action === "skip-forward") {
          this._audio.currentTime += 10;
          this._currentTime = this._audio.currentTime;
        }
        if (action === "skip-backward") {
          this._audio.currentTime -= 10;
          this._currentTime = this._audio.currentTime;
        }
      }

      // Pass to controller
    });
  }

  _controlSettingHoverEvent() {
    // handle is defined in this scope

    this._controlSetting.addEventListener("mouseover", (e) => {
      let target = e.target;

      const option = closest(target, "control__setting");

      if (option) {
        // Toggle speed options
        const { action } = option.dataset;

        if (action === "speed") {
          return addClass(option, "control__setting--active");
        }

        if (action !== "speed") {
          removeAllActiveElClassInArr(
            this._controlSettingOptionList,
            "control__setting--active"
          );
        }
      }
    });
  }
}

export default new ControlView();
