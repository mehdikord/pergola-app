<script>
export default {
  name: "Auth",
  data(){
    return {
      phone_loading:false,
      code_loading:false,
      phone_form:true,
      phone:null,
      code:null
    }
  },
  methods:{
    Send_Phone(){
      this.phone_loading=true;

      this.phone_form=false;

    },
    Send_Code(){
      this.phone_loading=true;

      this.phone_form=false;

    },


  }
}
</script>

<template>
  <q-card flat>
    <q-card-section >
      <div class=" text-center q-mt-md res-page-title font-lalezar text-pink-6 animation-fade-in">
        ورود به حساب پرگولا
      </div>
      <div class="text-center q-mt-md">
        <img v-if="phone_form" class="bg-image" src="assets/images/background/mobile-login-animate.svg" alt="" >
        <img v-else class="bg-image" src="assets/images/background/sms-animate.svg" alt="" >

      </div>
    </q-card-section>
    <q-card-section class="q-pt-none" >
      <template v-if="phone_form">
        <div class="row justify-center animation-fade-in">
          <div class="col-sm-9 col-xs-10 col-md-6 col-lg-4 col-xl-4 text-center">
            <strong class="text-pink-7">شماره موبایل خود را وارد کنید</strong>
            <div class="q-mt-md">
              <q-input v-model="phone" dir="ltr" outlined rounded color="blue-grey-4" placeholder="09XX XXX XXXX" >
                <template v-slot:append>
                  <q-icon name="fa-duotone fa-regular fa-mobile-button text-deep-purple-9" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-lg text-center">
              <q-btn @click="Send_Phone" :loading="phone_loading" class="auth-btn" glossy push rounded label="ورود به حساب " color="purple-5" style="width: 100%"></q-btn>
            </div>
          </div>
        </div>

      </template>
      <template v-else>
        <div class="row justify-center animation-fade-in">
          <div class="col-sm-9 col-xs-10 col-md-6 col-lg-4 col-xl-4 text-center">
            <strong class="text-pink-7">کد پیامک شده به شماره موبایل را وارد کنید</strong>
            <div class="q-mt-md">
              <q-input v-model="code" dir="ltr" outlined rounded color="blue-grey-4" placeholder="X X X X X X" >
                <template v-slot:append>
                  <q-icon name="fa-duotone fa-regular fa-message-sms text-deep-purple-9" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-lg text-center">
              <q-btn @click="Send_Code" :loading="code_loading" class="auth-btn" glossy push rounded label="ارسال کد و ورود به حساب " color="purple-5" style="width: 100%"></q-btn>
            </div>
          </div>
        </div>

      </template>


    </q-card-section>
  </q-card>
</template>

<style scoped>
.bg-image{
  max-width: 390px;
}
.auth-btn{
  font-size: 16px;
  padding: 12px 0;
}
@media only screen and (max-width: 768px) {

  .bg-image{
    max-width: 270px;
  }
  .auth-btn{
    font-size: 14px;
    padding: 14px 0;
  }

}




</style>