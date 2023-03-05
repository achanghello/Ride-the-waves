<template>
   <canvas ref="curve" :width="width" :height="hight" style="background:#0c1a46"></canvas>
</template>
      
<script>
export default {
   name: "bar",
   props: {
      currentmonth: { // 下拉框字典数据
         type: Array,
         default: () => {
            return [115, 35, 210, 100, 300, 220, 40, 115, 35, 210, 100, 300, 220, 40]
         }
      }
   },
   data() {
      return {
         linedata: {
            labels: ["2日", "4日", "6日", "8日", "10日", "12日", "14日", "16日", "18日", "20日", "22日", "24日"],//标签
            datas: [],//数据
            xTitle: "月份",//x轴标题
            yTitle: "感染人数(人)",//y轴标题
            ctxSets: {
               strokeColor: "#C0C0C0",//背景线颜色
               lineWidth: 1,//线的宽度
               txtColor: "#fff",//绘制文本颜色
               txtFont: "12px microsoft yahei",//字体
               txtAlign: "center",//对齐方式
               txtBase: "middle",//基线
               lineColor: "#ee473e",//折线颜色
               circleColor: "#FF0000"//折线上圆点颜色
            }
         },
         bg: null,
         num: -1,
         colors:['#DC143C','#2E8B57','#FFB400']
      }
   },
   mounted() {
      this.bg = this.$refs.curve
      this.setBg(this.bg, this.linedata);//绘制图标背景及折线
   },
   computed: {
      hight() {
         // console.log("组件的高度---",window.innerHeight*0.3)
         return window.innerHeight * 0.3
      },
      width() {
         return window.innerWidth * 2 / 7
      }
   },
   watch: {
      currentmonth: {
         handler(newVal, oldVal) {
            let arr1 = newVal.filter((item, index) => {
               if (index > 23) {
                  return false
               }
               return index % 2 === 0
            })
            let arr2 = arr1.map(item => Number(item.confirmedCount))
            this.linedata.datas = arr2
            this.linedata.ctxSets.lineColor = this.colors[this.num%3]
            this.linedata.ctxSets.circleColor = this.colors[this.num%3]
            this.setBg(this.bg, this.linedata);//绘制图标背景及折线
         }
      },
   },
   methods: {
      /* 绘制背景
       * elem:要操作的元素
       * data:所需格式的数据*/


      setBg(elem, data) {

         if (elem.getContext) {
            var ctx = elem.getContext("2d"),//获取元素上下文
               startX = 40,//左上角开始绘制的x坐标
               startY = 40,//左上角开始绘制的y坐标
               labels = data.labels,//对应数据的标签，即列数
               cols = labels.length,//数据个数
               datas = data.datas,//数据
               gWidth = elem.width - 80,//背景总宽度,elem.width为画布宽度
               gHeight = elem.height - 80,//背景总长度
               pgWidth = gWidth / cols,//背景每个格的宽度
               rows = 10,//背景表格行数
               pgHeight = gHeight / rows;//背景表格高度

           if(this.num%3===0){
            ctx.clearRect(0,0,this.width,this.hight)
         }
         this.num=this.num+1
            //绘制背景
            ctx.beginPath(); //开始绘制新路径
            ctx.strokeStyle = data.ctxSets.strokeColor;//描边颜色
            ctx.lineWidth = data.ctxSets.lineWidth;//描边线条宽度
            //绘制横线
            for (var i = 0; i < rows; i++) {
               var pY = startX + pgHeight * i;
               ctx.moveTo(startX, pY); //移动到绘制的起点
               ctx.lineTo(gWidth + startX, pY);
            }
            //最后一根横线
            var pY1 = startY + pgHeight * rows;
            ctx.moveTo(startX, pY1); //移动到绘制的起点
            ctx.lineTo(gWidth + startX + 20, pY1);
            //绘制竖线
            //第一根竖线
            ctx.moveTo(startX, startY - 20); //移动到绘制的起点
            ctx.lineTo(startX, gHeight + startY + 10);
            for (var i = 1; i < cols + 1; i++) {
               var pX = startX + pgWidth * i;
               ctx.moveTo(pX, startY); //移动到绘制的起点
               ctx.lineTo(pX, gHeight + startY + 10);
            }

            ctx.stroke();//把图形绘制到画布上
            //绘制文字
            ctx.fillStyle = data.ctxSets.txtColor;//填充颜色
            ctx.font = data.ctxSets.txtFont;//文本字体
            ctx.textAlign = data.ctxSets.txtAlign;//文本对齐方式
            ctx.textBaseline = data.ctxSets.txtBase;//文本基线
            //绘制横轴文字
            for (var i = 0; i < cols; i++) {
               var px = startX + pgWidth / 2 + pgWidth * i;
               ctx.fillText(labels[i], px, startY + gHeight + 10);
            }
            //绘制竖轴文字
            //判断最大值是否大于行高，确定每行的数值
            var maxValue = 0,
               newValues = new Array(),
               j = 0;
            for (var i = 0; i < cols; i++) {
               if (datas[i] > maxValue) {
                  maxValue = datas[i];
               }
            }
            // console.log("最大值",maxValue);
            let pgValues
            //重新计算每隔数据值及转换值
            if (maxValue > gHeight) {
               pgValues = maxValue / rows;
               for (var i = 0; i < cols; i++) {
                  console.log(gHeight);
                  newValues[i] = datas[i] / maxValue * gHeight;
               }
            } else {
               pgValues = pgHeight;
               newValues = datas;
            }
            console.log("newValues", newValues);
            //绘制竖轴文字
            if((this.num+2)%3===0){
               for (var i = rows; i >= 0; i--) {
               ctx.fillText(parseInt(pgValues * i), 20, startY + pgHeight * j);
               j++;
            }
            }

            //绘制标题
            //x轴标题
            ctx.fillText(data.xTitle, gWidth + startX + 15, gHeight + startY + 10);
            //y轴标题
            ctx.fillText(data.yTitle, startX + 25, startY - 10);


            //画图
            //绘制折线
            ctx.strokeStyle = data.ctxSets.lineColor;;
            ctx.beginPath();
            var pointX = pgWidth / 2 + startX,
               pointY = startY + gHeight - newValues[0];
            ctx.moveTo(pointX, pointY);
            for (var i = 1; i < cols; i++) {
               pointX += pgWidth;
               pointY = startY + gHeight - newValues[i];
               ctx.lineTo(pointX, pointY);
            }
            ctx.stroke();
            //绘制坐标圆形
            ctx.beginPath();
            ctx.fillStyle = data.ctxSets.circleColor;; //圆点的颜色
            for (var i = 0; i < cols; i++) {
               var circleX = pgWidth / 2 + startX + pgWidth * i,
                  circleY = startY + gHeight - newValues[i];
               ctx.moveTo(circleX, circleY); //假如不每次绘制之前确定开始绘制新路径，可以每次绘制之前移动到新的圆心
               ctx.arc(circleX, circleY, 4, 0, Math.PI * 2, false);
            }
            ctx.fill();
            //绘制坐标圆形对应的值
            ctx.beginPath();
            ctx.fillStyle = data.ctxSets.txtColor; //文本颜色
            for (var i = 0; i < cols; i++) {
               var circleX = pgWidth / 2 + startX + pgWidth * i,
                  circleY = startY + gHeight - newValues[i];
               ctx.fillText(datas[i], circleX, circleY - 10);
            }
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
    
<style lang="scss" scoped></style>
      
     