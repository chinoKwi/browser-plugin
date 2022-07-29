<template>
  <!-- 时间部分 -->
  <div class="show_time_box">
    <!-- 时 -->
    <div class="time_warp">
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number hour_1">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number hour_2">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
    </div>
    <span>:</span>
    <!-- 分 -->
    <div class="time_warp">
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number min_1">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number min_2">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
    </div>
    <span>:</span>
    <!-- 秒 -->
    <div class="time_warp">
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number sec_1">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
      <!-- 遮罩部分 -->
      <div>
        <!-- 时间滚动部分 -->
        <div class="scroll_number sec_2">
          <span>9</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref } from "vue";

// 移动记录
const remove_log = {
  data: [],
};

// 当前时间
const nowTime = ref({
  year: "0000", // 年
  month: "00", // 月
  date: "00", // 日
  hour: "00", // 时
  minute: "00", // 分
  second: "00", // 秒
});

const hour_1 = ref("translateY(0px)");
const hour_2 = ref("translateY(0px)");
const min_1 = ref("translateY(0px)");
const min_2 = ref("translateY(0px)");
const sec_1 = ref("translateY(0px)");
const sec_2 = ref("translateY(0px)");
const scroll_number_animation = ref("all 0.3s");

// 获取当前时间
const getNowTime = () => {
  const time = dayjs();
  // 处理日期一位数问题
  const time_arr = time.format("YYYY,MM,DD,HH,mm,ss").split(",");
  nowTime.value.year = String(time_arr[0]);
  nowTime.value.month = String(time_arr[1]);
  nowTime.value.date = String(time_arr[2]);
  nowTime.value.hour = String(time_arr[3]);
  nowTime.value.minute = String(time_arr[4]);
  nowTime.value.second = String(time_arr[5]);
  calcStyle();
};

// 计算样式
const calcStyle = () => {
  // const result = parseRemoveLog();
  // if (!result) return;
  const height = 65;
  const add_height = 65;
  // 计算小时
  const hour = nowTime.value.hour.split("").map((ele) => Number(ele));
  hour_1.value = `translateY(-${hour[0] * height + add_height}px)`;
  hour_2.value = `translateY(-${hour[1] * height + add_height}px)`;

  // 计算分钟
  const min = nowTime.value.minute.split("").map((ele) => Number(ele));
  min_1.value = `translateY(-${min[0] * height + add_height}px)`;
  min_2.value = `translateY(-${min[1] * height + add_height}px)`;
  // 计算秒
  const sec = nowTime.value.second.split("").map((ele) => Number(ele));
  sec_1.value = `translateY(-${sec[0] * height + add_height}px)`;
  sec_2.value = `translateY(-${sec[1] * height + add_height}px)`;
  judgeBoundaryValue();
  setTimeout(() => {
    parseRemoveLog();
  }, 300);
};

// 计算是否需要边界值样式处理
const judgeBoundaryValue = () => {
  // 时内包含9 且 分为59 秒为59
  if (nowTime.value.hour.indexOf("9") !== -1) {
    boundaryStyleDealWith("hour");
  }
  if (nowTime.value.minute.indexOf("9") !== -1) {
    boundaryStyleDealWith("minute");
  }
  if (nowTime.value.second.indexOf("9") !== -1) {
    // 秒内包含9
    boundaryStyleDealWith("second");
  }
};

// 边界值样式处理
const boundaryStyleDealWith = (type) => {
  if (nowTime.value[type] === "59") {
    // 移动秒第一位
    remove_log.data.push({
      type: type, // 类型
      index: 1, // 排序位置
      pos: -65, // 位置
      await: 1, // 等待几次
    });
  }
  // 移动秒第二位
  remove_log.data.push({
    type: type,
    index: 2,
    pos: 0,
    await: 0,
  });
};

// 解析 remove_log
const parseRemoveLog = () => {
  if (!remove_log.data.length) return;
  scroll_number_animation.value = "none";
  remove_log.data.forEach((ele, index) => {
    console.log("ele", ele);
    if (ele.await <= 0) {
      switch (ele.type) {
        case "second":
          if (ele.index === 1) {
            sec_1.value = `translateY(${ele.pos}px)`;
          } else if (ele.index === 2) {
            sec_2.value = `translateY(${ele.pos}px)`;
          }
          break;
        case "minute":
          if (ele.index === 1) {
            min_1.value = `translateY(${ele.pos}px)`;
          } else if (ele.index === 2) {
            min_2.value = `translateY(${ele.pos}px)`;
          }
          break;
        case "hour":
          if (ele.index === 1) {
            hour_1.value = `translateY(${ele.pos}px)`;
          } else if (ele.index === 2) {
            hour_2.value = `translateY(${ele.pos}px)`;
          }
          break;
      }
      remove_log.data.splice(index, 1);
    }
  });
  remove_log.data.map((ele) => ele.await--);
  setTimeout(() => {
    scroll_number_animation.value = "all .3s";
  }, 100);
};
global.getNowTime = getNowTime;
setInterval(() => {
  getNowTime();
}, 1000);
</script>
<style lang="less" scoped>
.show_time_box {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 40px;
  .time_warp {
    display: flex;
    > div {
      width: 40px;
      height: 65px;
      border: 1px solid rebeccapurple;
      text-align: center;
      overflow: hidden;
      .scroll_number {
        width: 40px;
        display: flex;
        flex-direction: column;
        transition: v-bind(scroll_number_animation);
        > span {
          width: 40px;
          height: 65px;
        }
      }
    }
  }
}

.hour_1 {
  transform: v-bind(hour_1);
}

.hour_2 {
  transform: v-bind(hour_2);
}

.min_1 {
  transform: v-bind(min_1);
}

.min_2 {
  transform: v-bind(min_2);
}

.sec_1 {
  transform: v-bind(sec_1);
}

.sec_2 {
  transform: v-bind(sec_2);
}
</style>
