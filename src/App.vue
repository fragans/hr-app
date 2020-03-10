<template>
 <v-app id="app">
   <!-- <v-content class="min-h-screen "> -->
     
      <navDrawer class=""> </navDrawer>
    
      <v-content fluid accent>
        <!-- memanggil router , sesuai folder [views] -->
        
        <router-view></router-view>
      </v-content>
            
      
     
  <!-- </v-content> -->
</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import navDrawer from './components/Navigation/NavDrawer';
export default {
  name: 'App',

  components: {
    HelloWorld,
    navDrawer
  },

  data: () => ({
    //
  }),
};
</script>
