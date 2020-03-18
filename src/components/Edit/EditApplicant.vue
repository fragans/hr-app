<template>
    <v-content>
       
        <v-row>
            <v-card class="mx-auto p-4 w-full">

            
                <v-col col="6">

                    <v-text-field
                    v-model="employee.name"
                    :counter="10"
                    label="Employee name"
                    disabled
                    ></v-text-field>

                    <v-text-field
                    v-model="day.date"
                    label="Start Date"
                    disabled
                    ></v-text-field>

                    <v-text-field
                    v-model="day.date"
                    label="End Date"
                    disabled
                    ></v-text-field>

                </v-col>
                <v-row>

                    <v-col col="3" class="flex items-center justify-center w-full">
                        <v-btn class="mr-4 "  color="success">
                            <v-icon left>mdi-content-save</v-icon>    
                            Send
                        </v-btn>
                        <v-btn class="mr-4"   color="error">
                            <v-icon left>mdi-cancel</v-icon>    
                            Send
                        </v-btn>
                        <v-btn class="mr-4"   color="error" @click="dialog = true">
                            <v-icon left>mdi-account-remove</v-icon>    
                            Remove
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
            
        </v-row>
        
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card class="p-4">
                <v-card-title class="headline text-center">
                    <v-icon left>mdi-trash-can</v-icon>
                    Remove this?
                    </v-card-title>
                <v-card-actions class="items-center justify-center">
                
                <v-btn color="success" class="text-white" @click="removeApplicant">Ok</v-btn>
                <v-btn color="error" class="text-white" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </v-content>    

</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data(){
            return{
                opsiStatus:['Pending','Approved','Rejected'],
                status:'',
                dialog: false
            }
        },
        computed:{
            ...mapGetters({
                day:'dayoff/day',
                employee: 'employees/person'
            })
        },
        methods:{
            removeApplicant(){
                this.$store.dispatch('applicants/remove',this.$route.params.id)
                .then(()=>{
                    this.$router.push({ name: 'Applicants' })
                })
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