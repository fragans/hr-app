<template>
<v-container>
    <v-row class="title">
        <v-col col="6" class="flex justify-center items-center uppercase">
            <v-icon left>mdi-card-bulleted</v-icon>
            <h1>
                {{$route.name}} 
            </h1>
            
        </v-col>
        <v-col col="3">
            <v-file-input 
            v-model="files" 
            dense
            label="Upload CV"
            @change="onSelect" 
            accept="application/pdf" 
            show-size
            >
            </v-file-input>   
        </v-col>
        <v-col col="3">
            <v-btn class="mr-4" color="success" @click="insert" block>
                <v-icon left>mdi-email-outline</v-icon>    
                submit data
            </v-btn>
            
            
        </v-col>
        
    </v-row>
    <v-divider/>
    <v-card>

        <v-col col="12">
            <v-tabs v-model="tab" background-color="transparent" grow >

                <v-tab v-for="item in items" :key="item.name" color="success" show-arrows>
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
import CV from '@/components/Edit/CV'
import axios from 'axios'
import {mapGetters} from 'vuex'

    export default
    {
        components:{
            Profile,Address,Emergency,Occupation,CV
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
                    // {name:'CV',icon:'book-account'},
                ],
                data:'',
                files:[],
                 rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
                convertedPDF:'',
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
                            status:'',
                            cv:'',
                            date:''
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
                console.log(this.employee)
                this.$store.dispatch('applicants/insert',this.employee)
            },
            onSelect(e){

                var f = this.files; // FileList object
                if(this.files.length === 0 ) return
                console.log('file_size='+this.files.size)
                if(this.files.size < 2000000){
                    var reader = new FileReader();

                    reader.onload = (()=> {
                        return (e)=> {
                            var binaryData = e.target.result;
                            //Converting Binary Data to base 64
                            var base64String = window.btoa(binaryData)
                            //showing file converted to base64
                            this.convertedPDF = base64String
                            // this.image = base64String
                            this.employee.cv=this.convertedPDF
                            console.log('decoded_size='+base64String.length)
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    console.log('convert to 64 success!')
                    reader.readAsBinaryString(f);
                }else{
                    this.dialog = true
                    this.files=[]
                }
                    

                
            },
        },
        created(){
            let now = new Date().toISOString().substr(0, 10)
            // console.log('now='+now);
            const [year, month, day] = now.split('-')

            
            this.employee.date = (year+'-'+month+'-'+day)
        }
    }
</script>

<style scoped>

</style>