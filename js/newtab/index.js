let time = ""; // 时间
let time_type = ""; // AM | PM
let date = ""; // 日期
let week = ""; // 周几

function run_time() {
  const reuslt = get_now_time();
  $(".time").html(
    `${reuslt.time} <div class="time_type">${reuslt.time_type}</div>`
  );
  // $(".time_type").text(reuslt.time_type);
  $(".date").text(`${reuslt.date} 周${reuslt.week}`);

  setInterval(() => {
    const now_time_date = get_now_time();

    if (now_time_date.time != time) {
      // 替换时间
      $(".time").html(
        `${now_time_date.time}<div class="time_type">${now_time_date.time_type}</div>`
      );
    }
    // if (now_time_date.time_type != time_type) {
    //   // 替换AM | PM
    //   time_type = now_time_date.time_type;
    //   $(".time_type").text(time_type);
    // }

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
// chrome.storage.sync.set({ img_url: "pop" });
function change_bg() {
  let url = "https://rabbit-api.com/";
  chrome.storage.sync.get(
    {
      img_url: "https://rabbit-api.com/",
    },
    (items) => {
      url = items.img_url;
      axios({
        url: url,
      }).then((result) => {
        if (result.meta.status != 200) return;
        $(".bg_image").css("background-image", `url(${result.data.url})`);
      });
    }
  );
}

let hover_flag = false; // 记录鼠标是否在搜索结果上
$(".search_result").on("mouseenter", function () {
  hover_flag = true;
});
$(".search_result").on("mouseleave", function () {
  hover_flag = false;
});
// 搜索状态
$(".search_input").on("focus", search_input_focus);
$(".search_input").on("blur", search_input_blur);

// 聚焦
function search_input_focus() {
  $(".search").css("width", "500px");
  $(".main").css("margin-top", "-30%");
  $(".bg_image").css("filter", "blur(5px)");
  $(".bg_image").css("transform", "scale(1.2)");
  $(".search").css("background-color", "rgba(225, 225, 225, 1)");
  set_search_result(search_result_log);
}
// 失焦
function search_input_blur() {
  if (hover_flag) return;
  $(".search").css("width", "330px");
  $(".main").css("margin-top", "-10%");
  $(".bg_image").css("filter", "blur(0px)");
  $(".bg_image").css("transform", "scale(1)");
  $(".search").css("background-color", "rgba(225, 225, 225, .8)");
  set_search_result();
}

let search_timer;
let search_result_log; // 记录搜索结果
$(".search_input").on("input", function () {
  if (search_timer) clearTimeout(search_timer);
  const value = $(this).val();
  search_timer = setTimeout(() => {
    axios({
      url: `https://www.baidu.com/sugrec?&json=1&prod=pc&from=pc_web&wd=${value}`,
    }).then((result) => {
      set_search_result(result?.g);
      search_result_log = result?.g;
    });
  }, 500);
});

$(".search_result").bind("click", "div", function (e) {
  $(e.target).css("background-color", "rgb(135, 206, 250)");
  setTimeout(() => {
    $(e.target).css("background-color", "");
    hover_flag = false;
    search_input_blur();
  }, 500);
  const val = $(e.target).text();
  if ($("#tiao")) $("#tiao").remove();
  $("body").append(
    `<a id="tiao" href="https://www.baidu.com/s?wd=${val}"></a>`
  );
  console.log($("#tiao")[0].click());
});

// 写入搜索结果
function set_search_result(data) {
  if (!data || !data.length) {
    // $(".search_result").animate({ height: "0px" }, 300, "swing");
    $(".search_result").css({ height: "0px" });
    $(".cover").css("background-color", "rgba(0, 0, 0, 0)");
    return;
  }
  let html = ``;
  data.forEach((ele) => {
    html += `<div class="result_item">${ele.q}</div>`;
  });
  $(".cover").css("background-color", "rgba(0, 0, 0, .3)");
  $(".search_result").html(html);
  $(".search_result").css("height", `${data.length * 30}px`);
}

// 日期
run_time();
change_bg();
