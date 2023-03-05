<template>
   <canvas ref="linec" :width="width" :height="hight" style="background:#0c1a46;"></canvas>
</template>
      
    <script>
  export default {
    data(){
      return {
         // newData: {
         //         labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
         //         values: [100, 40, 200, 50, 10, 80, 100],
         //         txtSet: {
         //            txtfont: "14px microsoft yahei",
         //            txtalgin: "center",
         //            txtbaseline: "middle",
         //            txtColor: "#000000"
         //         },
         //         bgSet: {
         //            lineColor: "#C0C0C0",
         //            lineWidth: 1,
         //         },
         //         lineColor: "blue",
         //         circleColor: "red",
         //         yAxis: {
         //            x: 50,
         //            y: 11,
         //            title: "感染人数（人）"
         //         }
         // },
         datas: {
                 labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],//标签
                 values: [50, 180, 100, 150, 110, 130, 30],//值
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
                    title: "感染人数（人）"
                 }
         },
         line: null
      }
    },
    mounted(){
      this.line = this.$refs.linec
      this.lineChart(this.line, this.datas);//画折线图
           //lineChart(line,newData);//在同一个canvas画第二条折线图
           //curveChart();//绘制曲线
    },
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
         lineChart(elem, data) {
           if (elem.getContext) {
              var ctx = elem.getContext("2d"),
                 labels = data.labels,//数值对应标签
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
              if ((4 * gridHeight) < maxValue) {
                 for (var i = 0; i < len; i++) {
                    //转换后的数据
                    cData[i] = values[i] * 4 * gridHeight / maxValue;
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
      
     