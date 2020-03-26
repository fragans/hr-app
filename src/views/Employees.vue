<template>
    

    <v-container>
      <v-row>
        <v-skeleton-loader :loading="loading" height="50" width="250" max-width="300" type="list-item-avatar" >
          <v-card-title>
          <!-- <v-icon left>mdi-{{current_route.icon}}</v-icon> -->
          <h1>{{$route.name}}</h1>
          </v-card-title>
        </v-skeleton-loader>
      </v-row>
        <router-view>

        </router-view>
        
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

    watch:{
      loading(value, oldval)
      {
        this.copy = this.employees
      }
    },

    mounted(){
      setTimeout(()=>{
        this.loading = false
      },1000)

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