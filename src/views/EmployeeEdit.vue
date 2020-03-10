<template>
<v-content>
    <v-row class="title">
        <v-col col="3" class="flex justify-center items-center uppercase">
            <h1>
                Edit Employee
            </h1>
            
        </v-col>
        <v-spacer></v-spacer>
        <v-col col="3">
            <v-btn class="mr-4" color="success">save</v-btn>
            <v-btn color="error">cancel</v-btn>
        </v-col>
    </v-row>
    <v-row>

        <v-col col="12">
            <v-tabs v-model="tab" background-color="transparent" grow >
                <v-tab v-for="item in items" :key="item" >
                    {{item}}
                    
                </v-tab>
            </v-tabs>

            
                <v-tab-item  >
   
                        <keep-alive>
                            <component :is="this.items[0].toLowerCase()">

                            </component>        
                        </keep-alive>
                        
                        <!--  -->

                </v-tab-item>
            
        </v-col>
        
    </v-row>
</v-content>
    
</template>

<script>
import profile from '@/components/Edit/Profile'
import occupation from '@/components/Edit/Occupation'
    export default {
        components:{
            profile,occupation
        },
        data(){
            return {
                tab: 0,
                currentTab:'profile',
                items: [
                'Profile', 'Occupation', 'Address', 'Emergency Contacts',
                ],
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
        watch:{
            tab:function(val, OldVal) {
                this.currentTab = this.items[val].toLowerCase();
            }
        },
        methods:{
            currentTabComponent(){
                console.log(this.items[this.tab].toLowerCase())
                return this.items[this.tab].toLowerCase();
            }
        }
    }
</script>

<style scoped>

</style>