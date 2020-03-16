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
                    <v-spacer></v-spacer>
                    <v-col col="3" class="flex items-center justify-center">
                        <v-btn class="mr-4 " block color="success">
                            <v-icon left>mdi-content-save</v-icon>    
                            Send
                        </v-btn>
                        <v-btn class="mr-4" block  color="error">
                            <v-icon left>mdi-cancel</v-icon>    
                            Send
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