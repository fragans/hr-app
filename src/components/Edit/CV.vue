<template>
    <v-row class="p-4">
        <v-col v-if="data.hasOwnProperty('cv') && data.cv !='' ">

            <div ref='viewer' style="height:80vh"></div>

        </v-col>
        <v-col v-else> 
            <div class="flex justify-center text-gray-300 font-bold">
                    <v-icon left>mdi-book-remove-multiple</v-icon>
                <span class="uppercase">no cv uploaded</span>
            
            </div>
            <div class="py-4 flex justify-center">
                or
            </div>
            <div class="flex justify-center my-4" >
                <v-btn outlined class @click="upload = !upload">upload a CV?</v-btn>
            </div>
            <div v-if="upload" class="max-w-sm mx-auto">
                <v-file-input 
                v-model="files" 
                dense
                label="select a file ..."
                @change="onSelect" 
                accept="application/pdf" 
                show-size
                >
                </v-file-input>   
            </div>
            
        </v-col>
        
        
    </v-row>
</template>

<script>
import { isUndefined } from 'lodash';
import LoadScript from 'vue-plugin-load-script';
    export default {
        props:{
            data: {
                type:Object,
                default: ()=>({
                    address:'',
                    division:'',
                    birth_date:'',
                    birth_place:'',
                    email:'',
                    emergency_contact:[{
                        name:'',
                        phone:''
                    }],
                    gender:'',
                    id:'',
                    name:'',
                    photo:'',
                    position:'',
                    status:'',
                    cv:''
                })
            },
        },
        data(){
            return{
                files:[],
                upload:false,
                loading:true,
                
                url:'https://bitcoin.org/bitcoin.pdf'
            }
        },
        computed:{
            prependBase64(){
                return 'data:application/pdf;base64,'+this.data.cv
            },
        },
        methods:{
            createViewer(){
                // PDFObject.embed(this.url, this.$refs.viewer);
                // console.log(!this.data.hasOwnProperty('cv'))
                // console.log(this.data)
                console.log('create view')
                if(this.data.hasOwnProperty('cv') && this.data.cv != ""){
                    PDFObject.embed(this.prependBase64, this.$refs.viewer);
                }else{
                    console.log('no cv')
                } 
            },
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
                            this.cvConverted = base64String
                            // this.image = base64String
                            this.updateCV()
                            this.createViewer()
                            console.log('decoded_size='+base64String.length)
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    console.log('convert to 64 success!')
                    this.data.cv = this.cvConverted
                    
                    reader.readAsBinaryString(f);
                }else{
                    this.dialog = true
                    this.files=[]
                }
            },
            updateCV(){
                this.$store.commit('applicants/setCV', this.cvConverted)
                
            }
        },
        created(){
            // console.log(this.$loadScript);
            this.$loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js")
            .then(() => {
                this.loading=false
                this.createViewer()
            })
            .catch(() => {
            // Failed to fetch script
            })
           
        },
        beforeCreate() {
            
            // let recaptchaScript = document.createElement('script')
            // recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js')
            // document.head.appendChild(recaptchaScript)
        }
    }
</script>

<style scoped>

</style>