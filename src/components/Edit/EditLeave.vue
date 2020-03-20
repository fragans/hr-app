<template>
    <v-content class="flex justify-center items-center">
        <v-row>
            <v-card class="mx-auto p-4 w-full">

            
                <v-col col="6">

                    <v-text-field
                    v-model="employee.name"
                    :counter="20"
                    label="Employee name"
                    disabled
                    ></v-text-field>

                    <v-text-field
                    v-model="day.date_start"
                    label="Start Date"
                    disabled
                    ></v-text-field>

                    <v-text-field
                    v-model="day.date_end"
                    label="End Date"
                    disabled
                    ></v-text-field>

                    <v-text-field
                    v-model="day.status"
                    label="Status"
                    disabled
                    ></v-text-field>

                </v-col>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col col="3" class="flex items-center justify-center">
                        <v-btn class="mr-4 " block color="success" v-if="day.status !== 'Approved'" @click="editStatus('Approved')">
                            <v-icon left>mdi-content-save</v-icon>    
                            Approve
                        </v-btn>
                        <v-btn class="mr-4" block  color="error" v-if="day.status !== 'Rejected'" @click="editStatus('Rejected')">
                            <v-icon left>mdi-cancel</v-icon>    
                            Reject
                        </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-card>
            
        </v-row>
        
        
    </v-content>    

</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data(){
            return{
                opsiStatus:['Pending','Approved','Rejected'],
                status:'',
            }
        },
        computed:{
            ...mapGetters({
                day:'dayoff/day',
                employee: 'employees/person'
            })
        },
        methods:{
            editStatus(value){
                this.$store.dispatch('dayoff/editStatus',
                {
                    id:this.$route.params.id,
                    emp_id:this.day.emp_id,
                    date_start:this.day.date_start,
                    date_end:this.day.date_end,
                    status:value,
                }
                )
            }
        },
        created(){
            this.$store.dispatch('dayoff/fetchById',this.$route.params.id)
            .then(()=>{
                this.$store.dispatch('employees/fetchById',this.day.emp_id)
            })
        }
    }
</script>

<style scoped>

</style>