<script>
export default {
  name: "Index_Services_Box"
}
</script>

<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm text-center">
      <div class="text-center">
        <img src="@/assets/images/icons/jalali.png" class="svg-animate" alt="">
      </div>
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm">
      <div class="text-center font-18 font-weight-600 text-pink-8">
        هوش مصنوعی رنگ مو
      </div>
      <div class="text-grey-7 text-center q-mt-xs font-15">
        تغییر رنگ مو با کمک هوش مصنوعی پرگولا !
      </div>
      <div class="text-center q-mt-md q-mb-sm">
        <q-btn :to="{name : 'services_coloring'}" color="indigo-7" outline class="font-15" rounded label="شروع تغییر رنگ مو"></q-btn>
      </div>
    </div>
  </div>

</template>

<style scoped>
.svg-animate{
  width: 360px;
}
@media only screen and (max-width: 768px) {
.svg-animate{
  width: 300px;
}
}

</style>