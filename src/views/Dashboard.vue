<template>
  <v-container class="home w-full ">

    <v-row>
      <v-col cols="4">
        <Card class="m-8">
          <h3 slot="title" class="m-2" >Total Employees</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </v-col>
      
      <v-col cols="4">
        <Card class="m-8">
          <h3 slot="title" class="m-2" >Total Employees</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </v-col>
      
       <v-col cols="4">
        <Card class="m-8">
          <h3 slot="title" class="m-2" >Total Employees</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </v-col>
    </v-row>
    
    
    
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navDrawer from '@/components/Navigation/NavDrawer';
import Card from '@/components/Card'
export default {
  components: {
    HelloWorld,
    navDrawer,
    Card
  }
}
</script>
