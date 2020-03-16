<template>
  <v-container class="home w-full ">

    <v-row class="justify-center flex-wrap items-stretch flex m-0">
      <div class="w-1/3 p-2 min-w-250" >
        <Card >
          <h3 slot="title" class="m-2" >Total Employees</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </div>
      
      <div class="w-1/3 p-2 min-w-250" >
        <Card >
          <h3 slot="title" class="m-2" >Out Today</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </div>
      
       <div class="w-1/3 p-2 min-w-250" >
        <Card >
          <h3 slot="title" class="m-2" >Total Employees</h3>
          <div slot="content">
            <h1 class="text-3xl mt-2 font-bold ml-4" >789</h1>
            <p slot="text" class="text-gray-300 ml-2">230 males/ 209 females</p>
          </div>
        </Card>
      </div>
    </v-row>

    <v-row>

      <v-col col="6">
        <List> 
          <h3 slot="title" class="uppercase text-center">upcoming events</h3>
          <div slot="content">
            <v-simple-table height="150">
              <template v-slot:default>

                <tbody>
                  <tr v-for="item in date" :key="item.date">
                    <td><v-icon>mdi-calendar</v-icon></td>
                    <td>{{ item.event }}</td>
                    <td>{{ item.date }}</td>
                  </tr>
                </tbody>

              </template>
            </v-simple-table>
          </div>
        </List>
      </v-col>

      <v-col col="6">
        <List> 
          <h3 slot="title" class="uppercase  text-center">New Applicants</h3>
          <div slot="content">
            <v-simple-table height="150">
              <template v-slot:default>

                <tbody>
                  <tr v-for="item in applies" :key="item.id">
                    <td><v-icon>mdi-account</v-icon></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ dateDiff(item.date) }}</td>
                  </tr>
                </tbody>

              </template>
            </v-simple-table>
          </div>
        </List>
      </v-col>

    </v-row>
    
    
    
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navDrawer from '@/components/Navigation/NavDrawer';
import Card from '@/components/Card'
import List from '@/components/List'
import { mapGetters } from 'vuex';
export default {
  components: {
    HelloWorld,
    navDrawer,
    Card,
    List
  },
  data(){
    return{
      date:[]
    }
  },
  computed:{
    ...mapGetters({
      applies: 'applicants/applies'
    })
  },
  methods:{
    dateDiff(date){
      const diff = require('human-date');
      return diff.relativeTime(date)

    }
  },
  mounted(){
    this.$store.dispatch('applicants/fetch')
  }
}
</script>
<style >
.min-w-250{
  min-width: 250px;
}

</style>
