function formatTime(time) {
  time = Math.floor(time);

  let minutes, seconds;

  if (time < 60) {
    if (time < 10) seconds = `0${time}`;
    else seconds = time;

    minutes = "00";
  }

  if (time > 60) {
    minutes = Math.floor(time / 60);

    seconds = time % 60;

    if (seconds < 10) seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

export { formatTime };
