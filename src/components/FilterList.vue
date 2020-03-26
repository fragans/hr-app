<template>
    <v-row >
            <v-col class="w-full">
                <v-row>
                    <v-col class="flex justify-end items-center">
                        
                        <v-btn color="purple" class="text-white mr-4">
                            <download-csv class="text-white" :data="items" :name="'Export '+new Date()">
                                export
                            </download-csv>
                        </v-btn>

                        <slot name="action">

                        </slot>
                    </v-col>
                    
                </v-row>    

                

                <v-card-title>
                    <v-row>
                        <v-col col="6" class="float-sm-left"> 
                            <v-skeleton-loader :loading="loading" height="50" max-width="500" type="card-heading" >
                            <slot name="filter"> </slot>
                            </v-skeleton-loader>
                        </v-col>
                        <v-col col=6>
                            <v-skeleton-loader :loading="loading" height="50" max-width="500" type="card-heading" >
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
                            </v-skeleton-loader>
                        </v-col>
                    
                        
                    </v-row>
                    

                </v-card-title>
                <v-skeleton-loader :loading="loading" max-width="3000" type="table-thead, table-tbody"  class="">
                    <v-data-table 
                    :headers="headers"
                    :items="items"
                    :search="search"
                    @click:row="handleClick"
                    >
                    
                    </v-data-table>
                </v-skeleton-loader>
            </v-col>
        </v-row>
</template>

<script>
    import downloadCsv from 'vue-json-csv'
    export default {
        props:["headers" , "items","rowClick"],
        components:{
            downloadCsv
        },
        
        data(){
            return{
                search:'',
                loading:true,
                current_route: '',
            }
        },
        methods:{
            handleClick(value){
                this.$router.push({ name: this.rowClick , params: { id:value.id } })
            },
        },
        created(){
            let self = this;
            setTimeout(()=>{
                self.loading = false;
            },500)
            
            const current_route =  this.$router.options.routes.filter((r)=>{
                return r.name === this.$route.name
            })
            this.current_route = current_route[0]
            
        }
    }
</script>

<style scoped>

</style>