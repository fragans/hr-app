<template>
    <v-row class="p-4">
        <v-col>
            <v-text-field v-model="data.position"  label="Position" required ></v-text-field>

            <v-text-field v-model="data.division" label="Department" required ></v-text-field>

        </v-col>
        
    </v-row >
    
</template>

<script>

  export default {
   
    props:{
      data: {
        type: Object,
        default: {
          position : '',
          division : ''
        }
      }
    },


    data: () => ({
      
    }),

    computed: {
      
    },

    methods: {
      
    },
  }
</script>

<style scoped>

</style>