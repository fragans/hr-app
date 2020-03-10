<template>
    <v-container>
         <v-row>
            <v-col>
                <v-sheet height="400">
                    <v-calendar
                    
                    :now="today"
                    :value="today"
                    
                    color="primary"
                    type="week"
                    :weekdays="[1,2,3,4,5]"
                    :interval-format="intervalFormat"
                    ></v-calendar>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
  export default {
    data: () => ({
      today: '',
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
      ]
    }),
    methods:{
        intervalFormat(interval){
            return interval.time
        }
    },
    created(){
        const d = new Date();
        this.today  = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()

    }
  }
</script>

<style scoped>

</style>