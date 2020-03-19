<template>
    <v-row class="p-4">
        <v-col col="8" class="mr-2">
            <v-text-field v-model="employee.name"  label="Name" required ></v-text-field>

            <v-text-field v-model="employee.email" label="E-mail" required ></v-text-field>

            <v-text-field v-model="employee.phone" label="Phone" required  ></v-text-field>
            <!-- <v-select v-model="select" :items="items" :error-messages="selectErrors" label="Item" required @change="$v.select.$touch()" @blur="$v.select.$touch()" ></v-select>  -->

             <v-radio-group v-model="employee.gender" :rules="[v => !!v || 'Item is required']" required class="flex" >
                <v-radio label="Man" value="Male"></v-radio>
                <v-radio label="Woman" value="Female"></v-radio>
            </v-radio-group>

            
            <v-menu v-model="birthDate" :close-on-content-click="false" transition="scale-transition" offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title ></v-date-picker>
            </v-menu>
            
            <v-text-field v-model="employee.birthplace" label="Birth place" required  ></v-text-field>

        </v-col>
        <v-col col="3"> 
          <imgUpload />
            
        </v-col>
        
    </v-row >
    
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import imgUpload from '@/components/Edit/ImageUploader'
  import Emergency from '@/components/Edit/EmergencyContact'
  import {mapGetters} from 'vuex'
  export default {
    components:{imgUpload},
    mixins: [validationMixin],

    validations: {
      phone: {required , maxLength: maxLength(12)},
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: vm => ({
      birthPlace:'',
      birthDate:'',
      phone:'',
      sex: '',
      name: '',
      email: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      // nameErrors () {
      //   const errors = []
      //   if (!this.$v.name.$dirty) return errors
      //   !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      //   !this.$v.name.required && errors.push('Name is required.')
      //   return errors
      // },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },

      ...mapGetters({
        employee: 'employees/person',
        loading: 'employees/loading'
      })
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },

      loading()
      {
        if(!this.loading) this.date = employee.birthdate
      }
    },
    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
          console.log(date)
        const [month, day, year] = date.split('/')
        console.log(month, day, year)
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>

<style scoped>

</style>