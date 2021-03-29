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
            <div
              class="pa-2"
              flat
              v-for="(item, i) in searchResults"
              :key="i"
              @click="goToSelectedItem(item)"
            >
              <span :class="myNameStyle(i)"> {{ item.name }} </span> |
              <span :class="myVerseTextStyle(i)"> {{ item.mantra }} || 
              <span v-if="item.verse_id>0">  (v-{{item.verse_id}})</span></span>
              <v-divider></v-divider>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center text--primary">
        <div class="body-1">Browse by</div>
        <v-btn
          outlined
          rounded
          text
          v-for="(item, i) in filterByOptions"
          :key="i"
          class="text-none text--primary ma-2"                    
          @click="findUnique(item)"
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
            v-for="(item, i) in nextFilterOptions"
            :key="i"
            :input-value="nextFilter == item"
            filter
            class="mr-2"
            @click="setSearchSelect(item)"
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
        "Deity",
        "Quality",
        "Category",
        //"Popularity",
      ],
      filterSelected: null,
      nextFilterOptions: [],
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
    ...mapState("coretext", ["mantras", "indexMantras", "copyMantras"]),
  },
  watch: {
    myQuery(val) {
      console.log(val);
      console.log(this.indexMantras)
      if (this.indexMantras === null) {
        this.createSearch();
        console.log("I created index");
      }
      this.searchQuery(val);
    },
  },
  methods: {
    ...mapMutations("coretext", ["SET_indexMantras"]),
    ...mapMutations("parameters", ["SET_value"]),
    myNameStyle(i){
      if(i < 2) 
      { 
        return "body-2 success--text" }
         else if (i < 5) {
           return "body-2 warning--text"
           } else {
             return "caption error--text"
    }
    },
    myVerseTextStyle(i){
      if(i < 2) {
        return "caption text--primary"
        }else if(i <5) {
          return "caption text--secondary" } else 
          {
      return "caption text--disabled" }
    },
    goToSelectedItem(item) {
      this.SET_value({
        list: [{ mantra_id: item.id, verse_id: item.verse_id }],
        id: "searchSelect",
      });
      this.focus = false;
      setTimeout(() => {
        let temp = '#ID_mantra' + item.id + 'verse' + item.verse_id
        this.$vuetify.goTo(temp, {
          duration: 300,
          offset: -300,
          easing: "easeInOutCubic",
        });
      }, 100);
    },
    createSearch() {
      //I messed up in naming the id instead of mantra_id in temp.push below
      //doesn't make a difference but not a good practice
      //same with naming the verse mantra
      //again a bad and potentially confusing practice

      //make a local copy
      let temp = [];
      // add id to every entry
      let ix = 0;
      for (var j = 0; j < this.mantras.length; j++) {
        let myCopy = [...this.mantras[j].mantra];
        // console.log(myCopy)
        for (var k = 0; k < myCopy.length; k++) {
          temp.push({
            id: j,
            verse_id: k,
            ix_id: ix,
            name: this.mantras[j].name.slice(),
            mantra: myCopy[k],
          });
          ix = ix + 1;
        }
      }

      // setup the index
      let temp1;
      temp1 = new FlexSearch({
        tokenize: 'reverse',
         encode: 'icase',
    threshold: 1,
    resolution: 3,
        doc: {
          id: "id",
          field:  ["name" ,"mantra"],
        },
      });
      // console.log(temp);
      //create the actual index
      temp1.add(temp);
      //console.log(temp1.info)
      this.SET_indexMantras(temp1);
      // console.log(temp);
    },
    searchQuery(val) {
      let searchResultsAll = this.indexMantras.search({
        // query:this.convertItrans(word),
        query: val,
        // limit: 5,
        // threshold: 10,
        // resolution: 12,
      //  tokenize: "strict",
      //   depth: 3, 
      //   resolution: 9,
        // encode: "false",
      });
      // console.log('search results')
      // console.log(searchResultsAll);
      this.searchResults = [];
      let searchResultsTemp = [];
      for (var i = 0; i < searchResultsAll.length; i++) {
        // console.log(i)
        if (i === 0) {
          searchResultsTemp.push({
            mantra_id: searchResultsAll[i].id,
            verse_id: searchResultsAll[i].verse_id,
          });
          this.searchResults.push(searchResultsAll[i]);
        } else {
          // console.log('in else')
          
          if (searchResultsAll[i - 1].id != searchResultsAll[i].id) {
            // console.log('I am here')
            searchResultsTemp.push({
              mantra_id: searchResultsAll[i].id,
              verse_id: searchResultsAll[i].id,
            });
            this.searchResults.push(searchResultsAll[i]);
          }
        }
      }
      // console.log('search results tmep')
      // console.log(searchResultsTemp)
      if(searchResultsTemp.length > 0){
      this.SET_value({ list: searchResultsTemp, id: "searchSelect" });
      }
    },
    findUnique(property) {
      this.filterSelected = property;
      this.nextFilterOptions = [
        ...new Set(this.mantras.map((a) => a[property])),
      ];
    },
    setSearchSelect(item) {
      this.nextFilter = item;
      let myIndices = this.mantras
        .filter((a) => a[this.filterSelected] === item)
        .map((b) => {
          return { mantra_id: b.id - 1, verse_id: 0 };
        });
      this.SET_value({ list: myIndices, id: "searchSelect" });
      // console.log(myIndices);
    },
  },
};
</script>
 <style lang="scss" scoped>
</style>
