<template>
    <div class="pageone">
      <div class="title">
        <h1>关于疫情的可视化作品</h1>
      </div>
      <div class="content">
        <div class="content-col no-map">
          <Bar></Bar>
          <Pie></Pie>
          <div class="logo-out" @click="hahah">
            <div class="logo" :class="{fan:!flag, zheng:flag}">

            </div>
            <div class="test" :class="{fan:flag, zheng:!flag}">
              <h3>乘风破浪打工队</h3>
              <p>一群志同道合的人聚在一起，做一件有意义的事！！！</p>
            </div>
          </div>
          
        </div>
        <div class="content-col map">
          <Mapc @showdata="showdata"></Mapc>
        </div>
        <div class="content-col no-map right">
          <Linec></Linec>
          <Curve></Curve>
          <Show :showlist="showlist"></Show>
        </div>
      </div>
    </div>
  </template>
    <script>
    import Bar from './bar.vue'
    import Pie from './pie.vue'
    import Linec from './line.vue'
    import Curve from './curve.vue'
    import Mapc from './map.vue'
    import Show from './show.vue'

    import { RECORDS } from "./china_provincedata.json";
  export default {
    name: "pagefour",
    data(){
      return {
        flag: true,
        showlist:{
          confirmedCount:0,//累计确诊
          confirmedIncr:0,//新增确诊
          curedCount:0,//累计治愈
          curedIncr:0,//新增治愈
          currentConfirmedCount:0,//现存确诊
          currentConfirmedIncr:0,//新增现存确诊
          deadCount:0,//累计死亡
          deadIncr:0,//新增死亡
          suspectedCount:0,//累计疑似
          suspectedCountIncr:0,//新增疑似
          initdate: "20200701",
        },
        datas:[]
      }
    },
    mounted(){
      this.datas = RECORDS.filter((item) => item.dateId == "20200701")
    },
    methods:{
      // 翻转
      hahah(){
        this.flag=!this.flag
      },
      showdata(name){
        let arr = this.datas.filter((item) => item.provinceName == name)
        this.showlist = arr[0]
      }
    },
    components: {
      Bar,
      Pie,
      Linec,
      Curve,
      Mapc,
      Show
    }
  };
  </script>
    
  <style lang="scss" scoped>
  .pageone {
    background-color: #06164a;
    height: 100vh;
    // #0c1a46;
    // 253260
    .title {
    height: 10vh;
    width: 100%;
    background-color: #2b3a6e;
    color: white;
    line-height: 10vh;
    text-align: center;
    font-size: 25px;
    h1{
      margin:0;
    }
  }
  .content {
    height: 90vh;
    width: 100%;
    // background-color: green;

    display: flex;

    .content-col {
      // flex: 2;
      // background-color: pink;
      .logo-out{
        width: 487px;
        height: 240.6px;
        position: relative; 
        .logo {
        position: absolute;
        width: 487px;
        height: 240.6px;
        background: url('../../assets/lo.jpg') no-repeat;
        background-size: 100% 100%;
        /* 设置为3d盒子 */
        // transform-style: preserve-3d;
        // perspective: 1000px;
        backface-visibility: hidden;
        
      }
      }
      
    }
    .right {
      // display:flex;
      // flex-direction: column;
    }
    .map {
      flex: 3;
    }
    .no-map {
      flex: 2;
    }
  }
  }
  /* 1.过渡动画 */
@keyframes rotation {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(180deg);
    }
}

@keyframes rotation-r {
  0% {
      transform: rotateY(180deg);
  }

  100% {
      transform: rotateY(0);
  }
}
.test{
  position: absolute;
  color: white;
  width: 487px;
  height: 240.6px;
  background-color: #0c1a46;      
  backface-visibility: hidden;
  text-align: center;
}
.zheng{
  transform: rotateY(0deg);
  transition: transform 1.2s;
}
.fan{
  transform: rotateY(180deg);
  transition: transform 1.2s;
}
/* 2. 过渡类名 */
/* 开始 */
// .rotation-enter-active {
//   animation: axisX 1s;
//}
/* 结束 */
//.rotation-leave-active {
//  animation: axisX 1s reverse;
//}
  </style>
      
     