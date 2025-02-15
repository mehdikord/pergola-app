<script>
export default {
  name: "Index_Services_Box"
}
</script>

<template>
  <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-6 q-px-xs q-mb-sm">
      <router-link :to="{name :'services_coloring'}">
        <div class="service-box bg-teal-7 ">
          <q-icon name="fa-duotone fa-light fa-palette" class="service-icon" color="white"></q-icon>
          <strong class="float-right text-white service-title">تغییر رنگ مو</strong>
        </div>
      </router-link>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-6 q-px-xs q-mb-sm">
      <div class="service-box bg-blue-7 ">
        <q-icon name="fa-duotone fa-solid fa-user-robot" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">هوش مصنوعی</strong>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-6 q-px-xs q-mb-sm">
      <div class="service-box bg-deep-orange-6 ">
        <q-icon name="fa-duotone fa-light fa-face-viewfinder" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">آنالیز چهره شما</strong>
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-6 q-px-xs q-mb-sm">
      <div class="service-box bg-deep-purple-6 ">
        <q-icon name="fa-duotone fa-light fa-paintbrush" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">کارخانه رنگ</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-box{
  padding: 15px 15px;
  border-radius: 20px;
}
.service-icon{
  font-size: 42px;
}
.service-title{
  font-size: 15px;
  margin-top: 8px;
}
@media only screen and (max-width: 768px) {
  .service-box{
    padding: 14px 10px;
    border-radius: 20px;
  }
  .service-icon{
    font-size: 34px;
  }
  .service-title{
    font-size: 13px;

  }
}

</style>