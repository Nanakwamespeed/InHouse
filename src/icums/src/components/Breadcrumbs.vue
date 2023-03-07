<template>
    <div class="toparea">
        <div class="side-more">
            <button class="side-close" @click="closeSideBar">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="side-tit">
                <h2 class="content-title">
                    <span class="fo">
                        {{ this.$route.name }}
                    </span>
                    <input type="hidden" id="getMenuID" value="CLM01S01V01" />
                    <button id="favoriteButton" type="button" class="fav">
                        Favorites
                    </button>
                    <a href="#">
                        <img src="../assets/images/opinion.png" alt="Help Desk" title="Help Desk">
                    </a>
                </h2>
            </div>
        </div>
        <div class="top-bar">
            <div class="page-back"><a href="#" onclick="history.back(-1); return false;">BACK</a></div>
            <div class="path"> <span class="home"> Clearance </span>
                <span> &nbsp;&gt;&nbsp; </span> Declaration &nbsp;&gt;&nbsp; Register Declaration
                &nbsp;&gt;&nbsp; <strong> Create BOE Declaration </strong>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data: function () {
    return {
      breadcrumbItems: []
    }
  },
  props: [
    'closeSideBar'
  ],
  computed: {
  }
}
</script>
