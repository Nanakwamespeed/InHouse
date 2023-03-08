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
  </div>
</template>

<script>
export default {
  name: "TrackingView.vue",
  data(){
    return{
      tracking_icon:'',
      tracking_name:''
    }
  }
}
</script>

<style scoped>

</style>