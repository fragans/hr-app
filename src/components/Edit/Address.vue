<template>
    <v-row class="p-4">
        <v-col>
            <v-textarea v-model="data.address" label="Address" required  ></v-textarea>
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

    computed: {
      
    },

    methods: {
      submit () {
        // this.$v.$touch()
      },
      clear () {
        // this.$v.$reset()
        // this.name = ''
        // this.email = ''
        // this.select = null
        // this.checkbox = false
      }
    }
  }
</script>

<style scoped>

</style>