<template>

      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent color="" expand-on-hover app >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

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
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-item-icon>
              </template>
              <v-list-item-content>
                <v-list-item-title >{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
        </v-list-item>

      </v-list>

      <v-list-item-content v-if="!mini" class="px-4">
        <v-expand-transition>
          <v-switch v-show="!mini" :label="`Night mode`" v-model="$vuetify.theme.dark" ></v-switch>
        </v-expand-transition>
          
      </v-list-item-content>

    <template v-slot:append >
        <div class="pa-2">
          <v-btn block v-if="!mini" color="accent">
            <v-icon left> mdi-logout</v-icon>
            Logout</v-btn>
          <v-list-item-content v-else>
            <v-icon class="items-center"> mdi-logout</v-icon>
          </v-list-item-content>
        </div>
      </template>
    </v-navigation-drawer>

</template>

<script>
    export default {
        data(){
            return {
              drawer:true,
              mini:true,
              items: []
              
            }
        },
        methods:{

        },
        created(){
          let route = this.$router.options.routes
          this.items = route.filter((r)=>{
            return r.name !== 'Edit'
          })

        }
        
    }
</script>

<style scoped>

</style>