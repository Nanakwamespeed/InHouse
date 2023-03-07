<template>
    <aside class="side" v-if="openAndClose">
        <div class="side-log">
            <ul class="login_user">
                <li class="user_info">
                    CFA01
                    <a href="#" class="ico_pw" title="change password">
                        change password
                    </a>
                </li>
                <li class="user_agency">{{ userInfo[0].first_name }}  {{ userInfo[0].last_name }}</li>
            </ul>
            <div class="test-server">{{ environment }}</div>
        </div>
        <div class="side-tab">
            <button id="web_side_menu_btn" type="button" class="side-tab__item"  title="TASK MENU" @click="toggleMenu">
                Task Menu
            </button>
            <button id="web_side_mymenu_btn" class="side-tab__item " title="MY MENU" @click="toggleMenu">
                My Menu
            </button>
        </div>
        <div class="side-menu side__taskmenu active" v-if="isVisible">
            <ul class="side-menu__list">
                <div id="lnb">
                    <h1>Main Navigation</h1>
                    <ul>
                        <li class="">
                            <a href="">Declaration</a>
                            <ul style="display: block;" v-for="(item, index) in items" :key="index">
                                <li class="active"  :class="{ on: item.link === $route.path }">
                                    <router-link :to="item.link">{{ item.name }}</router-link>
                                    <ul style="display: block;" v-for="tab in item[index]" :key="index">
                                        <li class="noDepth">
                                            <a name="compareMenuID" id="CLM01S01V01" href="#">
                                                {{ tab.name }}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <!-- <li class="on active">
                                    <a href="javascript:void 0;">Register Declaration</a>
                                    <ul style="display: block;">
                                        <li class="noDepth"><a name="compareMenuID" id="CLM01S01V01" href="#"
                                                onclick="selectMenuTab(1);">Create BOE Declaration </a></li>
                                        <li class="on noDepth active"><a name="compareMenuID" id="CLM01S01V02" href="#"
                                                onclick="selectMenuTab(1);">Search BOE Declaration </a>
                                        </li>
                                    </ul>
                                </li> -->
                            </ul>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
        <div v-else>
            <h1>My Menu</h1>
        </div>
    </aside>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'SideBar',
  data () {
    return {
      isVisible: true,
      menu: this.items,
      // name: this.userData[0].name
    }
  },
  methods: {
    toggleMenu () {
      this.isVisible = !this.isVisible
    }
  },
  props: [
    'openAndClose',
    'environment',
    'items',
    'userData'
  ],
  computed: {
    ...mapState({
      menus: state => state.userMenus,
      userInfo: state => state.user
    }),
  }

}
</script>
