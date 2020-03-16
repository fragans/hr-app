<template>
    
    <v-container>
        <FilterList :search="search" :headers="headers" :items="copy" > 
          <h1 slot="title">Applicants</h1>
          <v-tabs slot="action" show-arrows>
            <v-tab @click="filter('Unprocessed')">Unprocessed</v-tab>
            <v-tab @click="filter('Scheduled to Psycho Test')">Scheduled to Psycho Test</v-tab>
            <v-tab @click="filter('Scheduled to Interview')">Scheduled to Interview</v-tab>
          </v-tabs>
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
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Position', value: 'position' },
          { text: 'Status', value: 'status' },
        ],
        desserts: [
          
        ],
        copy: []
      }
    },
    methods:{
        filter(value){
              let d = this.persons;
              var filtered  = d.filter((el)=>{
                  return el.status === value
              })
              this.copy = filtered
        },

        fetch()
        {
            axios.get('http://localhost:3000/newApplicants').then(({ data })=>{
              console.log(data)
              this.desserts = data
              this.copy = this.desserts;
            })
        }
    },

    computed:{
      ...mapGetters({
          persons:'applicants/persons'
      })

    },

    watch:{
        loading(value, oldval)
        {
          this.copy = this.applicants
        }
    },

    created()
    {
        this.$store.dispatch('applicants/fetch')
        .then(()=>{
          this.copy = this.persons
        })
    },

    mounted()
    {
      // console.log("test")
      // this.fetch()
    },

    beforeMount(){
        
    }
  }

</script>

<style scoped>

</style>