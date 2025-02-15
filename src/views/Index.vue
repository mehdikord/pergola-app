<script>
import Index_Services_Box from "@/views/index/Index_Services_Box.vue";
import Index_Question_Box from "@/views/index/Index_Question_Box.vue";

export default {
  name: "Index",
  components: {
    'index_services_box' : Index_Services_Box,
    'index_question_box' : Index_Question_Box
  },

  data(){
    return{

    }
  }
}
</script>

<template>

  <q-card flat >
    <q-card-section class="q-px-xs">
      <div class=" text-center">
        <img class="logo-image" src="assets/images/icons/logo.png" alt="">
      </div>
      <div class="text-center subtitle-text q-mt-sm">
        <strong class="text-pink-9">
          پرگولا اولین پلتفرم اختصاصی مو و رنگ مو
        </strong>
      </div>
      <div class="q-mt-lg">
        <index_services_box></index_services_box>
      </div>
      <q-separator class="q-mt-md q-mb-sm"/>
      <index_question_box></index_question_box>
    </q-card-section>

  </q-card>
</template>

<style scoped>

.subtitle-text{
  font-size: 19px;
}
.logo-image{
  width: 340px;
}
@media only screen and (max-width: 768px) {
  .subtitle-text{
    font-size: 16px;
  }
  .logo-image{
    width: 260px;
  }
}
</style>