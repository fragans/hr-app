<template>
    
    <v-container v-if="persons.length > 0">
        <FilterList :search="search" :headers="headers" :items="copy" > 
          <h1 slot="title">Employee</h1>

          <v-tabs slot="filter" show-arrows>
            <v-tab @click="reset">All</v-tab>
            <v-tab @click="filter('Permanent')">permanent</v-tab>
            <v-tab @click="filter('Probation')">probation</v-tab>
            <v-tab @click="filter('Contract')">contract</v-tab>
          </v-tabs>

          <template slot="action">
            <v-btn>Add Employee</v-btn>
          </template>
        </FilterList>
        
    </v-container>

</template>


<script>
import FilterList from '@/components/FilterList'
import axios from 'axios'
import {mapGetters} from 'vuex'
    export default {
      components:{
        FilterList
      },
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Position', value: 'position' },
          { text: 'Status', value: 'status' },

        ],
        desserts: [
          
        ],
        loading:[],
        copy: []
      }
    },
    computed:{
      ...mapGetters({
        persons : 'employees/persons',
      })
    },
    methods:{
        filter(value){
              let d = this.persons;
              var filtered  = d.filter((el)=>{
                return el.status === value
            })
            this.copy = filtered
        },

        reset(){
          this.copy = this.persons
        }


    },

    computed:{
      ...mapGetters({
        persons:'employees/persons',
        // loading: 'employees/loading'
      })

    },

    watch:{
      loading(value, oldval)
      {
        this.copy = this.employees
      }
    },

    mounted()
    {
      
      // this.fetch()
    },
    created(){
      this.$store.dispatch('employees/fetch')
      .then(()=>{
        this.copy = this.persons
      })
    },

    beforeMount(){
 
    },

    created()
    {
      this.$store.dispatch('employees/fetch')
      .then(()=>{
        this.copy = this.persons
      })
    },

    destroyed()
    {
      console.log("Employee destoryed")
    }
  }
</script>

<style scoped>

</style>