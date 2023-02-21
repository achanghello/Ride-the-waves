<template>
  <g :transform="`translate(0,${rannge})`" :key="jkey" class="labelg">
    <text
      x="60"
      y="15"
      text-anchor="end"
      dominant-baseline="middle"
      class="text-name"
      :style="`fill: ${color};`"
      >{{ jkey }}</text
    >
    <rect class="rect" :width="relativevalue" :style="`fill: ${color};`" />
    <text :transform="`translate(${relativevalue},25)`" class="labelg rname" :stroke="color">{{jkey}}</text>
    <countTo
      :start="oldvalue"
      :end="value"
      :duration="1000"
      :y="relativevalue"
      :color="color"
    ></countTo>
  </g>
</template>
        
<script>
import CountTo from "./countto.vue";
export default {
  name: "Baritem",
  props: {
    color: {
      type: String,
      default: "blue",
    },
    jkey: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 500,
    },
    maxvalue: {
      type: Number,
      default: 600,
    },
    oldvalue: {
      type: Number,
      default: 0,
    },
    th: {
      type: Number,
      required: true,
    },
  },
  computed: {
    relativevalue() {
      return (this.value / this.maxvalue) * 600 + 500;
    },
    rannge() {
      return this.th * 60 + 21;
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
  height: 30px;
  x: 70;
  stroke-width: 1;
  stroke: rgb(0, 0, 0);
}
.text-name {
  font-size: 15pt;
  font-family: "Fira Code", "Source Han Sans CN";
  font-weight: bold;
}
.rname {
  fill: #FFFFFF;
  font-weight: 800;
  font-size: 30pt;
  font-family: "Fira Code", "Source Han Sans CN";
  stroke-width: 4px;
  fill-opacity: 1;
  text-anchor: end;
  paint-order: stroke;
}
.labelg {
  transition: all 1s linear;
}
</style>
        
       