<template>
 <v-app id="app">
     
      <navDrawer v-if="isLogin" > </navDrawer>
    
      <v-content fluid>
        <!-- memanggil router , sesuai folder [views] -->
        <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
      </v-content>
            
</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import navDrawer from './components/Navigation/NavDrawer';
import {  mapGetters } from 'vuex'
export default {
  name: 'App',

  components: {
    HelloWorld,
    navDrawer
  },

  data: () => ({
    //
  }),
  computed:{
    ...mapGetters({
      isLogin: 'user/checkLogin',
    })
  }
  
};
</script>

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
