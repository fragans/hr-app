<template>
    <v-container class="max-w-md">
        <!-- <v-row class="min-h-screen "> -->
            

                <v-row class="flex justify-center my-16 ">
                    <v-icon left>mdi-calendar-check</v-icon>
                    <span class="uppercase">{{$route.name}}</span>
                </v-row>

                <v-row class="my-16 ">
                    <v-select :loading="loading"  v-model="employee" :items="persons" item-text="name" item-value="id" label="Employee Name" placeholder="Identify yourself ... ">
                    </v-select>

                    <v-btn class="mx-2" fab  @click="checkIn">
                        <v-icon dark>mdi-check</v-icon>
                    </v-btn>
                </v-row>
                <v-row v-if="clockIn">
                    <v-col class="text-center">
                        Recorded! {{employee.name}} @in {{attend.in}} @out {{param.time}}
                    </v-col>
                </v-row>
      

    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data: vm =>({
                weekdays: [1,2,3,4,5],
                employee:'',
                loading: true,
                events: [],
                clockIn: false,
                param: {
                    id:'',
                    date: '',
                    time: ''
                }

        }),
        computed:{
            ...mapGetters({
                persons: 'employees/persons',
                attend : 'attendance/attend'
            })
        },
        methods:{
            checkIn(){
                this.param.id = this.employee
                this.$store.dispatch('attendance/clockOut', this.param )
                this.clockIn =true
                console.log(this.attend.in === undefined)
                // setTimeout(()=>{
                //     location.reload()
                // },1500)
            }
        },
        created(){
            this.$store.dispatch('employees/fetch').then(()=>{
                this.loading=false
            })
            let time = new Date().toLocaleTimeString('id').split(".").join(":")
            let date = new Date().toLocaleString('id').substr(0,10).split("/").join("-")
            let [day,month,year] = date.split('-')
            // console.log(day,month < 10 ? '0'+month: month,year)
            this.param.time = time;
            let m=(month < 10 ? '0'+ month : month);
            let d=(day < 10 ? '0'+ day : day);
            let dt =year+'-'+m+'-'+d
            this.param.date =  dt.split(" ").join("")

        }
    }
</script>

<style scoped>
.circle{
    border-radius: 100%;
    min-width: 300px;
    min-height: 300px;
}
</style>