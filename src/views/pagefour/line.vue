<template>
   <canvas ref="linec" :width="width" :height="hight" style="background:#0c1a46;"></canvas>
</template>
      
    <script>
  export default {
   props: {
      currentmonth: { // 下拉框字典数据
         type: Array,
         default: () => {
            return [115, 35, 210, 100, 300, 220, 40, 115, 35, 210, 100, 300, 220, 40]
         }
      }
   },
    data(){
      return {
         newData: {
                 labels: ["累计确诊", "新增确诊", "累计治愈", "新增治愈", "累计死亡", "累计疑似"],
                 values: [100, 40, 200, 50, 10, 80],
                 lineColor: "yellow",//折线颜色
                 circleColor: "red",
                 txtSet: {//绘制文本设置
                    txtfont: "14px microsoft yahei",
                    txtalgin: "center",
                    txtbaseline: "middle",
                    txtColor: "#fff"
                 },
                 bgSet: {//绘制背景线设置
                    lineColor: "#C0C0C0",
                    lineWidth: 1,
  
                 },
                 yAxis: {//y轴表示什么，及绘制文本的位置
                    x: 50,
                    y: 11,
                    title: "感染人数（人）"
                 }
         },
         datas: {
                 labels: ["20年第一季度","20年第二季度","20年第三季度","20年第四季度"],//标签
                 values: [-6.8,3.2,4.9,6.5],//值
                 txtSet: {//绘制文本设置
                    txtfont: "14px microsoft yahei",
                    txtalgin: "center",
                    txtbaseline: "middle",
                    txtColor: "#fff"
                 },
                 bgSet: {//绘制背景线设置
                    lineColor: "#C0C0C0",
                    lineWidth: 1,
  
                 },
                 lineColor: "#00c896",//折线颜色
                 circleColor: "blue",//折线上原点颜色
                 yAxis: {//y轴表示什么，及绘制文本的位置
                    x: 50,
                    y: 11,
                    title: "      经济同比增长（%）"
                 }
         },
         line: null,
         ctx: null
      }
    },
    mounted(){
      this.line = this.$refs.linec
      this.ctx = this.line.getContext("2d"),
      this.lineChart(this.line, this.datas,this.ctx);//画折线图
      // this.lineChart(this.line,this.newData,this.ctx);//在同一个canvas画第二条折线图
           //curveChart();//绘制曲线
    },
   //  watch: {
   //    currentmonth: {
   //       handler(newVal, oldVal) {
   //          this.ctx.clearRect(0,0,this.width,this.hight)
   //          this.datas.values[0] = Number(newVal[0].confirmedCount)
   //         this.datas.values[1] = Number(newVal[0].confirmedIncr)
   //         this.datas.values[2] = Number(newVal[0].curedCount)
   //         this.datas.values[3] = Number(newVal[0].curedIncr)
   //         this.datas.values[4] = Number(newVal[0].deadCount)
   //         this.datas.values[5] = Number(newVal[0].suspectedCount)
   //         this.lineChart(this.line, this.datas,this.ctx);//画折线图
   //         this.newData.values[0] = Number(newVal[newVal.length-1].confirmedCount)
   //         this.newData.values[1] = Number(newVal[newVal.length-1].confirmedIncr)
   //         this.newData.values[2] = Number(newVal[newVal.length-1].curedCount)
   //         this.newData.values[3] = Number(newVal[newVal.length-1].curedIncr)
   //         this.newData.values[4] = Number(newVal[newVal.length-1].deadCount)
   //         this.newData.values[5] = Number(newVal[newVal.length-1].suspectedCount)
   //         this.lineChart(this.line,this.newData,this.ctx);//在同一个canvas画第二条折线图
   //       }
   //    },
   // },
    computed:{
      hight(){
         //console.log("组件的高度---",window.innerHeight*0.3)
         return window.innerHeight*0.3
      },
      width(){
         return window.innerWidth*2/7
      }
    },
    methods:{
        /*绘制折线
         elem:操作的元素
         data：所需格式数据*/
         lineChart(elem, data, ctx) {
           if (elem.getContext) {
              // var ctx = elem.getContext("2d"),
                var labels = data.labels,//数值对应标签
                 values = data.values,//数值
                 len = labels.length,//标签/数值个数
                 elemWidth = elem.width,//画布宽度
                 elemHeight = elem.height,//画布高度
                 gridHeight = Math.ceil(elemHeight / 5),//每行之间高度
                 gridWidth = Math.floor(elemWidth / len),//每列之间看度
                 actualHeight = 4 * gridHeight + 20;//绘制区域实际高度
              //设置绘制直线的属性
              ctx.strokeStyle = data.bgSet.lineColor;
              ctx.lineWidth = data.bgSet.lineWidth;
              //设置绘制文本的属性
              ctx.font = data.txtSet.txtfont;
              ctx.textAlign = data.txtSet.txtalgin;
              ctx.txtbaseline = data.txtSet.txtbaseline;
              //绘制背景
              //绘制背景横线
              ctx.beginPath();
              for (var i = 0; i < 5; i++) {
                 var hgridY = gridHeight * i + 20,
                    hgridX = gridWidth * len;
                 ctx.moveTo(0, hgridY);
                 ctx.lineTo(hgridX, hgridY);
              }
              ctx.stroke();
  
              //绘制背景的竖线，表示每个label
              ctx.beginPath();
              for (var j = 0; j < len + 1; j++) {
                 var vgridX = gridWidth * j,
                    vgridY = actualHeight;
                 ctx.moveTo(vgridX, vgridY);
                 ctx.lineTo(vgridX, vgridY + 10);
              }
              ctx.stroke();
              //绘制标签文字
              ctx.fillStyle = data.txtSet.txtColor;
              for (var k = 0; k < len; k++) {
                 var txtX = gridWidth * (k + 0.5),
                    txtY = actualHeight + 15;
                 ctx.fillText(labels[k], txtX, txtY);
              }
              ctx.fill();
  
  
              //获取画图数据的最大值用于序列换数据
              var maxValue = 0,
                 cData = new Array();
              for (var i = 0; i < len; i++) {
                 if (values[i] > maxValue) {
                    maxValue = values[i];
                 }
              }
              //当最大值大于画布可绘制区域的高度时，对数据进行转化，然后进行画图
              if ((4 * gridHeight) > maxValue) {
                 for (var i = 0; i < len; i++) {
                    //转换后的数据
                    cData[i] = values[i] * 4 * gridHeight/ 2 / maxValue + (elemHeight-50) / 2;
                 }
              } else {
                 cData = values;
              }
              //绘制折线
              ctx.strokeStyle = data.lineColor;
              ctx.beginPath();
              var pointX = gridWidth / 2,
                 pointY = actualHeight - cData[0];
              ctx.moveTo(pointX, pointY);
              for (var i = 1; i < len; i++) {
                 pointX += gridWidth;
                 pointY = actualHeight - cData[i];
                 ctx.lineTo(pointX, pointY);
              }
              ctx.stroke();
              //绘制坐标圆形
              ctx.beginPath();
              ctx.fillStyle = data.circleColor; //圆点的颜色
              for (var i = 0; i < len; i++) {
                 var circleX = gridWidth / 2 + gridWidth * i,
                    circleY = actualHeight - cData[i];
                 ctx.moveTo(circleX, circleY); //假如不每次绘制之前确定开始绘制新路径，可以每次绘制之前移动到新的圆心
                 ctx.arc(circleX, circleY, 4, 0, Math.PI * 2, false);
              }
              ctx.fill();
              //绘制坐标圆形对应的值
              ctx.beginPath();
              ctx.fillStyle = data.txtSet.txtColor;; //文本颜色
              for (var i = 0; i < len; i++) {
                 var circleX = gridWidth / 2 + gridWidth * i,
                    circleY = actualHeight - cData[i];
                 ctx.fillText(values[i], circleX, circleY - 8);
  
              }
              ctx.fill();
              //绘制y轴代表什么
              ctx.fillText(data.yAxis.title, data.yAxis.x, data.yAxis.y);
              ctx.fill();
  
           }
        },
        //数组sort()排序传的参数为该函数（降序排列），绘制柱状图需要
        compare(value1, value2) {
           return value2 - value1;
        }
    }
  }
  </script>
    
  <style lang="scss" scoped>
  </style>
      
     