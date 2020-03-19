<template>
    <v-row class="p-4">
        <v-col>

            <v-textarea v-model="data.address" label="Address" required></v-textarea>

        </v-col>
        
        
    </v-row >
    
</template>

<script>

  export default {

    props:{
      data: {
        type: Object,
        default: {
          address : ''
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