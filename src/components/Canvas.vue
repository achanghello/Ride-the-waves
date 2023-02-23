<template>
  <div class="canvasBox">
    <div class="canvasCon" @mouseenter="stopMove" @mouseleave="startMove" @mousemove="promptBox">
      <canvas ref="canvas" width='1000' height='550'>
        Canvas not supported
      </canvas>
      <div class="prompt" v-show="isPrompt" ref="prompt">
        <div class="proTop" ref="proTop">
        </div>
        <div class="proCon" ref="proCon">
        </div>
      </div>
    </div>
    <div class="tips">
      <div class="tip" v-for="(item, index) in tipList" :key="index" @click="toShowBall(index)">
        <div class="ball" :style="`background-color: ${item.color};`"></div>
        <span>{{ item.type }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Canvas',
  props: {
    showlist:{
      required:true
    }
  },
  data() {
    return {
      paused: true,
      circles: [],
      test: {
        infectionsCount: 30,
        cureCount: 5,
        deathCount: 6,
        month: '5月',
        place: '广东省',
        infectionsPeople: ['2021年2月', '2021年3月'],
        curePeople: ['2021年2月', '2021年3月'],
        deathPeople: ['2021年2月', '2021年3月'],
      },
      tipList: [{ type: '感染人员', color: 'rgba(255,215,0,1.0)' }, { type: '治愈人员', color: 'rgba(143,188,143,1.0)' }, { type: '死亡人员', color: 'rgba(220,20,60,1.0)' }],
      isPrompt: true,
      isYeShow: true,
      isGrShow: true,
      isReShow: true
    }
  },
  created() {

  },
  mounted() {
    const context = this.getCanvas();
    this.drawGird(context, 'lightgray', 10, 10);
    this.getData()
    this.setMove(context)
  },
  watch:{
    showlist:{
      handler(newVal, oldVal) {
        this.tipList=[]
        clearInterval(this.timer)
        const context = this.getCanvas();
    this.drawGird(context, 'lightgray', 10, 10);
    this.test.infectionsCount=this.showlist.confirmedCount
    this.test.cureCount=this.showlist.curedCount
    this.test.deathCount=this.showlist.deadCount
    this.getData()
    this.setMove(context)
      }
    }
  },
  methods: {
    //获取到canvas
    getCanvas() {
      const context = this.$refs.canvas.getContext('2d');
      context.lineWidth = 0.5;
      context.font = '32pt Ariel';
      return context;
    },

    // 拿到数据对象
    getData() {
      // const infectionsPeople = this.test.infectionsPeople;
      // const curePeople = this.test.curePeople;
      // const deathPeople = this.test.deathPeople;
      const infectionsPeople = this.test.infectionsCount;
      const curePeople = this.test.cureCount;
      const deathPeople = this.test.deathCount;
      this.addBalls(infectionsPeople, "infections");
      this.addBalls(curePeople, "cure");
      this.addBalls(deathPeople, "death");
    },

    // 添加小球
    addBalls(person, type) {
      // for (let i = 0; i < person.length; i++) {
      //   this.circles.push(this.setProps(type, person[i]));
      // }
      for (let i = 0; i < person; i++) {
        this.circles.push(this.setProps(type, person[i]));
      }
    },

    //画方格子
    drawGird(context, color, stepX, stepY) {
      context.strokeStyle = color;
      context.lineWidth = 0.5;

      for (var i = stepX + 0.5; i < context.canvas.width; i += stepX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
      }

      for (var i = stepY + 0.5; i < context.canvas.height; i += stepY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
      }
    },

    // 设置定时器
    setMove(context) {
      this.timer = setInterval(function () {
        if (this.paused) {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          this.drawGird(context, 'lightgray', 10, 10);
          this.circles.forEach(function (circle) {
            if (circle.type === '感染' && this.isYeShow) {
              this.renderBall(circle, context);
            } else if (circle.type === '治愈' && this.isGrShow) {
              this.renderBall(circle, context);
            } else if (circle.type === '死亡' && this.isReShow) {
              this.renderBall(circle, context);
            }
          }.bind(this));
        }
      }.bind(this), 1000 / 60);
    },

    // 绘制小球
    renderBall(circle, context) {
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius,
        0, Math.PI * 2, false);
      context.fillStyle = circle.color;
      context.fill();
      this.adjustPosition(circle, context);
    },

    // 改变小球的位置
    adjustPosition(circle, context) {
      if (circle.x + circle.velocityX + circle.radius > context.canvas.width || circle.x - circle.radius + circle.velocityX < 0)
        circle.velocityX = -circle.velocityX;

      if (circle.y + circle.velocityY + circle.radius > context.canvas.height || circle.y - circle.radius + circle.velocityY < 0)
        circle.velocityY = -circle.velocityY;

      circle.x += circle.velocityX;
      circle.y += circle.velocityY;
    },

    // 给小球设置不同的方向和颜色
    setProps(type, personTime) {
      const obj = {
        x: 100,
        y: 100,
        //向x方向移动的像素
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 7,
        time: personTime
      }
      if (type === 'infections') {
        obj.type = '感染'
        obj.color = 'rgba(255,215,0,1.0)'
      } else if (type === 'cure') {
        obj.type = '治愈'
        obj.color = 'rgba(143,188,143,1.0)'
      } else {
        obj.type = '死亡'
        obj.color = 'rgba(220,20,60,1.0)'
      }
      return obj;
    },

    // 鼠标进入画布时小球停止运动
    stopMove() {
      this.paused = false;
    },

    // 鼠标离开时小球继续运动
    startMove() {
      this.paused = true;
    },

    // 鼠标放在小球身上时展示提示框
    promptBox(e) {
      let x = e.clientX - this.$refs.canvas.getBoundingClientRect().left;
      let y = e.clientY - this.$refs.canvas.getBoundingClientRect().top;
      let flag = false;

      for (let i = 0; i < this.circles.length; i++) {
        if (this.circles[i].x - 5 <= x && x <= this.circles[i].x + 5 && this.circles[i].y - 5 <= y && y <= this.circles[i].y + 5) {
          this.isPrompt = true;
          this.$refs.proTop.innerText = this.circles[i].type + '人员';
          this.$refs.proCon.innerText = `${this.circles[i].type}日期：${this.circles[i].time}`;
          this.$refs.prompt.style.top = y + 'px';
          this.$refs.prompt.style.left = x + 'px';
          this.$refs.prompt.style.display = 'block';
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.isPrompt = false;
      }
    },

    // 让小球显示或隐藏
    toShowBall(index) {
      if (index === 0) {
        this.isYeShow = !this.isYeShow;
      } else if (index === 1) {
        this.isGrShow = !this.isGrShow;
      } else {
        this.isReShow = !this.isReShow;
      }
    }
  },
}
</script>

<style scoped>
body {
  background-color: #f8f8f8;
  /* 白背景 */
  font-size: 30px;
  /* 固定字体大小 */
}

body .canvasCon {
  position: relative;
  width: 1000px;
  height: 550px;
}

.canvasBox {
  position: relative;
}

.prompt {
  position: absolute;
  width: 140px;
  height: 70px;
  background-color: bisque;
  border-radius: 10px;
  top: 0px;
  left: 0px;
  display: none;
}

.proTop {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  margin: 10px 0;
}

.proCon {
  text-align: center;
  font-size: 12px;
}

.tips {
  position: absolute;
  bottom: -24px;
  right: 10px;
  display: flex;
}

.tip {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tip:hover {
  cursor: pointer;
}

.tip span {
  font-size: 14px;
}

.ball {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
