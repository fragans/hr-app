<template>
<v-content class="">
    <v-card max-width="500" class="p-8 mx-auto">
        <v-row>
            <v-file-input label="select image less than 2mb" v-model="files" filled prepend-icon="mdi-image" @change="onSelect" accept="image/png, image/jpeg, image/bmp" show-size></v-file-input>   
        </v-row>
        <v-row>
            <v-textarea ref="text" v-model="imgConverted" id="" cols="30" rows="10"></v-textarea>
        </v-row>
        <v-btn @click="decodeText">Decode</v-btn>
        <img :src="decode64" ref="img" style="height:100px">
    </v-card>
    
</v-content>
    
    
</template>

<script>
    export default {
        data(){
            return{
                decode64:'',
                files:[],
                imgConverted:'',
                f:[],
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],

            }
            
        },
        methods:{
            onSelect(e){
                var f = this.files; // FileList object
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (()=> {
                    return (e)=> {
                    // console.log(e.target.result)
                    var binaryData = e.target.result;
                    //Converting Binary Data to base 64
                    var base64String = window.btoa(binaryData);
                    //showing file converted to base64
                    this.imgConverted = base64String
                    console.log('convert to 64 success')
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsBinaryString(f);
            },
            decodeText(){
                this.decode64 = "data:image/jpg;base64," + this.imgConverted
            }
        }
    }
</script>

<style scoped>

</style>