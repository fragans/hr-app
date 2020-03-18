<template>
    <v-container>
        <v-row class="title py-4">
          <v-skeleton-loader :loading="loading" height="50" width="250" max-width="300" type="list-item-avatar" >
              <v-card-title>
                {{$route.name}}
              </v-card-title>
          </v-skeleton-loader>  
      </v-row>
        <newApplicant />
    </v-container>
</template>

<script>
import newApplicant from '@/components/AddForm/NewApplicant.vue'
    export default {
        data(){
            return{
                loading:true
            }
            
        },
        components:{
            newApplicant
        },
        mounted(){
             setTimeout(()=>{
                this.loading = false
            },1000)
        }
    }
</script>

<style scoped>

</style>