<template>
    <canvas ref="bar" :width="width" :height="hight" style="background:#0c1a46"></canvas>
</template>
      
    <script>
  export default {
    name: "bar",
    props: {
      beforefive: { // 下拉框字典数据
         type: Array,
         default: () => {
            return [1]
         }
      }
   },
    data(){
      return {
         label: ["湖北", "浙江", "广东", "河南", "湖南", "安徽", "江西"],//x轴的标题
         dataSets: [{
                    bDistance: 30, //绘制的边框距离画布边框的距离
                    bInterval: 20, //两个柱状图之间的距离
                    values: [300, 50, 100, 50, 80, 150, 120], //对应标签的值
                    fillColor: "#2f89cf" //矩形填充颜色
                 }, {
                    txtfont: "14px microsoft yahei",//绘制文本的字体
                    txtalgin: "center",//文本对齐方式
                    txtbaseline: "middle"//文本的基线
                 }, {
                    fillColor: "white", //矩形填充颜色
                    xtitle: "感染人数（人）", //x轴标题
                    ytitle: "排名前七" //y轴标题
                    
                 }],
                 ctx:null,
                 bar:null
      }
    },
    mounted(){
        this.bar = this.$refs.bar
        console.log(this.bar);
        this.ctx = this.bar.getContext("2d")
        const {label,dataSets,ctx} = this
        this.barChart(this.bar, {label,dataSets},ctx); //画柱状图
    },
    watch: {
      beforefive: {
         handler(newVal, oldVal) {
            console.log(newVal,'-------');
            this.dataSets[0].values[0] = Number(newVal[0].confirmedCount)
           this.dataSets[0].values[1] = Number(newVal[1].confirmedCount)
           this.dataSets[0].values[2] = Number(newVal[2].confirmedCount)
           this.dataSets[0].values[3] = Number(newVal[3].confirmedCount)
           this.dataSets[0].values[4] = Number(newVal[4].confirmedCount)
           this.dataSets[0].values[5] = Number(newVal[5].confirmedCount)
           this.dataSets[0].values[6] = Number(newVal[6].confirmedCount)
           this.label[0] = newVal[0].provinceShortName
           this.label[1] = newVal[1].provinceShortName
           this.label[2] = newVal[2].provinceShortName
           this.label[3] = newVal[3].provinceShortName
           this.label[4] = newVal[4].provinceShortName
           this.label[5] = newVal[5].provinceShortName
           this.label[6] = newVal[6].provinceShortName
           this.ctx.clearRect(0,0,this.width,this.hight)
           // console.log(this.dataSets);
           this.barChart(this.bar, {label:this.label,dataSets:this.dataSets},this.ctx); //画柱状图
         }
      },
   },
    computed:{
      hight(){
         // console.log("组件的高度---",window.innerHeight*0.3)
         return window.innerHeight*0.3
      },
      width(){
         return window.innerWidth*2/7
      }
    },
    methods:{
        /*柱状图
         * elem:要操作的画布元素
         * data:所需格式的数据*/
         barChart(elem, data, ctx) {
           if (elem.getContext) {
               var mywidth = elem.width, //画布的宽高
                 myheight = elem.height,
                 bDistance = parseInt(data.dataSets[0].bDistance), //图标边框到画布间距
                 bInterval = data.dataSets[0].bInterval, //矩形间间距
                 labels = data.label, //矩形对应标题
                 len = labels.length,//标签/数据个数
                 //矩形宽度
                 bWidth = Math.floor((mywidth - bDistance * 2 - (len + 1) * bInterval) / len),
                 bheight = myheight - bDistance * 2, //边框高度
                 values = data.dataSets[0].values, //绘图的值
                 sortValues = values.slice(0), //基于当前数组中的一个或多个项创建一个新数组（解决了该数组排序原数组也被排序的问题）
                 serialValues = new Array(); //用于存储序列化后的值
              sortValues.sort(this.compare);

              /*
              * 这里暂时不知道为什么先注释掉
              *
              */
            //   if (sortValues[0] > bheight) {
            //      (function () {
            //         //数值超过边框高度时序列化值
            //         for (var i = 0; i < len; i++) {
            //            serialValues[i] = values[i] * bheight / sortValues[0];
            //         }
            //      })(); //块级作用域
            //   }
            //数值超过边框高度时序列化值
            for (var i = 0; i < len; i++) {
                       serialValues[i] = values[i] * bheight / sortValues[0];
                    }
              //绘制边框
              ctx.beginPath(); //要绘制路径，必须先调用该方法，表示开始绘制新路径
              ctx.moveTo(bDistance, bDistance);
              ctx.lineTo(bDistance, myheight - bDistance);
              ctx.lineTo(mywidth - bDistance, myheight - bDistance);
              ctx.stroke(); //把图形绘制到画布上
              //绘制矩形，组成条形图
              
              ctx.fillStyle = data.dataSets[0].fillColor;
              //绘制文字
              ctx.font = data.dataSets[1].txtfont; //字体样式、大小、字体
              ctx.textAlign = data.dataSets[1].txtalgin; //文本对齐方式
              ctx.textBaseline = data.dataSets[1].txtbaseline; //文本的基线
              for (var i = 0; i < len; i++) {
                 var x = (bInterval + bDistance) + i * (bWidth + bInterval),
                    y = myheight - serialValues[i] - bDistance,
                    x1 = x + Math.round(bWidth / 2),
                 y1 = myheight - bDistance + 15,
                    y2 = y - 10;
                 ctx.fillRect(x, y, bWidth, serialValues[i]); //x,y,width,height单位都为px
                 // console.log(serialValues[i])
                 ctx.fillText(labels[i], x1, y1); //绘制标题文字
                 ctx.fillText(values[i], x1, y2); //绘制柱状图数据
              }
              ctx.fillStyle = data.dataSets[2].fillColor;
              ctx.fillText(data.dataSets[2].xtitle, 49, 7); //x轴代表什么
              ctx.fillText(data.dataSets[2].ytitle, mywidth - bDistance, myheight - bDistance + 15); //y轴代表什么
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
      
     