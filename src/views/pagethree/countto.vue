<template>
    <text class="labelg ename" :transform="`translate(${y},30)`">{{ Math.round(count) }}</text>
  </template>
    
    <script>
  export default {
    props: {
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        default: 1000,
      },
      y: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        count: this.start,
        interval: null,
        step: (this.end - this.start) / (this.duration / 10),
      };
    },
    methods:{
      m(){
         this.interval = setInterval(() => {
        if (this.count < this.end) {
          this.count += this.step;
        } else {
          this.count = this.end;
          clearInterval(this.interval);
        }
      }, 10); 
      }
    },
    watch: {
      start: {
        handler(newVal, oldVal) {
          this.count = this.start
          clearInterval(this.interval)
          this.interval = null
          this.step = (this.end - this.start) / (this.duration / 10)
          this.m()
        },
        immediate:true
      },
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
  </script>
  
  <style>
  .labelg {
    transition: all 1s linear;
  }
  .ename {
    font-size: 15pt;
    font-family: "Fira Code", "Source Han Sans CN";
    font-weight: bold;
    fill: rgb(148, 103, 189);
  }
  </style>
    