<template>
    <v-row >
            <v-col class="w-full">
                <v-card-title>
                    <slot name="title" > </slot>
                    
                    

                </v-card-title>
                <v-card-title>
                    <v-row>
                        <v-col col="6"> 
                            <slot name="action"> </slot>
                        </v-col>
                        <v-col col=6>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
                        </v-col>
                    
                        
                    </v-row>
                    

                </v-card-title>
                <v-data-table 
                :headers="headers"
                :items="items"
                :search="search"
                >
                <slot name="filter"></slot>
                
                </v-data-table>
            </v-col>
        </v-row>
</template>

<script>
    export default {
        props:["headers" , "items", "search"]
    }
</script>

<style scoped>

</style>