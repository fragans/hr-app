<template>
    <v-col class="border border-gray-50 w-full rounded p-4">
        <div class="w-1/2 mx-auto">
            <v-skeleton-loader :loading="loading" height="20" type="image" class="mx-auto mt-2 mb-4" width="">
                <div>
                    <slot name="title" > </slot>    
                </div>
            </v-skeleton-loader>
        </div>
        

        <v-divider></v-divider>
        <div class="mt-4">
            <v-skeleton-loader :loading="loading" height="50" type="text@3" >
                <div >
                    <slot name="content" > </slot>
                </div>
            </v-skeleton-loader>
        </div>

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