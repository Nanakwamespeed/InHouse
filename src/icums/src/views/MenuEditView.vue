<template>
  <article class="sub-content">
    <form id="headerForm" name="headerForm">
      <h3 class="margin_t_20">
        <label>Add Menu</label>
      </h3>
      <div class="c-table row">
        <div class="c-table__th col-xl-3 col-7">
          <label>Menu Name</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="menu_name" class="text_input" v-model="item.name">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Menu Link</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <input type="text" name="menu_link" class="text_input" v-model="item.link">
        </div>
        <div class="c-table__th col-xl-3 col-7">
          <label>Role</label>
        </div>
        <div class="c-table__td col-xl-9 col-17">
          <select name="menu_role" class="text_input" size="1" v-model="item.role">
            <option value="admin" selected="selected">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      <div class="g-button-group margin_t_10 right">
        <button type="button" class="g-button" style="margin-right: 5px;" @click="updateMenu">
          <label>Save</label>
        </button>
      </div>
    </form>
  </article>
</template>
<sytle></sytle>
<script>
export default {
  props: ['item'],
  data () {
    return {

    }
  },
  methods: {
    async updateMenu() {
      if(this.item.name.length === 0 || this.item.link.length === 0 || this.item.role.length === 0) {
        alert("Please make sure all fields are filled.")
      } else {
        const url = new URL('http://localhost:8080/api/menus/edit-menu');
        const params = {
          name: this.item.name,
          link: this.item.link,
          role: this.item.role,
          id: this.item.id,
          updated_by: 1
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        await fetch(url)
            .then((response) => response.text())
            .then((data) => {
              const response = JSON.parse(data)
              console.log("Here is the response: " + response)
              alert("Menu was updated successfully")
            })
        this.fetchMenuListByRole()
      }
    },
    async fetchMenuListByRole() {

      const url = new URL('http://localhost:8080/api/menus/get-by-role');
      const params = {
        role: 'user'
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      await fetch(url)
          .then((response) => response.text())
          .then((data) => {
            this.menus = JSON.parse(data)
            this.$store.commit('setUserMenus', this.menus)
          })

      this.$router.push({ path: '/menus' })
    }
  },
}
</script>