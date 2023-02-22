<template>
   <canvas ref="pie" :width="width" :height="hight" style="background:#0c1a46"></canvas>
</template>
      
    <script>
  export default {
    name: "pie",
    data(){
      return {
         datasets:{
                 colors: ["blue", "yellow", "pink", "red", "green", "orange"], //颜色
                 labels: ["亚洲", "非洲", "欧洲", "大洋洲", "北美洲", "南美洲"], //标签
                 values: [30, 60, 80, 70, 130, 20], //值
                 x: 170, //圆心x坐标
                 y: 140, //圆心y坐标
                 radius: 100 //半径
         },
         pie: null
      }
    },
    mounted(){
      this.pie = this.$refs.pie,
      this.pieChart(this.pie, this.datasets); //画饼状图
    },
    computed:{
      hight(){
         // console.log("组件的高度---",window.innerHeight*0.3)
         return window.innerHeight*0.3
      },
      width(){
         //console.log("组件的高度---",window.innerWidth*2/7)
         return window.innerWidth*2/7
      }
    },
    methods:{
        /*饼图
         * elem:要操作的画布元素
         * data:所需格式的数据*/
  
         pieChart(elem, data) {
           if (elem.getContext) {
              var ctx = elem.getContext("2d"),
                 vdata = data.values, //绘图数据
                 sum = this.sumFunc(vdata), //对绘图数据求和，用于计算百分比
                 startangle = 0, //绘制扇形的开始角度
                 labels = data.labels, //绘图的对应文字
                 x = data.x, //圆心x坐标
                 y = data.y, //圆心y坐标
                 rad = data.radius, //圆半径
                 x1 = x + rad + 30, //绘制右侧文字和标注的x坐标
                 y1 = y - rad, //绘制右侧文字和标注的y坐标
                 endangle; //绘制扇形的结束角度
               // console.log("llll",vdata,sum,startangle,labels,x,y,rad,x1,y1,endangle)
              for (var i = 0, len = vdata.length; i < len; i++) {
                 //绘制饼图
                 //计算下一次绘制扇形的结束角度，即根据绘制数据占有总数据和的比例求的弧度
                 var percent = vdata[i] / sum;
                 endangle = startangle + Math.PI * 2 * (percent);
                 ctx.beginPath(); //开始绘制新路径
                 ctx.fillStyle = data.colors[i]; //绘制颜色
                 ctx.moveTo(x, y); //移动到圆心(注：画饼图一定要回到圆心，不然会有问题)
                 ctx.arc(x, y, rad, startangle, endangle, false); //画扇形
                 // console.log("2222",vdata,sum,startangle,labels,x,y,rad,x1,y1,endangle)
                 //绘制右侧文字和标注
                 ctx.moveTo(x1, y1); //移动到绘制文字和标注的位置
                 ctx.fillRect(x1, y1, 30, 14); //绘制矩形表示比列图
                 //计算四舍五入后的扇形每份的百分比
                 var perc = (percent * 100).toFixed(2) + "%"; //tofixed()自动四舍五入返回指定小数位数的字符串
                 //设置绘制文字的属性
                 ctx.font = "bold 12px microsoft yahei";
                 ctx.txtalgin = "center";
                 ctx.textBaseline = "top";
                 //绘制文字
                 ctx.fillText(labels[i] + ":" + perc, x1 + 35, y1);
                 ctx.fill(); //指定颜色填充以上绘制
                 startangle = endangle; //下一次绘制扇形的开始角度
                 y1 += 20; //下一次绘制文字和标注的y坐标
              }
           }
        },
        //数组sort()排序传的参数为该函数（降序排列），绘制柱状图需要
        compare(value1, value2) {
           return value2 - value1;
        },
        //求和，计算百分比（画饼图时需要）
  
        sumFunc(data) {
           var sum = 0;
           for (var i = 0, len = data.length; i < len; i++) {
              sum += data[i];
           }
           return sum;
        }
    }
  }
  </script>
    
  <style lang="scss" scoped>
  </style>
      
     