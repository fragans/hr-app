<template>
    
    <v-container>
      ini view
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
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'Position', value: 'position' },
          { text: 'Status', value: 'status' },
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
        },

        reset(){
          this.copy = this.desserts
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
      let d = this.desserts;
      var filtered  = d.filter((el)=>{
          return el.status === value
      })
      this.copy = filtered
    },

        
    
    mounted()
    {
      this.fetch()
    },
    beforeMount(){
        
    }
  }

</script>