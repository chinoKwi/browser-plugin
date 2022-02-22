let time = ""; // 时间
let time_type = ""; // AM | PM
let date = ""; // 日期
let week = ""; // 周几

function run_time() {
  const reuslt = get_now_time();
  $(".time").text(reuslt.time);
  $(".time_type").text(reuslt.time_type);
  $(".date").text(`${reuslt.date} 周${reuslt.week}`);

  setInterval(() => {
    const now_time_date = get_now_time();

    if (now_time_date.time != time) {
      // 替换时间
      $(".time").text(now_time_date.time);
    }
    if (now_time_date.time_type != time_type) {
      // 替换AM | PM
      time_type = now_time_date.time_type;
      $(".time_type").text(time_type);
    }

    if (now_time_date.date != date) {
      // 替换日期
      date = now_time_date.date;
      week = now_time_date.week;
      $(".date").text(`${date} 周${week}`);
    }
  }, 1000);
}

// 获取当前时间
function get_now_time() {
  const first_date_time = dayjs().format("YYYY年MM月DD日 hh:mm:ss d A");
  const first_date_time_arr = first_date_time.split(" ");
  let time = first_date_time_arr[1];
  let time_type = first_date_time_arr[3];
  let date = first_date_time_arr[0];
  let week = first_date_time_arr[2];

  switch (parseInt(week)) {
    case 1:
      week = "一";
      break;
    case 2:
      week = "二";
      break;
    case 3:
      week = "三";
      break;
    case 4:
      week = "四";
      break;
    case 5:
      week = "五";
      break;
    case 6:
      week = "六";
      break;
    case 0:
      week = "日";
      break;
  }

  return { time, time_type, date, week };
}

// 更换壁纸
function change_bg() {
  axios({
    url: "https://rabbit-api.com?appid=620c80aba97e4ca75d5adae8&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDliOTZjZmIxM2EyNzFkNzAzNDBkYmYiLCJpYXQiOjE2NDU1MTg4NjZ9.F9fydk80P06WIRkKh-2GKWlQ47x3HX2pVbezRGVYY9s",
  }).then((result) => {
    if (result.meta.status != 200) return;
    $(".bg_image").css("background-image", `url(${result.data.url})`);
  });
}

// 日期
run_time();
change_bg();
