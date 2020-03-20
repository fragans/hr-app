<template>
    <v-row class="p-4">
        <v-col>
            <v-text-field v-model="data.emergency_contact[0].name" label="Person Name"></v-text-field>

            <v-text-field v-model="data.emergency_contact[0].phone" label="Person Contact"></v-text-field>
             
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
      //test
    }),
    computed: {
      // checkboxErrors () {
      //   const errors = []
      //   if (!this.$v.checkbox.$dirty) return errors
      //   !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      //   return errors
      // },
      // selectErrors () {
      //   const errors = []
      //   if (!this.$v.select.$dirty) return errors
      //   !this.$v.select.required && errors.push('Item is required')
      //   return errors
      // },
      // nameErrors () {
      //   const errors = []
      //   if (!this.$v.name.$dirty) return errors
      //   !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      //   !this.$v.name.required && errors.push('Name is required.')
      //   return errors
      // },
      // emailErrors () {
      //   const errors = []
      //   if (!this.$v.email.$dirty) return errors
      //   !this.$v.email.email && errors.push('Must be valid e-mail')
      //   !this.$v.email.required && errors.push('E-mail is required')
      //   return errors
      // },
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
      },
    },
  }
</script>

<style scoped>
</style>