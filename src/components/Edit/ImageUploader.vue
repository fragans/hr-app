<template>
<v-col class="">
    
        <v-row class="border border-gray-100">
            <v-img :src="showImg" aspect-ratio="1" ref="img" />
        </v-row>
        <v-row>
            
            <v-file-input 
                label="Upload image" 
                v-model="files" 
                filled 
                prepend-icon="mdi-account-box-outline" 
                @change="onSelect" 
                accept="application/pdf" 
                show-size
                >
            </v-file-input>   
        </v-row>

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


</v-col>
    
    
</template>

<script>
    export default {
        props:['image'],
        
        
        data(){
            return{
                showImg:'https://www.forda-mof.org/theme/img/no_image.png',
                dialog:false,
                files:[],
                imgConverted:'',
                errors:'image is too large!',
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],

            }
            
        },
        watch:{
            imgConverted(){
                this.decodeText(this.imgConverted)
            },
        },
        methods:{
            onSelect(e){

                var f = this.files; // FileList object
                if(this.files.length === 0 ) return
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
                            // this.image = base64String
                            this.updateImage();
                            console.log('decoded_size='+base64String.length)
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    console.log('convert to 64 success!')
                    reader.readAsBinaryString(f);
                }else{
                    this.dialog = true
                    this.files=[]
                }
                    

                
            },
            decodeText(image){
                console.log('run decoded')
                this.showImg = "data:image/jpg;base64," + image
            },
            updateImage(){
                this.$store.commit('employees/setPersonPhoto', this.imgConverted)
                this.image = this.imgConverted
            }
        }
        ,mounted(){
            this.$nextTick(()=>{
                console.log(this.image != '')
                if(this.image != ''){
                this.decodeText(this.image)
                }
            }
                
            )
        }
    }
</script>

<style scoped>

</style>