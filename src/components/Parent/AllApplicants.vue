<template>
    <v-container v-if="copy.length > 0">
        <FilterList :search="search" :headers="headers" :items="copy" rowClick="Edit Applicant Status"> 
            <h1 slot="title">Employee</h1>

            <v-tabs slot="filter" show-arrows>
            <v-tab @click="reset">All</v-tab>
            <v-tab @click="filter('Unprocessed')">Unprocessed</v-tab>
            <v-tab @click="filter('Scheduled to Psycho Test')"> Psycho Test</v-tab>
            <v-tab @click="filter('Scheduled to Interview')"> Interview</v-tab>
            </v-tabs>

            <template slot="action">
            <v-btn to="applicants/add/">Add Applicant</v-btn>
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
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },

          { text: 'Status', value: 'status' }
        ],
        desserts: [
          
        ],
        copy: []
      }
    },
    computed:{
        ...mapGetters({
            applies: 'applicants/applies'
        })
        
    },
    methods:{
        filter(value){
              let d = this.applies;
              var filtered  = d.filter((el)=>{
                return el.status === value
            })
            this.copy = filtered
        },

        reset(){
          this.copy = this.applies
        }
    },
    mounted()
    {
        this.$store.dispatch('applicants/fetch')
            .then(()=>{
                this.copy=this.applies
            })
    },
    beforeMount(){
        

        
    }
  }
</script>

<style scoped>

</style>