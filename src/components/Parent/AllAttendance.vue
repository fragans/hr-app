<template>
    <v-container>
        <v-row>
          <v-skeleton-loader :loading="loading" max-width="3000" type="table-thead, table-tbody"  class="">
              <v-data-table>
                </v-data-table>
          </v-skeleton-loader>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      items:[],
      search:'',
      headers:[
        {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
      ],
      current_route: '',
      loading: true,
    }),
    computed:{
      ...mapGetters({
        attends:'attendance/attends',
        persons:'employees/persons',

      })
    },
    methods:{
        intervalFormat(interval){
            return interval.time
        },
        query(){
          console.log(this.attends)
          console.log(this.persons)
          let res=[];
          this.persons.forEach(emp => {
            let line =this.attends.filter((at)=>{
              return at.emp_id === emp.id;
            })
            if(line[0]){
              res.push(
                {
                'text':line[0].date,
                'value': 'date'
                }
            )
            }
            
          });
          console.log(res)
          this.headers = res;
            
        

        },
        fetch(){
          this.$store.dispatch('attendance/fetch').then(()=>{
        
          this.$store.dispatch('employees/fetch').then(()=>{
          
            this.query();
          })
        })
        }
    },
    
    created(){
      this.fetch();
      // let employees = null;
      // let attends = null

        const d = new Date();
        this.today  = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()

        let self = this;
            setTimeout(()=>{
                self.loading = false;
            },1000)
            

        // const current_route =  this.$router.options.routes.filter((r)=>{
        //         return r.name === this.$route.name
        //     })
        // this.current_route = current_route[0]
    }
  }
</script>


<style scoped>

</style>