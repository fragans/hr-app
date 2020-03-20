<template>
<v-container>
    <v-row class="title">
        <v-col col="6" class="flex justify-center items-center uppercase">
            <v-icon left>mdi-card-bulleted</v-icon>
            <h1>
                {{$route.name}} <!-- Employee -->
                <!-- {{ $route.params.id }} -->
            </h1>
            
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="3">
            <v-btn class="mr-4" color="success" @click="update">
                <v-icon left>mdi-content-save</v-icon>    
                save
            </v-btn>
            <v-btn color="error">
                <v-icon left>mdi-cancel</v-icon>    
                cancel</v-btn>
        </v-col>
    </v-row>
    <v-divider/>
    <v-card>

        <v-col col="12">
            <v-tabs v-model="tab" background-color="transparent" grow >

                <v-tab v-for="item in items" :key="item.name" color="success">
                    <v-icon left> mdi-{{item.icon}}</v-icon>
                    {{item.name}}
                </v-tab>
                <template v-if="!loading">
                <v-tab-item v-for="block in items" :key="block.name">           
                    <keep-alive>
                        <component :is="block.name" v-bind="computedProp" ></component>
                    </keep-alive>
                </v-tab-item >
                </template>

            </v-tabs>

        </v-col>
        
    </v-card>
</v-container>
    
</template>

<script>
import Profile from '@/components/Edit/Profile'
import Occupation from '@/components/Edit/Occupation'
import Address from '@/components/Edit/Address'
import Emergency from '@/components/Edit/EmergencyContact'
import axios from 'axios'
import {mapGetters} from 'vuex'

    export default
    {
        components:{
            Profile,Occupation,Address,Emergency
        },
        data(){
            return {
                tab: 0,
                currentTab:'Profile',
                items: [
                    {name:'Profile',icon:'account'},
                    {name:'Occupation',icon:'briefcase'},
                    {name:'Address',icon:'mailbox-open-outline'},
                    {name:'Emergency',icon:'alert-box-outline'},
                ],
                data:'',
                loading:true,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
        computed:{
            renderedComponent: () => {
                let self = this;
                return () => import('@/components/' + this.currentTab)
            },
            ...mapGetters({
                employee : 'employees/person'
            }),

            computedProp()
            {
                if (this.$route.name === 'Edit Employee')
                {
                    return { data: this.employee }
                }
                else if(this.$route.name === 'New Applicant')
                {
                    return {data : ''}
                }
            }
        },
        watch:{
            tab:function(val, OldVal) {
                this.currentTab = this.items[val].name;
            }
        },
        methods:{
            filter(value){
                // let d = this.desserts;
                let d = this.persons
                var filtered  = d.filter((el)=>{
                    return el.status === value
                })
                this.copy = filtered
            },

            update()
            {
                this.$store.dispatch('employees/update',this.employee)
            }
        },

        created()
        {
            // console.log('emp'+this.employee)
            // this.$store.dispatch('employees/fetchById', this.$route.params.id)
            this.$store.dispatch('employees/fetchById', 1)
              .then(()=>{
                this.data = this.employee
                this.loading = false
            })
        },
    }
</script>

<style scoped>

</style>