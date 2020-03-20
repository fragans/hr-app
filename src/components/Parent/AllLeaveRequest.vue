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
            text: 'EmployeeID',
            align: 'start',
            sortable: false,
            value: 'emp_id',
          },
          { text: 'Start Date', value: 'date_end' },
          { text: 'End Date', value: 'date_start' },
          { text: 'Status', value: 'status' },
          
        ],
        copy: []
      }
    },
    computed:{
      ...mapGetters({
        dayoff : 'dayoff/days',
      })
    },
    methods:{
        filter(value){
              let d = this.dayoff;
              var filtered  = d.filter((el)=>{
                return el.status === value
            })
            this.copy = filtered
        },

        reset(){
          this.copy = this.dayoff
        }
    },
    created(){
      this.$store.dispatch('dayoff/fetch')
        .then(()=>{
          this.copy = this.dayoff
        }
      )
    },
  }
</script>

<style scoped>

</style>