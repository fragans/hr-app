<template>
    
    <v-container>
        <FilterList :search="search" :headers="headers" :items="copy" > 
          <h1 slot="title">Employee</h1>
          <v-tabs slot="action" show-arrows>
            <v-tab @click="filter('Permanent')">permanent</v-tab>
            <v-tab @click="filter('Probation')">probation</v-tab>
            <v-tab @click="filter('Contract')">contract</v-tab>
          </v-tabs>
        </FilterList>
        
    </v-container>

</template>


<script>
import FilterList from '@/components/FilterList'
import axios from 'axios'
    export default {
      components:{
        FilterList
      },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Position', value: 'position' },
          { text: 'Status', value: 'status' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          
        ],
        copy: []
      }
    },
    methods:{
        filter(value){
              let d = this.desserts;
              var filtered  = d.filter((el)=>{
                return el.status === value
            })
            this.copy = filtered
        },

        fetch()
        {
          axios.get('http://localhost:3000/employees').then(({ data })=>{
            // console.log(data)
            this.desserts = data
            this.copy = this.desserts;
          })
        }
    },
    mounted()
    {
      this.fetch()
    },
    beforeMount(){
        

        
    }
  }
</script>

<style scoped>

</style>