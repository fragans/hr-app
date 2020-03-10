<template>
    <v-row >
            <v-col class="w-full">
                    
                    <v-skeleton-loader :loading="loading" height="50" max-width="300" type="list-item-avatar" >
                        <v-card-title>
                        <v-icon left>mdi-{{current_route.icon}}</v-icon>
                        <h1>{{$route.name}}</h1>
                        </v-card-title>
                    </v-skeleton-loader>
                
                <v-card-title>
                    <v-row>
                        <v-col col="6" class="float-sm-left"> 
                            <v-skeleton-loader :loading="loading" height="50" max-width="500" type="card-heading" >
                            <slot name="action"> </slot>
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
                    
                    <slot name="filter"></slot>
                    
                    </v-data-table>
                </v-skeleton-loader>
            </v-col>
        </v-row>
</template>

<script>
    export default {
        props:["headers" , "items", "search"],
        data(){
            return{
                loading:true,
                current_route: ''
            }
        },
        methods:{
            handleClick(value){
                console.log(value)
                this.$router.push({ name: 'Edit', params: { id:value.name } })
            }
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