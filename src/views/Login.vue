<template>
    
      <v-container
        class="fill-height"
        fluid
      >
        <v-row align="center" justify="center" class="mx-auto">
          <v-col cols="12" sm="12" md="4" >
            <v-card class="elevation-12" min-width="300" :loading="is_loading">
              <!-- <v-toolbar color="primary" dark flat >
                <v-toolbar-title>{{$route.name}}</v-toolbar-title>
                <v-spacer />
              </v-toolbar> -->
              <v-card-text>
                <v-form >
                  <v-text-field label="username" name="login" type="text" v-model="user.username" :disabled="is_loading"/>

                  <v-text-field id="password" label="Password" name="password" type="password" v-model="user.password" :disabled="is_loading"/>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="success" block @click="login()" :disabled="is_loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      data(){
        return{
          user: {
            username: 'admin',
            password: 'admin'
          }
        }
      },
      computed:{
          ...mapGetters({
                is_loading: 'user/is_loading',
                is_login: 'user/is_login'
            })
      },
      watch:{
        is_login(val,Oldval){
          if(val) this.$router.push({ name: 'Dashboard'}) 
        }
      },
      methods:{
          logout(){
            this.$store.commit('user/logout')
          },
          login(){
            this.$store.dispatch('user/userLogin', this.user)
          }
      },
      created(){
          this.logout()
      }   
    }
</script>

<style scoped>

</style>