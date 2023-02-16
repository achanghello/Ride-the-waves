<template>
  <div>
    <h1>动态排名</h1>
    <svg id="svg" width="1000px" height="800px">
      <g>
        <g
          v-for="i in Math.floor(max / 100)"
          :key="i"
          class="labelg"
          :transform="`translate(${((i * 100) / max) * 750 + 50},0)`"
        >
          <transition name="h1">
            <g v-show="i % Math.floor(max / 750) == 0">
              <line stroke="#C0C0BB" y2="600"></line>
              <text y="600">{{ i * 100 }}</text>
            </g>
          </transition>
        </g>
      </g>
      <!-- <line stroke="#C0C0BB" x1="100" y1="100" x2="200" y2="200"></line> -->
      <g
        v-for="(item, index) in departments"
        :key="item.department"
        class="labelg"
        :transform="`translate(0,${item.s * 100})`"
      >
        <rect
          class="rect"
          :width="(item.value / max) * 750"
          style="fill: rgb(0, 0, 255); stroke-width: 1; stroke: rgb(0, 0, 0)"
        />
        <text :x="0" :y="30" class="ename">{{ item.department }}</text>
        <countTo
          :start="item.oldvalue"
          :end="item.value"
          :duration="1000"
          :y="(item.value / max) * 750 + 50"
        ></countTo>
      </g>
    </svg>
    <p>
      {{ departments[0].value }}
    </p>

    <button @click="ha">40</button>
  </div>
</template>
      
    <script>
// 引入组件
import CountTo from "./countto.vue";
export default {
  name: "pagethree",
  data() {
    return {
      departments: [
        { department: "部门1", value: 250, s: 0, oldvalue: 0 },
        { department: "部门2", value: 470, s: 1, oldvalue: 0 },
        { department: "部门3", value: 200, s: 2, oldvalue: 0 },
        { department: "部门4", value: 180, s: 3, oldvalue: 0 },
        { department: "部门5", value: 100, s: 4, oldvalue: 0 },
        { department: "部门6", value: 340, s: 5, oldvalue: 0 },
      ],
      max: 750,
    };
  },
  mounted() {
    setInterval(() => {
      let arr = JSON.parse(JSON.stringify(this.departments));
      arr.sort((x, y) => y.value - x.value);
      if (arr[0].value > this.max) {
        this.max = arr[0].value;
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.departments.length; j++) {
          if (arr[i].department == this.departments[j].department) {
            this.departments[j].s = i;
          }
        }
      }
      this.departments.forEach((element) => {
        element.oldvalue = element.value;
        element.value += Math.random() * 50;
      });
    }, 1000);
  },
  methods: {
    ha() {
      document.getElementById("sb").classList.remove("one");
      document.getElementById("sb").classList.add("five");
      document.getElementById("sb").setAttribute("y", 150);
      document.getElementById("sb").setAttribute("height", 400);
    },
  },
  components: {
    // 注册组件
    CountTo,
  },
};
</script>
    
<style lang="scss" scoped>
.rect {
    transition: all 1s linear;
    // width: 53px;
    // y: 30;
    height: 53px;
    x: 50;
  }
  .labelg {
    transition: all 1s linear;
  }
  
  .ename {
    font-size: 15pt;
    font-family: "Fira Code", "Source Han Sans CN";
    font-weight: bold;
    fill: rgb(148, 103, 189);
  }
  /*.label {
    transition: all 1s linear;
    width: 53px;
    height: 30px;
    display: block;
    position: absolute;
  }*/
  
  /* 1.过渡动画 */
  @keyframes axisX {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0px);
    }
  }
  
  /* 2. 过渡类名 */
  /* 开始 */
  .h1-enter-active {
    animation: axisX 1s;
  }
  /* 结束 */
  .h1-leave-active {
    animation: axisX 1s reverse;
  }
</style>
      
     