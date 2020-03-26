<template>
    <v-container>
        <v-row>
          <v-skeleton-loader :loading="loading" height="50" width="250" max-width="300" type="list-item-avatar" >
            <v-card-title>
            <!-- <v-icon left>mdi-{{current_route.icon}}</v-icon> -->
            <h1>{{$route.name}}</h1>
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