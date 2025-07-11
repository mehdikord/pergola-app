<script>
import Index_Services_Box from "@/views/index/Index_Services_Box.vue";
import Index_Question_Box from "@/views/index/Index_Question_Box.vue";
import Index_Post_Categories from "@/views/index/Index_Post_Categories.vue";

export default {
  name: "Index",
  components: {
    'index_services_box' : Index_Services_Box,
    'index_question_box' : Index_Question_Box,
    'index_post_category' : Index_Post_Categories,
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
        <strong class="text-grey-8">
          پرگولا اولین پلتفرم اختصاصی مو و رنگ مو
        </strong>
      </div>
      <div class="q-mt-lg">
        <index_services_box></index_services_box>
      </div>
      <q-separator class="q-mt-md q-mb-sm"/>
      <index_post_category></index_post_category>

      <index_question_box></index_question_box>
    </q-card-section>

  </q-card>
</template>

<style scoped>

.subtitle-text{
  font-size: 18px;
}
.logo-image{
  width: 330px;
}
@media only screen and (max-width: 768px) {
  .subtitle-text{
    font-size: 15px;
  }
  .logo-image{
    width: 250px;
  }
}
</style>