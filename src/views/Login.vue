<template>
    
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center" justify="center" >
          <v-col cols="12" sm="12" md="4" >
            <v-card class="elevation-12" min-width="400">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>{{$route.name}}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="username" name="login" type="text" v-model="user.username" />

                  <v-text-field id="password" label="Password" name="password" type="password" v-model="user.password"/>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="success" block @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    
</template>

<script>
    export default {
      data(){
        return{
          user: {
            username: 'admin',
            password: 'admin'
          }
        }
      },
      methods:{
          logout(){
              this.$store.commit('user/logout')
          },
          login(){
            console.log('loging in')
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