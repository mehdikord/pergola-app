<script>
export default {
  name: "Contact",
  data() {
    return {
      loading: false,
      errors:[],
      message:{
        name:null,
        phone:null,
        message:null
      }
    }
  },
  methods: {
    Send_Message(){
      this.loading = true


    }
  }
}
</script>

<template>
  <q-card flat >
    <q-card-section >
      <div class=" text-center q-mt-md res-page-title font-lalezar text-pink-6 animation-fade-in">
        ارتباط با تیم پرگولا
      </div>
      <div class="q-mt-sm text-center text-grey-10 subtitle">
        کاربر گرامی شما میتوانید از طریق روش های زیر با تیم پرگولا در ارتباط باشید
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/Viber.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">0912 869 7954</strong>
          </div>
        </div>
        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/Instagram.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">
              <a href="https://instagram.com/sari.hair" target="_blank" class="text-pink-9">@sari.hair</a>
            </strong>
          </div>
        </div>

        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/Telegram.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">
              <a href="https://telegram.me/Academyjalaly" target="_blank" class="text-pink-9">@Academyjalaly</a>
            </strong>
          </div>
        </div>

        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/Youtube.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">
              <a href="https://youtube.com/@sarihair" target="_blank" class="text-pink-9">@Sarihair</a>
            </strong>
          </div>
        </div>

        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/Tiktok.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">
              <a href="https://tiktok.com/@sari_hair" target="_blank" class="text-pink-9">@Sari_hair</a>
            </strong>
          </div>
        </div>

        <div class="col-sm-12 col-xs-12 col-md-12 q-pa-sm">
          <div class="contact-item-box bg-blue-grey-1">
            <img src="@/assets/images/social/aparat.svg" class="icon-size" alt="">
            <strong dir="ltr" class="float-right q-mt-md text-pink-9 contact-info">
              <a href="https://aparat.com/rezajalali_sarihair" target="_blank" class="text-pink-9">Sarihair</a>
            </strong>
          </div>
        </div>

      </div>
    </q-card-section>
    <q-separator class="q-mt-md"/>
    <q-card-section class="q-mt-md">
      <div class="text-center font-lalezar text-pink-6 animation-fade-in message-title">
        ثبت پیشنهادات و انتقادات
      </div>
      <div class="q-mt-sm text-center text-grey-9">
        با ارسال انتقادات و پیشنهادات ارزشمند خود ، مارا در بهبود و ارتقاء کیفیت کار خود کمک کنید
      </div>
      <div class="q-mt-lg row q-mb-md">
        <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
          <q-input v-model="message.name" outlined rounded label="نام شما" color="blue-grey-8">
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-solid fa-user text-purple-7" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
          <q-input v-model="message.phone" outlined rounded label="شماره تماس (اختیاری)" color="blue-grey-8">
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-solid fa-mobile-button text-purple-7" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pa-sm q-mt-sm">
          <q-input v-model="message.message" outlined rounded label="پیام شما" color="blue-grey-8" type="textarea" rows="5">
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-solid fa-message text-purple-7" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pa-sm q-mt-sm">

          <q-btn class="send-btn" icon="fa-duotone fa-regular fa-send text-white" glossy push rounded label="ارسال پیام" color="pink-6"></q-btn>

        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.subtitle{
  font-size: 17.5px;
}
.contact-item-box{
  padding : 8px 15px;
  border-radius: 14px;
}
.icon-size{
  width: 65px;
}
.contact-title{
  font-size: 14px;
}
.contact-info{
  font-size: 18px;
}
.message-title{
  font-size: 26px;
}
.send-btn{
  font-size: 15px;
}

@media only screen and (max-width: 768px) {
  .subtitle{
    font-size: 15px;
  }
  .icon-size{
    width: 45px;
  }
  .contact-title{
    font-size: 13px;
  }
  .contact-info{
    font-size: 14px;
  }
  .message-title{
    font-size: 22px;
  }
  .send-btn{
    font-size: 13px;
  }

}


</style>