<template>
    <v-row class="p-4">
        <v-col col="8" class="mr-2">
            <v-text-field v-model="data.name"  label="Name" required ></v-text-field>

            <v-text-field v-model="data.email" label="E-mail" required ></v-text-field>

            <v-text-field v-model="data.phone" label="Phone" required  ></v-text-field>


            <v-radio-group v-model="data.gender" :rules="[v => !!v || 'Item is required']" required class="flex" >
              <v-radio label="Man" value="Male"></v-radio>
              <v-radio label="Woman" value="Female"></v-radio>
            </v-radio-group>

            
            <v-menu v-model="show_calendar" :close-on-content-click="false" transition="scale-transition" offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="data.birth_date"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  @blur="date = parseDate(date)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="data.birth_date" no-title ></v-date-picker>
            </v-menu>
            
            <v-text-field v-model="data.birth_place" label="Birth place" required  ></v-text-field>

        </v-col>
        <v-col col="3"> 
          <imgUpload :photo="data.photo" />
            
        </v-col>
        
    </v-row >
    
</template>

<script>
  // import { validationMixin } from 'vuelidate'
  // import { required, maxLength, email } from 'vuelidate/lib/validators'
  import imgUpload from '@/components/Edit/ImageUploader'
  import Emergency from '@/components/Edit/EmergencyContact'
  // import {mapGetters} from 'vuex'
  export default {
    components:{imgUpload},
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
    // mixins: [validationMixin],
    // validations: {
    //   phone: {required , maxLength: maxLength(12)},
    //   name: { required, maxLength: maxLength(10) },
    //   email: { required, email },
    //   select: { required },
    //   checkbox: {
    //     checked (val) {
    //       return val
    //     },
    //   },
    // },
    data: vm => ({
      show_calendar:false,
      date: vm.data.birth_date,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      checkbox: false,
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
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      // ...mapGetters({
      //   employee: 'employees/person',
      //   loading: 'employees/loading'
      // })
    },
    watch: {
      // date (val) {
      //   this.dateFormatted = this.formatDate(this.date)
      // },
      // loading()
      // {
      //   if(!this.loading) this.date = employee.birthdate
      // }
    },
    methods: {
      // submit () {
      //   this.$v.$touch()
      // },
      // clear () {
      //   this.$v.$reset()
      //   this.name = ''
      //   this.email = ''
      //   this.select = null
      //   this.checkbox = false
      // },
      
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${year}-${month}-${day}`
      },
      parseDate (date) {
        if (!date) return null
          console.log(date)
        const [month, day, year] = date.split('-')
        // console.log(month, day, year)
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>

<style scoped>
</style>