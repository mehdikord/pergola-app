<script>
export default {
  name: "Services"
}
</script>

<template>
  <q-card flat>
    <q-card-section >
      <div class=" text-center q-mt-sm res-page-title font-lalezar text-pink-6 animation-fade-in">
        خدمات پرگولا
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
          <router-link :to="{name: 'services_coloring'}">
          <div class="service-box bg-grey-3 cursor-pointer">
            <div class="row">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                <img src="assets/images/icons/coloring.png" class="service-img" alt="">
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10">
                <strong class="service-title text-purple-9">تغییر رنگ مو</strong>
                <div class="q-mt-sm text-grey-8 service-subtitle">
                  راهنما کامل تغییر رنگ مو با بروز ترین متد ها
                </div>
              </div>
            </div>
          </div>
          </router-link>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
          <div class="service-box bg-grey-3 cursor-pointer">
            <div class="row">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                <img src="assets/images/icons/robot.png" class="service-img" alt="">
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10">
                <strong class="service-title text-purple-9">آنالیز با هوش مصنوعی</strong>
                <div class="q-mt-sm text-grey-8 service-subtitle">
                  طراحی چهره شما با تغییرات دلخواه توسط هوش مصنوعی
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.service-box {
  padding : 18px 15px;
  border-radius: 14px;
}
.service-img{
  width: 68px;
}
.service-title{
  font-size: 19px;

}
.service-subtitle{
  font-size: 14px;
}
@media only screen and (max-width: 768px) {
  .service-img{
    width: 50px;
  }
  .service-title{
    font-size: 15px;
  }
  .service-subtitle{
    font-size: 12.5px;
  }
}
</style>