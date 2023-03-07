<template>
  <div class="modal log" :class="modalActive" id="login-modal" tabindex="0" role="dialog">
    <div class="modal__body" style="width:35%; height: 90%">
      <div class="modal__header">
        <div class="modal__title">{{ title }}</div>
        <p class="modal__logtxt">{{ subTitle }}</p>
      </div>
      <div class="modal__content">
        <div class="login">
          <form id="form1" name="form1">
            <label for="id" class="skip">ID</label>
            <input
                type="text"
                name="userid"
                id="userid"
                class="text_input"
                placeholder="ID"
                v-model="email"
            >
            <label for="pw" class="skip">PASSWORD</label>
            <input type="password" name="userpw" id="userpw" onclick="" class="text_input"
                   placeholder="PASSWORD" v-model="password">
            <div class="ly_v2" id="err_capslock" style="display:none;">
              <div class="ly_box">
                <p><strong>Caps Lock is On</strong></p>
              </div>
              <span class="sp ly_point"></span>
            </div>
            <button type="button" class="submit" @click="sendLogInDetailsForSubmit">Continue</button>

            <div class="login_info">
              <a href="javascript:popupOpen();" class="login__link">Forgot ID/PW </a>
              <a href="javascript:checkId('MB');" class="login__link">User Status Check</a>
              <p>Please contact the Administrator by email or telephone number below.</p>
              <ul class="number_info">
                <li class="call">0302750140 / 0596921182</li>
                <li class="mail">info@icums.gov.gh</li>
              </ul>
            </div>
            <input type="hidden" name="currIp" id="currIp">
          </form>
        </div>
      </div>
      <div class="modal__close">
        <button type="button"  @click="$emit('close')" class="modal__close-button">
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  display: block!important;
  position: fixed!important;
  z-index: 1050!important;
  left: 0!important;
  top: 0!important;
  right: 0!important;
  bottom: 0!important;
  text-align: center!important;
  overflow-x: hidden!important;
  overflow-y: auto!important;
  background-color: rgba(0,0,0,0.4)!important;
}

.login .login_info {
  display: block!important;
  clear: both!important;
  width: 100%!important;
  border: 1px solid #ddd!important;
  padding: 30px!important;
}
</style>
<script>
export default {
  data() {
    return {
      title: 'Login',
      subTitle: 'Integrated Customs Management System',
      email: '',
      password: ''
    }
  },
  props: ['modalActive'],
  methods: {
    sendLogInDetailsForSubmit () {
      this.$emit("values", { email: this.email, password: this.password });
    }
  }
}
</script>