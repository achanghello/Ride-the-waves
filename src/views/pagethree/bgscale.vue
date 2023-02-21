<template>
  <g>
    <g
      v-for="i in Math.ceil((maxvalue +basenumber) / 100)"
      :key="i"
      class="labelg"
      :transform="`translate(${(((i - 1) * 100) / maxvalue) * 600 + 570},0)`"
    >
      <transition name="aniate">
        <g v-show="((i - 1) * 100) % basenumber == 0">
        <line stroke="#C0C0BB" y2="590"></line>
          <text v-if="i!==1" class="linenumber" text-anchor="middle" y="611">{{
            (i - 1) * 100
          }}</text>
        </g>
      </transition>
      
    </g>
    <g
      v-for="i in Math.ceil((maxvalue) / 100)"
      :key="-i"
      class="labelg"
      :transform="`translate(${((-(i - 1) * 100) / maxvalue) * 600 + 570},0)`"
    >
      <transition name="aniate">
        <g v-show="((i - 1) * 100) % basenumber == 0 && (((-(i - 1) * 100) / maxvalue) * 600 + 570)>70">
        <line stroke="#C0C0BB" y2="590"></line>
        </g>
      </transition>
      
    </g>
  </g>
</template>
<script>
export default {
    name:"bgscale",
    props: {
        maxvalue:{
            type: Number,
            default: 600
        }
    },
    data() {
    return {
      basenumber: 100
    };
  },
  methods: {
    highest(num){
      const str = num.toString();
      const highestDigit = parseInt(str[0]);
      return highestDigit
    },
  },
  watch: {
      maxvalue: {
        handler(newVal, oldVal) {
          // console.log(this)
          while(this.basenumber*7<=this.maxvalue){
            // this.basenumber*=10
            // console.log(this.basenumber)
            if(this.highest(this.basenumber)===2){
              this.basenumber = this.basenumber/2*5
            }else{
              this.basenumber*=2
            }
          }
        }
      },
    },
}
</script>
<style lang="scss" scoped>
.labelg {
    transition: all 1s linear;
}
/* 1.过渡动画 */
@keyframes axisX {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 2. 过渡类名 */
/* 开始 */
.aniate-enter-active {
  animation: axisX 1s;
}
/* 结束 */
.aniate-leave-active {
  animation: axisX 1s reverse;
}
</style>