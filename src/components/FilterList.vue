<template>
    <v-row >
            <v-col class="w-full">
                <v-row>
                    <v-col>
                        <v-skeleton-loader :loading="loading" height="50" max-width="300" type="list-item-avatar" >
                            <v-card-title>
                            <v-icon left>mdi-{{current_route.icon}}</v-icon>
                            <h1>{{$route.name}}</h1>
                            </v-card-title>
                        </v-skeleton-loader>    
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="flex justify-around items-center">
                        

                            <!-- <v-btn @click="exportCSV">Export</v-btn>
                            <v-btn @click="exportAllCSV">Export All</v-btn> -->
                            <v-btn color="purple" class="text-white">

                            
                            <download-csv v-if="items.length > 0" class   = "text-white" :data="items" :name="'export '+new Date()">
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
        props:["headers" , "items", "search"],
        components:{
            downloadCsv
        },
        
        data(){
            return{
                loading:true,
                current_route: '',
            }
        },
        methods:{
            handleClick(value){
                this.$router.push({ name: 'Edit', params: { id:value.id } })
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