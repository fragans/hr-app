<template>
<v-content class="max-w-md mx-auto">
    
        <v-row class="border border-gray-100">
            <v-img :src="decode64" aspect-ratio="1" />
        </v-row>
        <v-row>
            <v-btn @click="upload">upload</v-btn>
            <v-file-input 
                label="Upload image" 
                v-model="files" 
                filled 
                prepend-icon="mdi-image" 
                @change="onSelect" 
                accept="image/png, image/jpeg, image/bmp" 
                show-size
                ref="upload"
                >
            </v-file-input>   
        </v-row>
        <!-- <v-row>
            <v-textarea ref="text" v-model="imgConverted" id="" cols="30" rows="10"></v-textarea>
        </v-row> -->
        <!-- <v-btn @click="decodeText">Decode</v-btn> -->
        

    

    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline text-center">
                <v-icon left>mdi-file-cancel</v-icon>
                {{this.errors}}
            </v-card-title>
            
            <v-card-actions>
            <v-btn color="primary" light block @click="dialog = false">ok</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>


</v-content>
    
    
</template>

<script>
    export default {
        data(){
            return{
                decode64:'https://www.forda-mof.org/theme/img/no_image.png',
                dialog:false,
                files:[],
                imgConverted:'',
                errors:'Image too large!',
                f:[],
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],

            }
            
        },
        watch:{
            imgConverted(){
                this.decodeText()
            }
        },
        methods:{
            onSelect(e){
                console.log('masuk onSelek')
                var f = this.files; // FileList object
                console.log('file_size='+this.files.size)
                if(this.files.size < 2000000){
                    var reader = new FileReader();

                    reader.onload = (()=> {
                        return (e)=> {
                            var binaryData = e.target.result;
                            //Converting Binary Data to base 64
                            var base64String = window.btoa(binaryData)
                            //showing file converted to base64
                            this.imgConverted = base64String
                            console.log('decoded_size='+base64String.length)
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    console.log('convert to 64 success!')
                    reader.readAsBinaryString(f);
                }else{
                    console.log('masuk else')
                    this.dialog = true
                    this.files=[]
                }
            },
            upload(){
                this.$refs.upload.click()
            },
            decodeText(){
                this.decode64 = "data:image/jpg;base64," + this.imgConverted
            }
        }
    }
</script>

<style scoped>

</style>