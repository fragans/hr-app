<template>
    <v-content>
       
        <v-row>
            <v-card class="mx-auto p-4 w-full">

            
                <v-col col="6">

                    <v-text-field
                    v-model="applicant.name"
                    :counter="10"
                    label="Employee name"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="applicant.email"
                    :counter="10"
                    label="Email"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="applicant.phone"
                    :counter="10"
                    label="Phone"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="applicant.position"
                    :counter="10"
                    label="Position"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="applicant.division"
                    :counter="10"
                    label="Division"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="applicant.status"
                    :counter="10"
                    label="Status"
                    
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
<<<<<<< HEAD
                    <v-spacer></v-spacer>
                    <v-col col="3" class="flex items-center justify-center">
                        <v-btn class="mr-4 " block color="success" @click="updateApplicant">
=======

                    <v-col col="3" class="flex items-center justify-center w-full">
                        <v-btn class="mr-4 "  color="success">
>>>>>>> 4f4a019529be5274f7b68e4d0d53bc8fdf5671d8
                            <v-icon left>mdi-content-save</v-icon>    
                            Update
                        </v-btn>
<<<<<<< HEAD
                        <!-- <v-btn class="mr-4 " block color="success" @click="updateStatusApplicant">
                            <v-icon left>mdi-content-save</v-icon>    
                            Update Status
                        </v-btn> -->
                       <!-- <v-btn class="mr-4" block  color="error">
                            <v-icon left>mdi-cancel</v-icon>    
                            Cancel
                        </v-btn> -->

                        <v-btn class="mr-4" block  color="error" @click="deleteApplicant">
                            <v-icon left>mdi-delete</v-icon>    
                            Delete
=======
                        <v-btn class="mr-4"   color="error">
                            <v-icon left>mdi-cancel</v-icon>    
                            reject
                        </v-btn>
                        <v-btn class="mr-4"   color="error" @click="dialog = true">
                            <v-icon left>mdi-account-remove</v-icon>    
                            Remove
>>>>>>> 4f4a019529be5274f7b68e4d0d53bc8fdf5671d8
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
<<<<<<< HEAD
                // status:'',
=======
                status:'',
                dialog: false
>>>>>>> 4f4a019529be5274f7b68e4d0d53bc8fdf5671d8
            }
        },
        computed:{
            ...mapGetters({
                day:'dayoff/day',
                applicant: 'applicants/apply'
            })
        },
<<<<<<< HEAD

        methods:{
            updateApplicant()
            {
                let data = {
                      "id": this.$route.params.id,
                      "name": this.data.name,
                      "email": "HArdcode",
                      "phone": "HArdcode",
                      "position": "HArdcode",
                      "division": "HArdcode",
                      "photo": "0",
                      "status": "HArdcode",
                      "gender": "Male"
                }

                this.$store.dispatch('applicants/update',data)
            },

            deleteApplicant()
            {
                console.log("di editapplicant, id : "+this.$route.params.id)
                let id = this.$route.params.id
                this.$store.dispatch('applicants/delete', id)
            }

        },

=======
        methods:{
            removeApplicant(){
                this.$store.dispatch('applicants/remove',this.$route.params.id)
                .then(()=>{
                    this.$router.push({ name: 'Applicants' })
                })
            }
        },
>>>>>>> 4f4a019529be5274f7b68e4d0d53bc8fdf5671d8
        created(){
            this.$store.dispatch('dayoff/fetchById',this.$route.params.id)
            .then(()=>{
                this.$store.dispatch('applicants/fetchById',this.$route.params.id)
                this.data = this.applicant
            })
        }
    }
</script>

<style scoped>

</style>