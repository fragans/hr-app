<template>
<v-container>
    <v-row class="title">
        <v-col col="3" class="flex justify-center items-center uppercase">
            <h1>
                Edit Employee
            </h1>
            
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="3">
            <v-btn class="mr-4" color="success">
                <v-icon left>mdi-content-save</v-icon>    
                save
            </v-btn>
            <v-btn color="error">
                <v-icon left>mdi-cancel</v-icon>    
                cancel</v-btn>
        </v-col>
    </v-row>
    <v-row>

        <v-col col="12">
            <v-tabs v-model="tab" background-color="transparent" grow >

                <v-tab v-for="item in items" :key="item" >
                    {{item}}
                </v-tab>

                <v-tab-item v-for="block in items" :key="block">           
                    <keep-alive>
                        <component :is="block" ></component>
                    </keep-alive>
                </v-tab-item >

            </v-tabs>

        </v-col>
        
    </v-row>
</v-container>
    
</template>

<script>
import Profile from '@/components/Edit/Profile'
import Occupation from '@/components/Edit/Occupation'
import Address from '@/components/Edit/Address'
import Emergency from '@/components/Edit/EmergencyContact'
    export default {
        components:{
            Profile,Occupation,Address,Emergency
        },
        data(){
            return {
                tab: 0,
                currentTab:'Profile',
                items: [
                'Profile', 'Occupation', 'Address', 'Emergency',
                ],
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
        computed:{
            renderedComponent: () => {
                let self = this;
                return () => import('@/components/' + this.currentTab)
            }
        },
        watch:{
            tab:function(val, OldVal) {
                this.currentTab = this.items[val];
            }
        },
        methods:{
            
        },
        created(){
            console.log(this.currentTab)
        }
    }
</script>

<style scoped>

</style>