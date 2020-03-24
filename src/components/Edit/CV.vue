<template>
    <v-row class="p-4">
        <v-col v-if="data.hasOwnProperty('cv')">

            <div ref='viewer' style="height:80vh"></div>

        </v-col>
        <v-col v-else class=""> 
            <div class="flex justify-center text-gray-300 font-bold">
                    <v-icon left>mdi-book-remove-multiple</v-icon>
                <span class="uppercase">no cv uploaded</span>
            
            </div>
            <div class="py-4 flex justify-center">
                or
            </div>
            <div class="flex justify-center" >
                <v-btn outlined class>upload a CV?</v-btn>
            </div>
            <div v-if="upload">
                <v-file-input 
                v-model="files" 
                dense
                label="Upload a CV?"
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
import VuePDFViewer from 'vue-instant-pdf-viewer'
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
        components:{
            'vue-pdf-viewer': VuePDFViewer,
            
        },
        data(){
            return{
                upload:false,
                loading:true,
                url:'https://bitcoin.org/bitcoin.pdf'
            }
        },
        methods:{
            createViewer(){
                // PDFObject.embed(this.url, this.$refs.viewer);
                console.log(!this.data.hasOwnProperty('cv'))
                if(this.data.hasOwnProperty('cv')){
                    PDFObject.embed('data:application/pdf;base64,'+this.data.cv, this.$refs.viewer);
                }else{
                    console.log('no cv')
                } 
                
                // console.log(this.data.cv == "")
                // console.log('create view')
                // console.log(this.data.hasOwnProperty('cv'))
                
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