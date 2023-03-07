<template>
  <top-nav
      v-if="userStatus"
      :minutes="minutes"
      :seconds="seconds"
      :resetCountdown="resetCountdown"
      :theme="themeColor"
  />
  <default-top-nav
      v-else
      :themebackground="themebackground"
  />
  <div class="container">
    <side-bar
        v-if="userStatus"
        :openAndClose="openAndCloseSideBar"
        :environment="environment"
        :items="userMenus"
        :userData="userData"
    />
    <default-side-bar
        v-else
        :environment="environment"
        @open="openModal"
    />
    <main class="sub-content__wrap">
      <bread-crumbs :closeSideBar="closeSideBar"/>
      <router-view
          @rowClicked="handleRowClick"
          :item="item"
          @themechange="handleThemeChangeEvent"
          :menus="menus"
          :rates="rates"
      />
      <login-modal
          v-if="showModal"
          @close="showModal = false"
          :key="modalKey"
          :modalActive="modalActive"
          @values="handleLogin"
      />
    </main>
  </div>
</template>

<style>
.red .nav__wrap:after {
  background-color: #c93328!important
}
.red.header.ex {
  background-color: #c93328!important
}
.red .nav__link.currentMenu {
  background-color: #7e0909!important
}
.red .custom__bar li.topClock {
  background-color: #7e0909!important
}
.red .custom__bar li.topnoti {
  background-color: #7e0909!important
}
.green .nav__wrap:after {
  background-color: green!important
}
.green.header.ex {
  background-color: green!important
}
.green .nav__link.currentMenu {
  background-color: #013220!important
}
.green .custom__bar li.topClock {
  background-color: #013220!important
}
.green .nav__link.currentMenu {
  background-color: #013220!important
}
.blue .nav__wrap:after {
  background-color: blue!important
}
.blue.header.ex {
  background-color:blue!important
}
.blue .nav__link.currentMenu {
  background-color:#063561!important
}
.blue .custom__bar li.topClock {
  background-color: #063561!important
}
.blue .nav__link.currentMenu {
  background-color: #063561!important
}
</style>

<script>
import TopNav from '@/components/TopNav.vue'
import SideBar from '@/components/SideBar.vue'
import BreadCrumbs from '@/components/Breadcrumbs.vue'
import DefaultTopNav from "@/components/DefaultTopNav.vue";
import DefaultSideBar from "@/components/DefaultSideBar.vue";
import LoginModal from "@/components/LoginModal.vue";
import {mapState} from "vuex";

export default {
  components: {BreadCrumbs, SideBar, TopNav, DefaultTopNav, DefaultSideBar, LoginModal},
  data() {
    return {
      openAndCloseSideBar: true,
      minutes: 30,
      seconds: 0,
      environment: 'TEST-SERVER',
      theme: '',
      menus: [],
      userData: [],
      showModal: false,
      modalKey: 0,
      modalActive: '',
      email: '',
      password: '',
      item: [],
      themebackground: '',
      rates: []
    }
  },
  mounted() {
    this.fetchExchangeRates()
    this.getTheme()
    this.envDetection()
    this.startCountdown()
    this.fetchMenuListByRole()
  },
  methods: {
    handleRowClick(data) {
      this.item = data.data
      console.log('THIS IS THE THEME DATA', data.data)
    },
    closeSideBar () {
      this.openAndCloseSideBar = !this.openAndCloseSideBar
    },
    openModal() {
      this.showModal = true;
      this.modalActive = 'active'
      this.modalKey += 1; // Increment modal key to force re-render
    },
    startCountdown () {
      setInterval(() => {
        if (this.seconds === 0) {
            if (this.minutes === 0) {
              clearInterval(this.countdown)
            return
          }
          this.seconds = 29
          this.minutes -= 1
        } else {
          this.seconds -= 1
        }
      }, 1000)
    },
    resetCountdown () {
      this.minutes = 30
      this.seconds = 0
    },
    envDetection () {
      if (process.env.NODE_ENV === process.env.VUE_APP_ENV_LOCAL_DEV) {
        this.environment = 'TEST-SERVER'
      } else {
        this.environment = 'LIVE-SERVER'
      }
    },
    handleThemeChangeEvent (eventData) {
      this.theme = eventData.data
      console.log('THIS IS THE THEME DATA', eventData.data)
    },
    handleLogin (values) {
      this.email = values.email;
      this.password = values.password;
      this.fetchUserInfo()
    },
    async fetchUserInfo () {
      if (this.email === "" || this.password === "") {
        alert("Please fill or fields.")
      } else {
        const url = new URL('http://localhost:8080/api/calls/login');
        const params = {
          email: this.email,
          password: this.password
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        await fetch(url)
            .then((response) => response.text())
            .then((data) => {
              this.userData = JSON.parse(data)
              this.$store.commit('setUser', this.userData)
              this.$store.commit('setUserTheme', this.userData[0].theme)
              this.$store.commit('setUserStatus', true)
              this.startCountdown()
              // this.theme = themeColor
              this.fetchMenuListByRole()
            })
        this.showModal = false
      }
    },
    async fetchExchangeRates () {
        const url = new URL('http://localhost:8080/api/rates/get-all');
        await fetch(url)
            .then((response) => response.text())
            .then((data) => {
              this.rates = JSON.parse(data)
              this.$store.commit('setExchangeRates', this.rates)
            })
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

    },
    async getTheme() {
      const url = new URL('http://localhost:8080/api/calls/get-theme');
      const params = {
        id: 1
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      await fetch(url)
          .then((response) => response.text())
          .then((data) => {
            // console.log("HERE IS THE DATA: " + data)
            let background = JSON.parse(data)
            this.$store.commit('setDefaultTheme', background)
            this.themebackground = this.themeForDefault
          })

      // console.log("I got here: " + this.menus)
    }
  },
  computed: {
    ...mapState({
      themeColor: 'theme',
      userStatus: 'loggedIn',
      userMenus: 'userMenus',
      themeForDefault: 'themeForDefault'
    })
  }
}
</script>
<style>
</style>
