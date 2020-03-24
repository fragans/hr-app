<template>

    <v-container >
        <FilterList :search="search" :headers="headers" :items="copy" rowClick="Edit Leave Status"> 
          <h1 slot="title">Employee</h1>

          <v-tabs slot="filter" show-arrows>
            <v-tab @click="reset">All</v-tab>
            <v-tab @click="filter('Approved')">Approved</v-tab>
            <v-tab @click="filter('Pending')">Pending</v-tab>
            <v-tab @click="filter('Rejected')">Rejected</v-tab>
          </v-tabs>

          <template slot="action">
            <v-btn to="/offwork/add">New Request</v-btn>
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
          {
            text: 'Employee',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Start Date', value: 'date_start' },
          { text: 'End Date', value: 'date_end' },
          { text: 'Status', value: 'status' },
          
        ],
        copy: [],
        allData: []
      }
    },
    computed:{
      ...mapGetters({
        dayoff : 'dayoff/days',
        persons: 'employees/persons'
      })
    },
    methods:{
        filter(value){
              let d = this.allData;
              var filtered  = d.filter((el)=>{
                return el.status === value
            })
            this.copy = filtered
        },

        reset(){
          this.copy = this.allData
        },
        query(){
          let res=[]
          this.persons.forEach(emp => {
            this.dayoff.forEach(d => {
              if (emp.id === d.emp_id) {
                res.push(
                  {
                    id: d.id,
                    name:emp.name,
                    date_start :d.date_start,
                    date_end :d.date_end,
                    status: d.status
                  }
                )
              }
            });
          });
          this.allData = res
          this.copy = res
          console.log(res)
        }
        
    },
    created(){
      this.$store.dispatch('dayoff/fetch')
        .then(()=>{
          this.$store.dispatch('employees/fetch').then(()=>{
            this.query()
          })
          
        }
      )
    },
  }
</script>

<style scoped>

</style>