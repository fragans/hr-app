<template>
    <v-container>
        <v-row class="title">
        <v-col col="6" class="flex justify-center items-center uppercase">
            <v-icon left>mdi-card-bulleted</v-icon>
            <h1>
                {{$route.name}}
                <!-- {{ $route.params.id }} -->
            </h1>
            
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="3">
            <v-btn class="mr-4" color="success" @click="updateApplicant">
                <v-icon left>mdi-content-save</v-icon>    
                save
            </v-btn>

            <v-menu>
                <template v-slot:activator="{ on}">
                    <v-btn color="primary" dark v-on="on">
                        Update Status
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in status" :key="index" @click="updateStatus(index)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn color="error" @click="dialog = true">
                <v-icon left>mdi-cancel</v-icon>    
                remove</v-btn>
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

        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card class="p-4">
                <v-card-title class="headline text-center">
                    <v-icon left>mdi-trash-can</v-icon>
                    Remove this?
                    </v-card-title>
                <v-card-actions class="items-center justify-center">
                
                <v-btn color="success" class="text-white" @click="remove">Ok</v-btn>
                <v-btn color="error" class="text-white" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '@/components/Edit/Profile'
import Occupation from '@/components/Edit/Occupation'
import Address from '@/components/Edit/Address'
import Emergency from '@/components/Edit/EmergencyContact'
import axios from 'axios'
    export default {
        components:{
            Profile,Occupation,Address,Emergency
        },
        data(){
            return{
                opsiStatus:['Pending','Approved','Rejected'],
                // status:'',
                tab: 0,
                currentTab:'Profile',
                items: [
                    {name:'Profile',icon:'account'},
                    {name:'Occupation',icon:'briefcase'},
                    {name:'Address',icon:'mailbox-open-outline'},
                    {name:'Emergency',icon:'alert-box-outline'},
                ],
                status: [
                    { title: 'Unprocessed', id:1 },
                    { title: 'Scheduled to Psycho Test', id:2 },
                    { title: 'Scheduled to Interview', id:3 },
                    { title: 'Finish', id:4 },
                ],
                data:'',
                loading:true,   
                dialog:false
            }
        },
        computed:{
            renderedComponent: () => {
                let self = this;
                return () => import('@/components/Edit/' + this.currentTab)
            },
            ...mapGetters({
                day:'dayoff/day',
                // employee: 'employees/person'
                // applicant: 'applicants/apply'
                employee: 'applicants/apply',

                dataEmployee: 'employees/persons'
            }),

            computedProp()
            {
                console.log('editapplicant')
                if(this.$route.name === 'Apply Job')
                {
                    console.log('apply ui')
                    return { data : this.employee }
                }
                else if(this.$route.name === 'New Applicant')
                {
                    console.log('new appl')
                    return { data : this.employee }
                }
                else if(this.$route.name === 'Edit Applicant Status')
                {
                    console.log('edit appl')
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
            filter(value){
                // let d = this.desserts;
                let d = this.persons
                var filtered  = d.filter((el)=>{
                    return el.status === value
                })
                this.copy = filtered
            },
            updateApplicant()
            {
                this.$store.dispatch('applicants/update',this.employee)
            },
            remove(){
                console.log('remove')
                // this.dialog=true
                this.$store.dispatch('applicants/remove',this.$route.params.id).then(()=>{
                    this.$router.push({name:'Applicants'})
                })
            },
            updateStatus(index)
            {
                console.log(this.status[index].title)

                this.$store.dispatch('applicants/updateStatusApplicant', {
                    id: this.$route.params.id,
                    name: this.employee.name,
                    email: this.employee.email,
                    phone: this.employee.phone,
                    position: this.employee.position,
                    division: this.employee.division,
                    birth_date: this.employee.birth_date,
                    birth_place: this.employee.birth_place,
                    photo: this.employee.photo,
                    status: this.status[index].title,
                    gender: this.employee.gender,
                    address: this.employee.address,
                    emergency_contact: [
                        {
                        name: this.employee.emergency_contact[0].name,
                        phone: this.employee.emergency_contact[0].phone
                        }
                    ],
                    id_employee: this.dataEmployee.length
                })
            }
        },
        created(){
            // this.$store.dispatch('dayoff/fetchById',this.$route.params.id)
            // .then(()=>{
            //     this.$store.dispatch('applicants/fetchById',this.$route.params.id)
            //     this.data = this.employee
            // })

            this.$store.dispatch('applicants/fetchById', this.$route.params.id)
              .then(()=>{
                  // console.log('emp/fetchById')
                this.data = this.employee
                this.loading = false
            })
        }
    }
</script>

<style scoped>
</style>