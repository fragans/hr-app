<template>
    <v-container>
        <v-row>
          <v-skeleton-loader :loading="loading" height="50" max-width="300" type="list-item-avatar" >
            <v-card-title>
            <v-icon left>mdi-{{current_route.icon}}</v-icon>
            <h1>{{$route.name}}</h1>
            </v-card-title>
          </v-skeleton-loader>
        </v-row>
        <v-row>
          
              <v-skeleton-loader :loading="loading" max-width="3000" type="table-thead, table-tbody"  class="">
                  <v-data-table 
                  :headers="headers"
                  :items="items"
                  >
                  
                  </v-data-table>
              </v-skeleton-loader>
          
      </v-row>
    </v-container>

</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      items:[],
      search:'',
      headers:'',
      current_route: '',
      loading: true
    }),
    methods:{
        intervalFormat(interval){
            return interval.time
        }
    },
    computed:{
      ...mapGetters({
        attends:'attendance/attends'
      })
    },
    created(){
      this.$store.dispatch('attendance/fetch').then(()=>{

      })
        const d = new Date();
        this.today  = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()

        let self = this;
            setTimeout(()=>{
                self.loading = false;
            },1000)
            

        const current_route =  this.$router.options.routes.filter((r)=>{
                return r.name === this.$route.name
            })
        this.current_route = current_route[0]
    }
  }
</script>

<style scoped>

</style>