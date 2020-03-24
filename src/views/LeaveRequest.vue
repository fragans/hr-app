<template>

    <v-container>
      <v-row class="title py-4">
            <v-col col="6" class="flex  uppercase">

                <h1>{{$route.name}}</h1>
                
            </v-col>
           
        </v-row>
      <router-view>
        
      </router-view>
    </v-container>

</template>


<script>

</script>

<style scoped>

</style>