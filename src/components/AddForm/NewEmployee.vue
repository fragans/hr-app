<template>
<v-container>
    <v-row class="title">
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

    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card class="p-4">
            <v-card-title class="headline text-center">Form Sent!</v-card-title>
            <v-card-actions class="items-center justify-center">

            <v-btn color="success" class="text-white" @click="redirect">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
                dialog:false,
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
            redirect(){
                this.$router.push({name:'Dashboard'})
            },
            insert()
            {
                this.$store.dispatch('employees/insert',this.employee).then(()=>{
                    this.dialog=true
                })
            }
        },
    }
</script>

<style scoped>

</style>