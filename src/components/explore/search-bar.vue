<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-text-field
          dense
          v-model="myQuery"
          hide-details
          prepend-inner-icon="mdi-magnify"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="Search Power Mantra"
          type="text"
          @input="focus = true"          
          @click:clear="myQuery = ''"
          :rounded="!focus"
          :shaped="focus"
        >
        </v-text-field>
        <v-card v-if="focus" class="ma-0">
          <v-card max-height="35vh" class="overflow-y-auto">
            <div class="mb-2" flat v-for="item in searchResults" :key="item.name" @click="SET_searchSelect(item.id); focus = false">
              {{ item }} 
            </div>
          </v-card>
        </v-card>        
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center text--secondary">
        <div class="caption">Browse by</div>
        <v-btn
          text
          v-for="item in filterByOptions"
          :key="item"
          class="text-none text--secondary caption"
          raised
          x-small
        >
          {{ item }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center text--secondary button">
        <div>
          <v-chip
            outlined
            v-for="item in nextFilterOptions"
            :key="item"
            :input-value="nextFilter == item"
            filter
            class="mr-2"
          >
            {{ item }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapMutations, mapState } from "vuex";
var FlexSearch = require("flexsearch");
export default {
  data() {
    return {
      filterByOptions: [
        "Diety",
        "Quality",
        "Category",
        "Benefits",
        //"Popularity",
      ],
      filterSelected: null,
      nextFilterOptions: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
      nextFilter: null,
      password: "Password",
      show: false,
      myQuery: "",
      marker: true,
      focus: false,      
      index: null,
      searchResults: [],
    };
  },
  computed: {
    ...mapState("coretext", ["mantras", "indexMantras"]),
  },
  watch: {
    myQuery(val) {
      console.log(val);      
      if (this.indexMantras === null) {
        this.createSearch();
        console.log("I created index");
      }
      this.searchQuery(val);
    },
  },
  methods: {
    ...mapMutations("coretext", ["SET_indexMantras"]),
    ...mapMutations("parameters", ["SET_searchSelect"]),
    createSearch() {
      //make a local copy
      let temp = [];
      // add id to every entry
      let ix = 0;
      for (var j = 0; j < 6; j++) {
        temp.push({
          id: ix,
          name: this.makeCopy(this.mantras[j].name),
        });
        ix = ix + 1;
      }

      // setup the index
      let temp1;
      temp1 = new FlexSearch({
        tokenize: "strict",
        depth: 3,
        doc: {
          id: "id",
          field: "name",
        },
      });
      console.log(temp);
      //create the actual index
      temp1.add(temp);
      //console.log(temp1.info)
      this.SET_indexMantras(temp1);
    },
    makeCopy(val) {
      let a = val;
      return a;
    },
    searchQuery(val) {
      this.searchResults = this.indexMantras.search({
        // query:this.convertItrans(word),
        query: val,
        // limit: 5,
        depth: 3,
        // threshold: 10,
        // resolution: 12,
        tokenize: "strict",
        // encode: "false",
      });            
    },
  },
};
</script>
 <style lang="scss" scoped>
</style>


var FlexSearch = require("flexsearch")

