<template>
<v-container>
    <v-row class="title">
        <v-col class="text-gray-450">
            {{this.employee.status}} Employee
        </v-col>
        <v-col col="3" class="justify-end flex">
            <v-menu>
                <template v-slot:activator="{ on}">
                    <v-btn color="primary" dark v-on="on">
                        <v-icon left>mdi-update</v-icon> Status
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in status" :key="index" @click="updateStatus(index)">
                        <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn class="mx-4" color="success" @click="update">
                <v-icon left>mdi-content-save</v-icon>    
                save
            </v-btn>
            <v-btn color="error" @click="removeConfirm('remove')">
                <v-icon left>mdi-cancel</v-icon>    
                remove
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
    <v-dialog v-model="dialog" persistent max-width="400">
        <v-card class="">
            
            
            
            <v-card-title class="headline text-center flex break-words m-0 py-8 justify-center ">
                <v-icon v-if="dialogAction == 'remove'" left x-large>mdi-trash-can</v-icon>    
                <span>{{dialogText}} ?</span>
                
            </v-card-title>

            <v-card-actions class="items-center justify-end bg-gray-150">
            
                <v-btn v-if="dialogAction == 'remove'" color="success" outlined class="text-white" @click="remove" >{{dialogAction}}</v-btn>
                <v-btn color="error" class="text-white" @click="dialog = !dialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
                dialog:false,
                dialogText: '',
                dialogAction:'',
                status:['Permanent','Probation','Contract']
                
            }
        },
        computed:{
            renderedComponent: () => {
                let self = this;
                return () => import('@/components/Edit/' + this.currentTab)
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
                // console.log('up')
                // console.log(this.employee)
                this.$store.dispatch('employees/update',this.employee)
            },
            updateStatus(idx){

                this.employee.status = this.status[idx]
                this.$store.dispatch('employees/update',this.employee).then(()=>{
                    this.dialogText='Change status to '+this.status[idx]
                    this.dialog = true
                })
                
            },
            removeConfirm(action){

                this.dialogText = 'Remove this employee';
                this.dialogAction = action;
                this.dialog = true;
            },
            remove(){
                this.$store.dispatch('employees/remove',this.$route.params.id).then(()=>{
                    this.$router.push({name:'Employees'})
                })
            }
        },
        created()
        {
            // console.log('emp'+this.employee)
            this.$store.dispatch('employees/fetchById', this.$route.params.id)
              .then(()=>{
                  console.log('emp/fetchById')
                this.data = this.employee
                this.loading = false
            })
        },
    }
</script>

<style scoped>
</style>