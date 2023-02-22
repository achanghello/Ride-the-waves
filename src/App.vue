<template>
  <div id="app">
    <div class="home">
      <mv-full-page   
      :isPointer="true"
      pointerPos="right" 
      :isV="isV" 
      :pages="3" 
      :page.sync="currentPage" 
      :bgArr="bgArr" 
      :isCache="false"
      :transition="{
        duration: '500ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
      >
      <template #page1>
        <Pagefour></Pagefour>
      </template>
    
      <template #page2>
        <Pageone v-if="currentPage===2"></Pageone>
      </template>
    
      <template #page3>
        <Pagethree v-if="currentPage===3"></Pagethree>
      </template>
      </mv-full-page>
    </div>
 </div>
</template>

<script>
import MvFullPage from "mv-full-page";
import Pageone from "./views/pageone"
import Pagethree from "./views/pagethree"
import Pagefour from "./views/pagefour"
  export default {
    name:"App",
	data() {
	  return {
		isV: true,
		currentPage: 1,
		// bgArr: [{
		//   isBg: true,
		//   src: require('@/assets/....')
		// }, 'orange', 'pink', 'green']
	  };
	},
	components:{
		MvFullPage,
		Pagethree,
		Pageone,
		Pagefour
	}
  };
  </script>

<style>
h1{
  padding:0;
  margin:0;
}
</style>