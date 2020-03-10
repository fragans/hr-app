<template>
    <v-col class="border border-gray-50 w-full rounded">
        <v-skeleton-loader :loading="loading" height="50" type="heading, text" >
        <div>
            <slot name="title" > </slot>    
        </div>
        </v-skeleton-loader>
        <v-divider></v-divider>
        <v-skeleton-loader :loading="loading" height="100" type="table-row-divider@3" >
        <div >
            <slot name="content" > </slot>
        </div>
        </v-skeleton-loader>
    </v-col>
</template>

<script>
    export default {
        inject: ['theme'],
        data(){
            return{
                loading: true
            }
        },
        created(){
            let self = this;
            setTimeout(()=>{
                self.loading = false;
            },500)
        }
        
    }
</script>

<style scoped>

</style>