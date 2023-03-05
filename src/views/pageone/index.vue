<template>
  <div>
    <div class="selects">
      <VueAmazingSelector :selectData="selectData1" name="label" value="id"
        placeholder="请选择省份" :width="160" :height="36" :num="6" v-model="selectedNameValue" @change="onChange">
      </VueAmazingSelector>
      <!-- <VueAmazingSelector :selectData="selectData2" :defaultValue="defaultValue" name="label" value="value"
        placeholder="请选择年份" :width="160" :height="36" :num="6" v-model="selectedValue" @change="onChange">
      </VueAmazingSelector> -->
      <VueAmazingSelector :selectData="selectData3" name="label" value="value"
        placeholder="请选择月份" :width="160" :height="36" :num="6" v-model="selectedMonthValue" @change="onChange">
      </VueAmazingSelector>
    </div>
    <div class="container">
      <Canvas :showlist="showlist"></Canvas>
      <div class="notices">
        <Notice :type="'感染人员'" :number="showlist.confirmedCount"></Notice>
        <Notice :type="'治愈人员'" :number="showlist.curedCount"></Notice>
        <Notice :type="'死亡人员'" :number="showlist.deadCount"></Notice>
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from '../../components/Canvas.vue'
import Notice from '../../components/Notice.vue'
import VueAmazingSelector from '../../components/VueAmazingSelector.vue'

import { RECORDS } from "../../assets/china_provincedata.json";
export default {
  name: 'App',
  components: {
    Canvas,
    Notice,
    VueAmazingSelector
  },
  data() {
    return {
      selectData1: [
        {
          label: '河北省',
          id: 1
        },
        {
          label: '山西省',
          id: 2,
        },
        {
          label: '辽宁省',
          id: 3
        },
        {
          label: '吉林省',
          id: 4
        },
        {
          label: '黑龙江省',
          id: 5
        },
        {
          label: '江苏省',
          id: 6
        },
        {
          label: '浙江省',
          id: 7
        },
        {
          label: '安徽省',
          id: 8
        },
        {
          label: '福建省',
          id: 9
        },
        {
          label: '江西省',
          id: 10
        },
        {
          label: '山东省',
          id: 11
        },
        {
          label: '河南省',
          id: 12
        },
      ],
      defaultValue: '',
      selectedMonthValue: 1,
      selectedNameValue: 1,
      selectData3: [
        {
          label: '1月',
          value: 1
        },
        {
          label: '2月',
          value: 2,
        },
        {
          label: '3月',
          value: 3
        },
        {
          label: '4月',
          value: 4
        },
        {
          label: '5月',
          value: 5
        },
        {
          label: '6月',
          value: 6
        }
      ],
      // selectData2: [
      //   {
      //     label: '2020年',
      //     value: 1,
      //   },
      //   {
      //     label: '2021年',
      //     value: 2
      //   },
      //   {
      //     label: '2022年',
      //     value: 3
      //   },
      // ]
      showlist: {
        // confirmedCount: '0',//累计确诊
        // confirmedIncr: 0,//新增确诊
        // curedCount: '0',//累计治愈
        // curedIncr: 0,//新增治愈
        // currentConfirmedCount: '0',//现存确诊
        // currentConfirmedIncr: 0,//新增现存确诊
        // deadCount: '0',//累计死亡
        // deadIncr: 0,//新增死亡
        // suspectedCount: 0,//累计疑似
        // suspectedCountIncr: 0,//新增疑似
        // initdate: "20200701",
        confirmedCount: "65",
        confirmedIncr: "17",
        curedCount: "0",
        curedIncr: "0",
        currentConfirmedCount: "64",
        currentConfirmedIncr: "17",
        deadCount: "1",
        deadIncr: "0",
        suspectedCount: "0",
        suspectedCountIncr: "0",
      },
      datas1: [],
      datas2: []
    }
  },
  methods: {
    onChange(name, value, index) {
      console.log('item:', name, value, index)
      // if (this.datas1.length === 0 && this.datas2.length === 0) {
      //   this.datas1 = RECORDS.filter((item) => item.provinceName == name)
      //   console.log('1' + this.datas1)
      //   console.log('1' + this.datas2)
      // } else if (this.datas1.length === 0 && this.datas2.length !== 0) {
      //   let arr = this.datas2.filter((item) => item.provinceName == name)
      //   this.showlist = arr[0]
      //   this.datas1 = []
      //   console.log('2' + this.datas1)
      //   console.log('2' + this.datas2)
      // } else if (this.datas1.length !== 0 && this.datas2.length === 0) {
      //   this.datas1 = RECORDS.filter((item) => item.provinceName == name)
      //   console.log('3' + this.datas1)
      //   console.log('3' + this.datas2)
      // }
      const obj = RECORDS.filter((item) => item.dateId == `20200${this.selectedMonthValue}29` && item.provinceName == this.selectData1[this.selectedNameValue-1].label)
      this.showlist = obj[0]
    },
    onChange2(name, value, index) {
      console.log('item:', name, value, index)
      console.log('value' + value)
      // if (this.datas1.length === 0 && this.datas2.length === 0) {
      //   this.datas2 = RECORDS.filter((item) => item.dateId == `20200${value}29`)
      //   console.log(this.selectedMonthValue)
      //   console.log(this.selectedNameValue)
      //   console.log('1' + this.datas1)
      //   console.log('1' + this.datas2)
      // } else if (this.datas1.length !== 0 && this.datas2.length === 0) {
      //   let arr = this.datas1.filter((item) => item.dateId == `20200${value}29`)
      //   this.showlist = arr[0]
      //   this.datas2 = []
      //   console.log('2' + this.datas1)
      //   console.log('2' + this.datas2)
      // } else if (this.datas1.length === 0 && this.datas2.length !== 0) {
      //   this.datas2 = RECORDS.filter((item) => item.dateId == `20200${value}29`)
      //   console.log('3' + this.datas1)
      //   console.log('3' + this.datas2)
      // }
      this.showlist = RECORDS.filter((item) => item.dateId == `20200${this.selectedMonthValue}29` && item.provinceName == this.selectedMonthValue)
    }
  },

  watch: {
    selectedMonthValue(to) {
      console.log('selectedMonthValue:', to)
    },
    selectedNameValue(to) {
      console.log('selectedNameValue:', to)
    }
  },
  mounted() {
    //  this.datas = RECORDS.filter((item) => item.dateId == "20200701")
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 20px;
  margin-left: 50px;
}

.notices {
  display: flex;
  flex-direction: column;
  margin-left: 80px;
}

.selects {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
