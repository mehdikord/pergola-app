<script>
export default {
  name: "Index_Services_Box"
}
</script>

<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <router-link :to="{name :'services_coloring'}">
        <div class="service-box bg-teal-7  ">
          <q-icon name="fa-duotone fa-light fa-palette" class="service-icon" color="white"></q-icon>
          <strong class="float-right text-white service-title">هوش مصنوعی رنگ مو</strong>
        </div>
      </router-link>
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <div class="service-box bg-indigo-8 ">
        <q-icon name="fa-duotone fa-light fa-face-viewfinder" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">آنالیز چهره شما</strong>
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
    padding: 20px 15px;
    border-radius: 20px;
  }
  .service-icon{
    font-size: 34px;
  }
  .service-title{
    font-size: 15px;
    margin-right: 15px;
  }
}

</style>