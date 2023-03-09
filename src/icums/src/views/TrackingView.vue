<template>
  <div class="sub-content">
    <form id="headerForm" name="headerForm">
      <h3 class="margin_t_20">
        <label>Add Tracking</label>
      </h3>
      <div class="c-table row">
        <div class="c-table__th col-xl-3 col-7">
          <label>Tracking Icon</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="tracking_icon" class="text_input" v-model="tracking_icon">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Tracking Name</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="tracking_name" class="text_input" v-model="tracking_name">
        </div>
      </div>
      <div class="g-button-group margin_t_10 right">
        <button type="button" class="g-button" style="margin-right: 5px;" @click="">
          <label>Save</label>
        </button>
      </div>
    </form>

    <div class="row margin_t_20">
      <div class="col-sm-8 col-24">
        <h3><label >Tracking List</label></h3>
      </div>
      <div class="col-sm-16 col-24">
        <div class="w-button-group right">
        </div>
      </div>
    </div>

    <div>
      <table id="container-list" class="g-table" data-table="rwd" data-breakpoint="760">
        <thead >
          <tr>
            <th v-for="col in column">
              <span>{{ col }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TrackingView.vue",
  data(){
    return{
      tracking_icon:'',
      tracking_name:'',
      column:['Tracking Icon','Tracking Name']
    }
  },
  computed:{
    ...mapState({
      tracking: 'track'
    })
  }
}
</script>

<style scoped>

</style>