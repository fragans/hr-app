<template>
    
    <v-container v-if="persons.length > 0">
      <v-row class="title py-4">
           <v-skeleton-loader :loading="loading" height="50" width="250" max-width="300" type="list-item-avatar" >
                <v-card-title>
                  {{$route.name}}
                </v-card-title>
            </v-skeleton-loader>  
        </v-row>
        <FilterList :search="search" :headers="headers" :items="copy" rowClick="Edit"> 

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
import { mapGetters } from 'vuex'
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
        loading:true,
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
    mounted(){
      setTimeout(()=>{
        this.loading = false
      },1000)
    },
    created(){
      this.$store.dispatch('employees/fetch')
      .then(()=>{
        this.copy = this.persons
      })
    },
    beforeMount(){
        

        
    }
  }
</script>

<style scoped>

</style>