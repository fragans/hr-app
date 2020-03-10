<template>
    <v-row class="p-4">
        <v-col>
            <v-text-field v-model="name" :error-messages="nameErrors" :counter="10" label="Name" required @input="$v.name.$touch()" @blur="$v.name.$touch()" ></v-text-field>

            <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()" ></v-text-field>

            <v-select v-model="select" :items="items" :error-messages="selectErrors" label="Item" required @change="$v.select.$touch()" @blur="$v.select.$touch()" ></v-select> 

             <v-radio-group v-model="sex" :rules="[v => !!v || 'Item is required']" required class="flex">
                <v-radio label="Man" value="0"></v-radio>
                <v-radio label="Woman" value="1"></v-radio>
            </v-radio-group>
        </v-col>
        <v-col col="3"> 
            <v-img :src="`https://picsum.photos/500/300?image=1`" :lazy-src="`https://picsum.photos/10/6?image=1`" aspect-ratio="1" class="grey lighten-2" >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
        </v-col>
        
    </v-row >
    
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      sex:'',
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
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
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
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
    },
  }
</script>

<style scoped>

</style>