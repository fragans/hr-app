<template>

      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent class="" app >
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
        <v-list-item v-for="item in $router.options.routes" :key="item.name" link  >
            
            <v-list-item-icon class="py-4">
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <router-link :to="item">
              <v-list-item-title >{{ item.name }}</v-list-item-title>
              </router-link>
            </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-list-item-content v-if="!mini" class="px-4">
        <v-expand-transition>
          <v-switch v-show="!mini" :label="`Night mode`" v-model="$vuetify.theme.dark" ></v-switch>
        </v-expand-transition>
          
      </v-list-item-content>

    <template v-slot:append >
        <div class="pa-2">
          <v-btn block v-if="!mini">Logout</v-btn>
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
              mini:true
            }
        },
        methods:{

        },
        
    }
</script>

<style scoped>

</style>