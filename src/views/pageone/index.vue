<template>
  <div>
    <div class="header"></div>
    <div class="selects">
      <VueAmazingSelector :selectData="selectData1" :defaultValue="defaultValue" name="label" value="value"
        placeholder="请选择省份" :width="160" :height="36" :num="6" v-model="selectedValue" @change="onChange">
      </VueAmazingSelector>
      <VueAmazingSelector :selectData="selectData2" :defaultValue="defaultValue" name="label" value="value"
        placeholder="请选择年份" :width="160" :height="36" :num="6" v-model="selectedValue" @change="onChange">
      </VueAmazingSelector>
      <VueAmazingSelector :selectData="selectData3" :defaultValue="defaultValue" name="label" value="value"
        placeholder="请选择月份" :width="160" :height="36" :num="6" v-model="selectedValue" @change="onChange">
      </VueAmazingSelector>
    </div>
    <div class="container">
      <Canvas></Canvas>
      <div class="notices">
        <Notice :type="'感染人员'" :number="222232"></Notice>
        <Notice :type="'治愈人员'" :number="222232"></Notice>
        <Notice :type="'死亡人员'" :number="222232"></Notice>
      </div>
    </div>
</div>
</template>

<script>
import Canvas from '../../components/Canvas.vue'
import Notice from '../../components/Notice.vue'
import VueAmazingSelector from '../../components/VueAmazingSelector.vue'

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
          value: 1
        },
        {
          label: '山西省',
          value: 2,
        },
        {
          label: '辽宁省',
          value: 3
        },
        {
          label: '吉林省',
          value: 4
        },
        {
          label: '黑龙江省',
          value: 5
        },
        {
          label: '江苏省',
          value: 6
        },
        {
          label: '浙江省',
          value: 7
        },
        {
          label: '安徽省',
          value: 8
        },
        {
          label: '福建省',
          value: 9
        },
        {
          label: '江西省',
          value: 10
        },
        {
          label: '山东省',
          value: 11
        },
        {
          label: '河南省',
          value: 12
        },
      ],
      defaultValue: '',
      selectedValue: 1,
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
        },
        {
          label: '7月',
          value: 7
        },
        {
          label: '8月',
          value: 8
        },
        {
          label: '9月',
          value: 9
        },
        {
          label: '10月',
          value: 10
        },
        {
          label: '11月',
          value: 11
        },
        {
          label: '12月',
          value: 12
        },
      ],
      selectData2: [
        {
          label: '2020年',
          value: 1,
        },
        {
          label: '2021年',
          value: 2
        },
        {
          label: '2022年',
          value: 3
        },
      ]
    }
  },
  methods: {
    onChange(name, value, index) {
      console.log('item:', name, value, index)
    }
  },

  watch: {
    selectedValue(to) {
      console.log('selectedValue:', to)
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  background-color: aquamarine;
}

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
  margin-top: 20px;
}
</style>
