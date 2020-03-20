<template>
    <v-container>
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