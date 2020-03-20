<template>
    <v-container class="h-full">

        <v-row class="pt-4" width="300">
            <v-card class="p-8 mx-auto w-full max-w-md">
                
            <v-row>
                
                <v-select :loading="loading"  v-model="employee" :items="persons" item-text="name" item-value="id" label="Employee Name" placeholder="Identify yourself ... ">
                </v-select>
                
            </v-row>   
            <v-row>
                <v-menu v-model="show_start" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="startDate"
                        label="Start Date"
                        hint="YYYY-MM-DD format"
                        persistent-hint
                        @blur="date = parseDate(startDateFormatted)"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title ></v-date-picker>
                </v-menu>    
            </v-row> 
            <v-row>
                <v-menu v-model="show_end" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="endDate"
                        label="Start Date"
                        hint="YYYY-MM-DD format"
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
                    <v-btn block color="success" :disabled="selected = null" @click="submitDayOff">submit</v-btn>

                </v-col>
            </v-row>

                
            </v-card>


        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card class="p-4">
              <v-card-title class="headline text-center">Request Sent!</v-card-title>
              <v-card-actions class="items-center justify-center">

                <v-btn color="success" class="text-white" @click="redirect">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

            
        </v-row>
    </v-container>
</template>

<script>
import vueSelect from 'vue-select'
import { mapGetters } from 'vuex'
    export default {
         data: vm => ({
                dialog:false,
                loading: true,
                employee:'',
                startDate: new Date().toISOString().substr(0, 10),
                endDate: new Date().toISOString().substr(0, 10),
                show_end:false,
                show_start:false,
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

                const [month, day, year] = date.split('-')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
             formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${year}-${month}-${day}`
            },
            submitDayOff(){
                this.$store.dispatch('dayoff/insert',{
                    emp_id: this.employee,
                    date_start: this.startDate,
                    date_end: this.endDate,
                    status: 'Pending'
                })
                .then(()=>{
                    this.dialog =true
                })
            },
            redirect(){
                this.dialog = false
                this.$router.push({ name: 'Leave Request' })
            }
        },
        mounted(){
            this.$store.dispatch('employees/fetch')
            .then(()=>{
                this.loading = false
            })

        }
    }
</script>

<style scoped>

</style>