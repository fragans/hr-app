<template>
    <v-container>
        <v-row>
          <v-skeleton-loader :loading="loading" max-width="3000" type="table-thead, table-tbody"  class="">
            <!-- <table v-if="!loading">

              <tr>
                <th >
                  Employee
                </th>
                
                <th v-for="item in disAttends" :key="item">
                  {{item}}
                </th>
              </tr>

              <tr v-for="(person,i) in persons" :key="i">

                <td>{{person.name}}</td>
                <td v-for="(item,j) in attendsMap[person.name]" :key="j" >
                  {{item}}
                </td>
                
              </tr>
            </table> -->
            <v-data-table
            :headers="headers"
            :items="tableArray"
            >
            
           
            </v-data-table>
          </v-skeleton-loader>
      </v-row>
      <v-row>
        
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      disAttends:[],
      loading: true,
      attendsMap: [],
      tableArray:[],
      headers:[]
    }),
    computed:{
      ...mapGetters({
        attends:'attendance/attends',
        persons:'employees/persons',
      }),
    },
    methods:{
      intervalFormat(interval){
          return interval.time
      },
      getHeaders(){
        let keys=[];
        for (var key in this.tableArray[0]) {
            // keys.push(key);
            this.headers.push(
              {
                text:key,
                value:key
              }
            )
        }

        console.log(this.headers)
        
      },
      constTableArray(){
        let res=[];
        this.persons.forEach((emp,i) => {
          let line ={};
          // line["id"]=emp.id
          line["NAME"]=emp.name
          this.disAttends.forEach(ad => {
            line[ad]="A"
            this.attends.forEach(at=>{
              if(at.date === ad){
                if(at.emp_id === emp.id)
                line[ad]= "P"
              }
            })
          });
          res[i]=line;
        });
        console.log('res')
        console.log(res)
        this.tableArray = res;
        this.getHeaders()
      },
      query(){
        var res={}  ;
        this.persons.forEach((emp,i) => {
          let line = new Array(this.disAttends.length).fill("A");
          this.disAttends.forEach((da,j) => {
            this.attends.forEach(at => {

                if(da === at.date){
                  line[j]= "P"
                }
              
            });
            })
          res[emp.name]=line
          console.log()
          });
        this.attendsMap = res;
        this.constTableArray()
      },
      fetch(){
        this.$store.dispatch('attendance/fetch').then(()=>{
      
        this.$store.dispatch('employees/fetch').then(()=>{
          this.loading = false
          this.disAttends= [...new Set(this.attends.map(x=>x.date))]
          this.query()
        })
      })
      }
    },
    
    created(){
      
      this.fetch();
    }
  }
</script>


<style scoped>
th{
  min-width: 150px;
}
th,tr,td{
  border: 1px black;
  border-style: solid;
}
td{
  text-align: center;
}

</style>