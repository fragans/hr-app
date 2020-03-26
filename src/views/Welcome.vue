<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-col class="flex">
                    <v-icon left>mdi-account-group</v-icon>
                    <h1>{{$route.name}}</h1>
                </v-col>
                
                <v-col class="flex justify-end">
                    <v-btn outlined to="login">HR Login</v-btn>
                </v-col>
            </v-card-title>
        </v-card>

        <v-card :color="item.color" :to="item.path" dark class="mt-4" v-for="item in items" :key="item.name">
            <v-card-title class="headline">
                <v-icon left>mdi-{{item.icon}}</v-icon>
                {{item.role}} {{item.name}}</v-card-title>

            <!-- <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle> -->

            <v-card-actions class="justify-end flex">
              <v-btn text :to="item.path" >{{item.name}} now</v-btn>
            </v-card-actions>
        </v-card>


    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                items: [
                    {role:'Employee',name:'clock-in',path:'clockin', subtitle:'',icon:'calendar-check',color:'#385F73'},
                    {role:'Employee',name:'clock-out',path:'clockout', subtitle:'',icon:'calendar-remove',color:'#1F7087'},
                    {role:'Employee',name:'leave request',path:'offwork/add', subtitle:'',icon:'run-fast',color:'#26c6da'},
                    {role:'',name:'Apply job',path:'recruit', subtitle:'',icon:'account-tie',color:'#952175'},
                ]
            }
        },
        methods:{
          logout(){
            this.$store.commit('user/logout')
          }
      },
      created(){
          this.logout()
      } 
    }
</script>

<style scoped>

</style>