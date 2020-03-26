<template>
    <div>

        <div  v-if="!loading">eh ke load</div>
        <div v-else>belooom</div>

        <div ref='viewer' style="height:80vh"></div>
    </div>
</template>

<script>
import { isUndefined } from 'lodash';
import LoadScript from 'vue-plugin-load-script';
import VuePDFViewer from 'vue-instant-pdf-viewer'
    export default {
        
        components:{
            'vue-pdf-viewer': VuePDFViewer,
            
        },
        data(){
            return{
                loading:true,
                url:'https://bitcoin.org/bitcoin.pdf'
            }
        },
        methods:{
            createViewer(){
                // PDFObject.embed(this.url, this.$refs.viewer);
                PDFObject.embed('data:application/pdf;base64,'+localStorage.getItem('pdfData'), this.$refs.viewer);
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