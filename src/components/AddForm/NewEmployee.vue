<template>
<v-container>
    <v-row class="title">
        <v-col col="6" class="flex justify-center items-center uppercase">
            <v-icon left>mdi-card-bulleted</v-icon>
            <h1>
                {{$route.name}}
            </h1>
            
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="3">
            <v-btn block class="mr-4" color="success" @click="insert">
                <v-icon left>mdi-content-save-outline</v-icon>    
                save
            </v-btn>
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
                <template>
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
import Address from '@/components/Edit/Address'
import Occupation from '@/components/Edit/Occupation'
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
                employee:
                        {
                            address:'',
                            division:'',
                            birth_date:'',
                            birth_place:'',
                            email:'',
                            emergency_contact:[{
                                name:'',
                                phone:''
                            }],
                            gender:'',
                            name:'',
                            photo:'',
                            position:'',
                            status:''
                        }
            }
        },
        computed:{
            renderedComponent: () => {
                let self = this;
                return () => import('@/components/' + this.currentTab)
            },

            computedProp()
            {
                console.log('asdasdas')
                if(this.$route.name === 'New Employee')
                {
                    console.log('apply ui')
                    return { data : this.employee }
                }
            }
        },
        watch:{
            tab:function(val, OldVal) {
                this.currentTab = this.items[val].name;
            }
        },
        methods:{
            insert()
            {
                this.$store.dispatch('employees/insert',this.employee)
            }
        },
    }
</script>

<style scoped>

</style>