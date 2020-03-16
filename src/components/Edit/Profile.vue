<template>
    <v-row class="p-4">
        <v-col col="8" class="mr-2">
            <v-text-field v-model="name" label="Name" @input="updatePerson" required ></v-text-field>

            <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required></v-text-field>

            <v-text-field v-model="phone" label="Phone" required  ></v-text-field>
            <!-- <v-select v-model="select" :items="items" :error-messages="selectErrors" label="Item" required @change="$v.select.$touch()" @blur="$v.select.$touch()" ></v-select>  -->

             <v-radio-group v-model="sex" :rules="[v => !!v || 'Item is required']" required class="flex">
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
            
            <v-text-field v-model="birthPlace" label="Birth place" required ></v-text-field>

        </v-col>
        <v-col col="3"> 
          <v-row class="my-2">
            <v-img :src="`https://picsum.photos/500/300?image=1`" :lazy-src="`https://picsum.photos/10/6?image=1`" aspect-ratio="1" class="grey lighten-2" >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-row>
          <v-row class="my-2">
            <v-btn block>Upload Image</v-btn>
          </v-row>
            
        </v-col>
        
    </v-row >
    
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import {mapGetters} from 'vuex'

  export default {
    props:["data"],

    data: vm => ({
      birthPlace:'',
      birthDate:'',
      phone:'',
      sex:'',
      name: '',
      email: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      checkbox: false,
    }),

    computed: {
      ...mapGetters({
        profil: 'employees/person'
      })
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      name(val){
        console.log(val)
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

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

      updatePerson()
      {
        this.$store.commit('employees/updatePerson', this.name)
        // this.$store.commit('employees/updatePerson', this.email)
      }

    },

    mounted()
    {
      // console.log(this.profil)
      this.name = this.profil.name
      this.phone = this.profil.phone
      this.sex = this.profil.gender
      this.birthPlace = this.profil.birthplace
      this.birthDate = this.profil.birthdate
      this.email = this.profil.email
      // this.$store.dispatch('employees/fetchPerson')
      //         .then(()=>{
      //           console.log(this.profil)
      //           this.name = this.profil.name
      //           // this.data = this.employee
      //       })

      
      // this.name = this.person.name
    }
  }
</script>

<style scoped>

</style>