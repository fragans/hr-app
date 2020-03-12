<template>

      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent color="" expand-on-hover app >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{$store.state.user.user.username}}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini" >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense >
        <v-list-item v-for="item in items" :key="item.name" link  >
            <router-link :to="item" class="flex" >
              <template @click.stop="mini = !mini">
              <v-list-item-icon class="py-4">
                <v-badge bordered bottom color="red accent-4" dot v-if="leaveReq>0 && item.name === 'Leave Request'">
                  <v-icon>mdi-{{ item.icon }}</v-icon>
                </v-badge>
                <v-icon v-else>mdi-{{ item.icon }}</v-icon>
              </v-list-item-icon>
              </template>
              <v-list-item-content>
                <v-list-item-title >
                  
                  {{ item.name }}
                  <template v-if="(item.name === 'Leave Request')" >
                    <span class="bg-red-thunderbird-400 text-white px-1 ml-2">

                    {{leaveReq}}
                    </span>
                  </template>
                </v-list-item-title>
                
              </v-list-item-content>
            </router-link>
        </v-list-item>

      </v-list>

      <v-list-item-content v-if="!mini" class="px-4">
        <v-expand-transition>
          <v-switch v-show="!mini" :label="`Night mode`" v-model="setTheme" ></v-switch>
        </v-expand-transition>
          
      </v-list-item-content>

    <template v-slot:append >
        <div class="pa-2">
          
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">

                <v-btn color="secondary" v-show="!mini"  v-on="on" block>
                  <v-icon left> mdi-logout</v-icon>
                  Logout
                </v-btn>
                                
            </template>
            <v-card>
              <v-card-title class="headline text-center">Logout?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="logout">Logout</v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-navigation-drawer>

</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return {
              drawer:true,
              mini:true,
              items: [],
              exclude_route:['Login','Edit'],
              dialog: false,
              dark:false,
              setTheme:false,
              leaveReq: 0,
            }
        },
        watch:{
          setTheme(val,OldVal) {
              let dark = val? "1" : "0"
              this.$vuetify.theme.dark = val
              localStorage.setItem('dark',dark)
            
            
            return dark
        }
        },
        methods:{
          logout(){
            this.$router.push({ name: 'Login' })
          },
          fetchLeaveReq(){
            axios.get('http://localhost:3000/outtoday').then(({ data })=>{
            console.log(data.length)
            this.leaveReq = data.length
            // this.desserts = data
            // this.copy = this.desserts;
          })
          }
        },
        created(){
          let route =this.$router.options.routes;
          this.items = this.$router.options.routes.filter((el)=>{
            return el.meta.nav
          })
          this.fetchLeaveReq()
         
          
          
          // if (index !== -1) array.splice(index, 1);

        }
        
    }
</script>

<style scoped>

</style>