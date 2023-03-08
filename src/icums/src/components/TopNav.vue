<template>
    <header :class="theme" class="header ex">
        <div class="navigator">
            <div class="logo">
                <routerLink to="/" class="logo__link">
                    <span class="skip">ICUMS</span>
                </routerLink>
            </div>
            <div class="nav">
                <div class="nav__m-button">
                    <div class="open">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="nav__backdrop"></div>
                <div class="nav__wrap">
                    <div class="nav-m__header">
                        <div class="user-group">
                            <a href="onclickgoeshere" class="logout btnlogout"></a>
                            <span class="user">CFA01</span>
                        </div>
                    </div>
                    <div class="nav__tab clearfix">
                        <div class="nav__tab-list"></div>
                    </div>
                    <div class="nav__tab-body" data-overflowing="right">

                        <nav id="nav__group" class="nav__group active nav-no-transition"
                            style="transform: translateX(0px); width: 1248px;">

                            <!-- MAIN NAV START -->
                            <ul id="topMenuWeb" class="nav__list">
                                <li class="nav__item">
                                    <routerLink to="/cargo" class="nav__link" :class="isCargoSelected">
                                        Cargo
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/clearance" class="nav__link" :class="isClearanceSelected">
                                        Clearance
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/collection" class="nav__link" :class="isCollectionSelected">
                                        Collection
                                    </routerLink>
                                </li>
                              <li class="nav__item">
                                <routerLink to="/themes" class="nav__link" :class="isSettingsSelected">
                                  Settings
                                </routerLink>
                              </li>
                              <li class="nav__item">
                                <routerLink to="/rates" class="nav__link" :class="isRatesSelected">
                                  Rates
                                </routerLink>
                              </li>
                                <li class="nav__item">
                                    <routerLink to="/single-window" class="nav__link" :class="isSingleWindowSelected">
                                        Single Window
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/tracking" class="nav__link">
                                        Tracking
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/agentmanagement" class="nav__link">
                                        Agent Management
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/riskmanagement" class="nav__link">
                                        Risk Management
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="/edocs" class="nav__link">
                                        e-Docs
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <routerLink to="#" class="nav__link">
                                        AEO
                                    </routerLink>
                                </li>
                                <li class="nav__item">
                                    <a href="#" class="nav__link" onclick="selectMenuTab(1);">More Information
                                    </a>
                                </li>

                            </ul>
                            <!-- MAIN NAV END -->
                        </nav>
                    </div>
                </div>
                <button class="nav__button nav__prev">
                    <span class="skip">Prev Navigation</span>
                </button>
                <button type="button" class="nav__button nav__next">
                    <span class="skip">Next Navigation</span>
                </button>
            </div>
            <div class="custom">
                <ul class="custom__bar">
                    <li class="topClock" id="fwTimer">
                        <em class="ico_clock"></em>
                        <span id="sessionTimer" @click="resetCountdown">{{ minutes }}:{{ seconds }}</span>
                    </li>
                    <li class="topnoti" id="MenuButton">
                        <i>
                            <button type="button" class="noti">
                                <span class="noti__number">78</span>
                            </button>
                        </i>
                    </li>
                    <li class="topquick" id="fwQuick" onclick="FnQuick.toggle();" title="">
                        Quick
                    </li>
                    <li class="toplaw" id="fwLaw"
                        onclick="goTabPopup('/co/statute/treePopup/selectStatuteInfo.do', 'Law Information', 'Law Information');"
                        title=""></li>
                    <li class="topguide" id="fwGuide"
                        onclick="goTabPopup('/co/guide/popup/selectGuidePopup.do?decorator=popup', 'Guide Window');"
                        title=""></li>
                    <li class="toplogout" id="fwLogout">
                        <a @click="logOut">LOGOUT</a>
                    </li>
                </ul>
            </div>
        </div>
        <nav class="menu-nav" id="MenuWrap">
            <ul class="menu-nav__list">
                <!-- <li class="menu-nav__item">
                            <a href="/co/notifi/selectNotificationList.do?MENU_ID=IIM01S01V08">More Notification</a>
                        </li> -->
                <!-- <li class="menu-nav__item">
                            <a href="#" onclick="allNotificationConfirm();">All Confirm</a>
                        </li> -->
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
  name: 'TopNav',
  data() {
    return {
      isCargo: '',
      isClearance: '',
      isSettings: ''
    }
  },
  props: [
    'minutes',
    'seconds',
    'resetCountdown',
    'theme'
  ],
  methods: {
    logOut() {
      this.$store.dispatch('resetState');
      this.$router.push({ path: '/' })
    },
  },
  computed: {
    isSettingsSelected() {
      if(this.$route.name === 'Themes')
        return 'currentMenu';
    },
    isCargoSelected() {
      if(this.$route.name === 'Cargo')
        return 'currentMenu';
    },
    isCollectionSelected() {
      if(this.$route.name === 'Collection')
        return 'currentMenu';
    },
    isSingleWindowSelected() {
      if(this.$route.name === 'Single Window')
        return 'currentMenu';
    },
    isClearanceSelected() {
      if(this.$route.name === 'Clearance')
        return 'currentMenu';
    },
    isRatesSelected() {
      if(this.$route.name === 'Exchange Rates')
        return 'currentMenu';
    },
  }
}
</script>
