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
        type:Object,
        default: ()=>({
          address:'',
          division:'',
          birth_date:'',
          birth_place:'',
          email:'',
          emergency_contact:[{
            name:'',
            phone:''
          }],
          gender:'',
          id:'',
          name:'',
          photo:'',
          position:'',
          status:''
        })
      },
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