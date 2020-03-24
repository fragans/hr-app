<template>
<v-container>
    <v-row class="title">
        
        <v-col col="3" class="justify-end flex">
            <v-btn class="mr-4" color="success" @click="update">
                <v-icon left>mdi-content-save</v-icon>    
                save
            </v-btn>
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
            <v-card-title class="headline text-center">remove employee?</v-card-title>
            <v-card-actions class="items-center justify-center">

            <v-btn color="success" class="text-white" @click="remove">Ok</v-btn>
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
                dialog:false
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
            remove(){
                console.log('remove')
                // this.dialog=true
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