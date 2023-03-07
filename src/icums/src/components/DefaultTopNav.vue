<template>
  <h1 class="skip">{{ title }}</h1>

  <header :class="themebackground" class="header ex">
    <div class="gnb">
      <div class="wrap">
        <div class="gnb__inner">
        </div>
      </div>
    </div>
    <div class="navigator">
      <div class="logo"><a class="logo__link" href="#"><span class="skip">ICUMS</span></a></div>
      <div class="nav" data-dragscrolls="dragscrolls">
        <div class="nav__m-button">
          <div class="open">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="nav__backdrop"></div>
        <div class="nav__wrap">
          <div class="nav-m__header">
            <div class="nav-close">
              <button class="close" type="button"><span class="skip">nav close</span></button>
            </div>
          </div>
          <div class="nav__tab clearfix">
            <ul class="nav__tab-list">
              <li class="nav__tab-item n1 active">
                <a class="nav__tab-button" data-button="tab" href="#nav__group">TASK MENU</a>
              </li>

            </ul>
          </div>
          <div class="nav__tab-body" data-overflowing="none">

            <nav id="nav__group" class="nav__group active"
                 style="transform: translateX(0px); width: 326.641px;">
              <h2 class="skip">navigation</h2>
              <!-- MAIN NAV START -->
              <ul id="topMenuWeb" class="nav__list">
                <li class="nav__item"><a class="nav__link" href="#" onclick="selectMenuTab(1);">More
                  Information</a></li>
              </ul>
              <!-- MAIN NAV END -->
            </nav>
          </div>
        </div>
        <button class="nav__button nav__prev" type="button"><span class="skip">Prev
                        Navigation</span></button>
        <button class="nav__button nav__next" type="button"><span class="skip">Next
                        Navigation</span></button>
        <div class="notification__wrap">
          <ul class="notification__list">
            <li class="notification__item">
              <a href="">
                                <span>IDF Number.
                                    VH20181080000000000022 has been paid onUVR Number.</span>
                <span class="date">about 24 hours ago</span>
              </a>
            </li>
            <li class="notification__item">
              <a href="">
                                <span>IDF Number.
                                    VH20181080000000000022 has been paid onUVR Number.</span>
                <span class="date">about 24 hours ago</span>
              </a>
            </li>
            <li class="notification__item">
              <a href="">
                                <span>IDF Number.
                                    VH20181080000000000022 has been paid onUVR Number.</span>
                <span class="date">about 24 hours ago</span>
              </a>
            </li>
          </ul>
          <div class="notification__more"><a href="">See All Messages</a></div>
        </div>
      </div>
    </div>
    <nav id="MenuWrap" class="menu-nav">
      <ul class="menu-nav__list">
        <li class="menu-nav__item">
          <a href="/co/notifi/selectNotificationList.do?MENU_ID=IIM01S01V08">More Notification</a>
        </li>
        <li class="menu-nav__item">
          <a href="#" onclick="allNotificationConfirm();">All Confirm</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      title: 'ICUMS'
    }
  },
  mounted() {
    // location.reload();
  },
  props: ['themebackground']
}
</script>