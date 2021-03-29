<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />

    <v-dialog v-model="dialog" scrollable max-width="250px" >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" x-small class="mx-1">
          <v-icon>mdi-share</v-icon>
          share
        </v-btn>
      </template>

      <v-card outlined>
        <v-card-title
          >Share <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        
<div class="share-network-list ma-5 d-flex justify-start">          
          <ShareNetwork
    v-for="network in networks"
    :network="network.network"
    :key="network.network"
    :style="{backgroundColor: network.color}"
    :url="sharing.url"
    :title="sharing.title"
    :description="sharing.description"
    :quote="sharing.quote"
    :hashtags="sharing.hashtags"
    :twitterUser="sharing.twitterUser"    
  >
    <i :class="network.icon"></i>
    <span>{{ network.name }}</span>
  </ShareNetwork>
</div>
          <v-btn @click.stop.prevent="copyTestingCode" small outlined class="ma-5">
            <v-icon>mdi-content-copy</v-icon>  Copy Url</v-btn>              
          <input type="hidden" id="testing-code" :value="sharing.url">
        
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: {
    sharing: Object,
  },
  data() {
    return {
      dialog: false, 
      networks: [                
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },        
        { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
        { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },                
      ]
    };
  },
  components: {},
  computed: {},
  methods: {
    copyTestingCode () {
          let testingCodeToCopy = document.querySelector('#testing-code')
          testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
          testingCodeToCopy.select()

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            alert('URL copy ' + msg + ': ' + this.sharing.url);
          } catch (err) {
            alert('Oops, unable to copy');
          }

          /* unselect the range */
          testingCodeToCopy.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },
  },
};
</script>
 <style lang="scss" scoped>
 body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    text-align: center;
    margin: 50px 0 80px;
  }
  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>