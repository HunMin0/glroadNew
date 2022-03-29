<template>
  <v-row :class="justify">
    <v-col cols="12" sm="4" v-if="searchTypes.includes('dates')">
      <v-menu v-model="menu_dates" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290" max-width="290">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="dateRangeText" label="조회기간" hide-details readonly v-on="on" dense outlined full-width>
            <v-btn v-if="searchButton === 'dates'" slot="append-outer" color="primary" dark @click="searchItem">검색</v-btn>
          </v-text-field>
        </template>
        <v-date-picker v-model="search.dates" range @input="closeDatePicker(0)"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="6" v-if="searchTypes.includes('keyword')">
      <v-text-field v-model="search.keyword" outlined dense :label="keywordLabel ? keywordLabel : '검색'">
        <v-btn v-if="searchButton === 'keyword'" slot="append-outer" color="primary" dark @click="searchItem">검색</v-btn>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
/*import {DateTime} from "luxon";
DateTime.defaultZoneName = 'Asia/Seoul';*/

export default {
  name: "Search.vue",
  props: ['searchTypes', 'keywordOnly', 'keywordLabel', 'statusItems', 'searchButton', 'justify'],
  mounted() {
    /*if (!this.keywordOnly && !this.statusItems) {
        this.init();
    }*/
    //this.init();
  },
  computed: {
    dateRangeText() {
      if (this.search.dates?.length === 2 && this.search.dates[0] && this.search.dates[1]) {
        return this.search.dates.join(' ~ ')
      }
    },
  },
  watch: {
    statusItems() {
      this.iStatusItems = this.statusItems;
    }
  },
  data: () =>({
    categoryItems: [],
    iStatusItems: [],
    menu_dates: false,
    search: {status: '', dates: [], keyword: ''}
  }),
  methods: {
    init() {
      axios.get(_API_URL_ + '/codes/booking-search').then(response => {
        this.categoryItems = response.data.categoryItems;
        this.iStatusItems = response.data.statusItems;
      }).catch(error => {
        console.log(error);
      });
    },
    closeDatePicker(idx) {
      this.menu_dates = !(this.search.dates.length === 2);
    },
    searchItem() {
      this.$emit('search-item', this.search);
    }
  }
}
</script>

<style scoped>
>>> .v-input__prepend-outer {
  margin-top: 0 !important;
}

>>> .v-input__append-outer {
  margin-top: 0 !important;
}
</style>
