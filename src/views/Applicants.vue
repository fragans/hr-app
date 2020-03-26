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

export default {
  data(){
    return{
      loading:true
    }
  },
  mounted(){
     setTimeout(()=>{
        this.loading = false
      },1000)
  },


    methods:{
       
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

    watch:{
        loading(value, oldval)
        {
          this.copy = this.applicants
        }
    },

  }

</script>