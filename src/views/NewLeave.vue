<template>
    <v-container class="h-full">
        <v-row>
            <v-col>
                <v-skeleton-loader :loading="loading" height="50" max-width="300" type="list-item-avatar" >
                    <v-card-title>
                    <v-icon left>mdi-{{$route.meta.icon}}</v-icon>
                    <h1>{{$route.name}}</h1>
                    </v-card-title>
                </v-skeleton-loader>    
            </v-col>
            
        </v-row>  
        <v-row class="pt-4" width="300">
            <v-card class="p-8 mx-auto w-full max-w-md">


            <v-row>
                
                <v-select :loading="loading"  v-model="selected" :items="persons" item-text="name" item-value="id" label="Employee Name" placeholder="Identify yourself ... ">

                </v-select>
                
            </v-row>   
            <v-row>
                <v-menu v-model="dayoff" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="startDateFormatted"
                        label="Start Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        @blur="date = parseDate(startDateFormatted)"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title ></v-date-picker>
                </v-menu>    
            </v-row> 
            <v-row>
                <v-menu v-model="dayoff" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="endDateFormatted"
                        label="Start Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        @blur="date = parseDate(endDateFormatted)"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title ></v-date-picker>
                </v-menu>    
            </v-row> 
            <v-row>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn block color="success" @click="submitDayOff">submit</v-btn>

                </v-col>
            </v-row>

                
            </v-card>

            
        </v-row>
    </v-container>
</template>

<script>
import vueSelect from 'vue-select'
import { mapGetters } from 'vuex'
    export default {
         data: vm => ({

                loading: true,
                selected:'',
                startDate: new Date().toISOString().substr(0, 10),
                endDate: new Date().toISOString().substr(0, 10),
                dayoff:'',
                startDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
                endDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),

        }),
        computed:{
            ...mapGetters({
                persons: 'employees/persons'
            })
        },
        methods:{
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
             formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            submitDayOff(){
                this.$store.dispatch('dayoff/insert',{
                    emp_id: this.selected,
                    date: this.startDateFormatted,
                    status: 'Pending'
                })
            }
        },
        mounted(){
            this.$store.dispatch('employees/fetch')
            .then(()=>{
                this.loading = false
                // console.log(this.persons)
            })

        }
    }
</script>

<style scoped>

</style>