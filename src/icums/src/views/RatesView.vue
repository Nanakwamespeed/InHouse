<template>
  <article class="sub-content">
    <form id="headerForm" name="headerForm">
      <h3 class="margin_t_20">
        <label>Add Exchange Rate</label>
      </h3>
      <div class="c-table row">
        <div class="c-table__th col-xl-3 col-7">
          <label>Country</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="country" class="text_input" v-model="country">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Country Icon</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="icon" class="text_input" v-model="flag">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Selling</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="icon" class="text_input" v-model="selling">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Buying</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="icon" class="text_input" v-model="buying">
        </div>
      </div>
      <div class="g-button-group margin_t_10 right">
        <button type="button" class="g-button" style="margin-right: 5px;" @click="saveMenu">
          <label>Save</label>
        </button>
      </div>
    </form>

    <div class="row margin_t_20">
      <div class="col-sm-8 col-24">
        <h3><label >Exchange Rates List</label></h3>
      </div>
      <div class="col-sm-16 col-24">
        <div class="w-button-group right">
        </div>
      </div>
    </div>

    <table id="containerList" class="g-table"  data-table="rwd" data-breakpoint="760">
      <thead>
      <tr>
        <th colspan="8" v-for="column in columns" :key="column">
          <label >{{ column }}</label>
        </th>
      </tr>
      </thead>
      <tbody class="text_center">

      <tr v-for="(item, index) in rates" :key="index" @click="">
        <td colspan="8"
            v-for="(column, index) in columns"
            :key="index"
        >
          <span v-if="column === 'Country'" :class="item['flag']"></span>
          {{ itemValue(item, column) }}
        </td>
      </tr>


      </tbody>
    </table>
  </article>
</template>
<style></style>
<script>

import {mapState} from "vuex";

export default {
  // props: ['menus'],
  data() {
    return {
      country: '',
      flag: '',
      selling: '',
      buying: '',
      columns: ["Country", "Selling", "Buying"]
    }
  },
  methods: {
    itemValue(item, column) {
      // console.log("Here is the item hasValue: " + item[column.toLowerCase()])
      return item[column.toLowerCase()];
    },
    async saveMenu(){
      if(this.name.length === 0 || this.link.length === 0 || this.role.length === 0) {
        alert("Please make sure all fields are filled.")
      } else {
        const url = new URL('http://localhost:8080/api/menus/add');
        const params = {
          name: this.name,
          link: this.link,
          role: this.role,
          created_by: 1
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        await fetch(url)
            .then((response) => response.text())
            .then((data) => {
              const response = JSON.parse(data)
              console.log("Here is the response: " + response)
              alert("New menu was added successfully")
              location.reload();
            })
      }
    },
    moveToDetailView(item) {
      this.$emit("rowClicked", { data: item });
      this.$router.push({ path: '/menu-edit' })
    },
  },
  computed: {
    ...mapState({
      rates: 'exchangeRates'
    })
  }
}
</script>