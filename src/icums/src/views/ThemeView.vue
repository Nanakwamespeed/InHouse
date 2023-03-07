<template>
  <article class="sub-content">
    <form id="headerForm" name="headerForm">
      <h3 class="margin_t_20">
        <label>Theme Change</label>
      </h3>
      <div class="c-table row">
        <div class="c-table__th col-xl-3 col-7">
          <label>Theme Colors</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <span class="checkbox-item" @click="changeThemeColor('red')">
            <input type="radio" class="" name="option" value="option1" :checked="isRedSelected">
            <label for="taxpayerCd0">Red</label>
          </span>
          <span class="checkbox-item" @click="changeThemeColor('blue')">
            <input type="radio" class="" name="option" value="option2" :checked="isBlueSelected">
            <label>Blue</label>
          </span>
          <span class="checkbox-item" @click="changeThemeColor('green')">
            <input type="radio" class="" name="option" value="option3" :checked="isGreenSelected">
            <label>Green</label>
          </span>
        </div>
      </div>

    </form>
  </article>
</template>
<style></style>
<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      theme: this.themeColor
    }
  },
  methods: {
    async updateUserTheme(themeColor) {
      const url = new URL('http://localhost:8080/api/calls/edit-user');
      const params = {
        theme: themeColor,
        id: 1,
        user_name: '',
        first_name: '',
        last_name: '',
        role: '',
        email: '',
        updated_by: 1
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      await fetch(url)
          .then((response) => response.text())
          .then((data) => {
            const response = JSON.parse(data)
            console.log(response)
          })
    },
    changeThemeColor (color) {
      if (color) {
        switch (color) {
          case 'blue':
            this.theme = 'blue';
            location.reload();
            break

          case 'green':
            this.theme = 'green';
            location.reload();
            break

          default:
            this.theme = 'red';
            location.reload();
            break
        }
      }
      this.$store.commit('setUserTheme', this.theme)
      this.$store.commit('setDefaultTheme', this.theme)
      this.updateUserTheme(this.theme)
      this.$emit('themechange', { data: this.theme })
    },
  },
  computed: {
    ...mapState({
      themeColor: state => state.theme
    }),
    isRedSelected() {
      if(this.themeColor === 'red')
      return 'option1';
    },
    isBlueSelected() {
      if(this.themeColor === 'blue')
        return 'option2';
    },
    isGreenSelected() {
      if(this.themeColor === 'green')
        return 'option3';
    },
  }
}
</script>