<template>
  <div>
    <div class="bt">
      <div class="bti" :class="{'active':currentshow==='confirmedCount'}" @click="changecurrentshow('confirmedCount')" >累计确诊</div>
      <div class="bti" :class="{'active':currentshow==='curedCount'}" @click="changecurrentshow('curedCount')">累计治愈</div>
      <div class="bti" :class="{'active':currentshow==='deadCount'}" @click="changecurrentshow('deadCount')">累计死亡</div>
    </div>
    <svg id="svg" width="1250px" height="611px">
      <Bgscale :maxvalue="maxvalue" ref="bgscale"></Bgscale>
      <template v-for="(item, index) in departments">
        <Baritem
          :jkey="item.provinceName"
          :color="item.color"
          :value="item[currentshow]"
          :oldvalue="item.oldvalue"
          :th="sort.indexOf(index)"
          :maxvalue="maxvalue"
        ></Baritem>
      </template>
      <g>
        <text :x="730" :y="550" class="date">{{ initdate.slice(0,4) }}-{{ initdate.slice(4,6) }}-{{ initdate.slice(-2) }}</text>
      </g>
    </svg>
  </div>
</template>
        
      <script>
import { RECORDS } from "./china_provincedata.json";
import Baritem from "./bar.vue";
import Bgscale from "./bgscale.vue"
export default {
  name: "pagethree",
  data() {
    return {
      departments: [],
      initdate: "20200129",
      timer: null,
      sort: [],
      maxvalue: 600,
      currentshow:"confirmedCount"
    };
  },
  mounted() {
    this.Init()
  },
  components: {
    Baritem,
    Bgscale
  },
  methods:{
    Init(){
      this.timer = setInterval(() => {
      this.departments = RECORDS.filter((item) => item.dateId == this.initdate);
      // console.log(this.departments);
      const {currentshow} = this
      let colors = ["purple", "orange", "red", "green", "blue", "brown"];
      for (let i = 0; i < this.departments.length; i++) {
        this.departments[i].oldvalue = 0;
        this.departments[i][currentshow] = Number(
          this.departments[i][currentshow]
        );
        this.departments[i].color = colors[i % 6];
      }
      this.sort = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,3,31,32,33]
      let hahah = this.departmentnum()
      this.dealdepart(hahah,0,33)
      if(hahah[0]>this.maxvalue){
        this.maxvalue = hahah[0]
      }
      this.datechange();
    }, 1000);
    },
    datechange(){
      const { initdate } = this
      const enddate = initdate.slice(-2)
      // console.log("日子-",initdate)
      switch(Number(initdate[5])) {
        case 1:
          // 执行第一个代码块
          // console.log("一月")
          if(enddate=="31"){
            this.initdate = "20200201"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        case 2:
          // 执行第二个代码块
          // console.log("二月")
          if(enddate=="29"){
            this.initdate = "20200301"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        case 3:
          // 执行第三个代码块
          // console.log("三月")
          if(enddate=="31"){
            this.initdate = "20200401"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        case 4:
          // console.log("四月")
          if(enddate=="30"){
            this.initdate = "20200501"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        case 5:
          // console.log("五月")
          if(enddate=="31"){
            this.initdate = "20200601"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        case 6:
          // console.log("六月")
          if(enddate=="30"){
            this.initdate = "20200701"
          }else{
            this.initdate = String(Number(initdate)+1)
          }
          break;
        default:
          // 执行第四个代码块
          // console.log("没有月",init)
          clearInterval(this.timer)
          break;
      }
    },
    dealdepart(arr,low,high){
        if(low<high){
            let point = this.Partition(arr,low,high)
            this.dealdepart(arr,low,point-1)
            this.dealdepart(arr,point+1,high) 
        }
    },
    Partition(arr,low,high){
        let point = arr[low]
        while(low<high){
            while(low<high && arr[high]<=point){
                high--
            }
            this.swap(arr,low,high)
            while(low<high && arr[low]>=point){
                low++
            }
            this.swap(arr,low,high)
        }
        return low
    },
    swap(arr,low,high){
        let temp = arr[low]
        arr[low] = arr[high]
        arr[high] = temp

        let test = this.sort[low]
        this.sort[low] = this.sort[high]
        this.sort[high] = test
    },  
    departmentnum(){
        return this.departments.map(item=>item[this.currentshow])
    },
    changecurrentshow(str){ 
      this.$refs.bgscale.basenumber = 100
      this.currentshow = str
      this.departments = []
      this.initdate = "20200129"
      clearInterval(this.timer)
      this.timer = null
      this.sort = []
      this.maxvalue = 600
      this.Init()
    }
  }
};
</script>
      
  <style lang="scss" scoped>
#svg {
  // border: 1px solid #000;
  margin: 0 auto;
  display: block;
}
.date {
  fill: #5C5C5C;
  display: table-cell;
  font-size: 60pt;
  font-weight: bold;
  font-family: "Fira Code", "Source Han Sans CN";
}
.bt {
  width: 1250px;
  margin: 0 auto;
  display: flex;
}
.bti {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.active {
  color:rgb(101,31,255);
  background-color: #e4d7ff;
}
</style>
        
       