<template>
    <v-content>
        <v-row class="title py-4">
            <v-col col="6" class="flex justify-center items-center uppercase">
                <v-icon left>mdi-card-bulleted</v-icon>
                <h1>{{$route.name}}</h1>
                
            </v-col>
           
        </v-row>
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
                    <v-spacer></v-spacer>
                    <v-col col="3" class="flex items-center justify-center">
                        <v-btn class="mr-4 " block color="success" @click="updateApplicant">
                            <v-icon left>mdi-content-save</v-icon>    
                            Update
                        </v-btn>
                        <!-- <v-btn class="mr-4 " block color="success" @click="updateStatusApplicant">
                            <v-icon left>mdi-content-save</v-icon>    
                            Update Status
                        </v-btn> -->
                        <v-btn class="mr-4" block  color="error">
                            <v-icon left>mdi-cancel</v-icon>    
                            Cancel
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
                // status:'',
            }
        },
        computed:{
            ...mapGetters({
                day:'dayoff/day',
                // employee: 'employees/person'
                applicant: 'applicants/apply'
            })
        },

        methods:{
            updateApplicant()
            {
                let data = {
                      "id": this.$route.params.id,
                      "name": this.applicant.name,
                      "email": this.email,
                      "phone": this.phone,
                      "position": this.position,
                      "division": this.division,
                      "photo": "0",
                      "status": this.applicant.status,
                      "gender": this.gender
                }

                this.$store.dispatch('applicants/update',data)
            }

        },

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