<script>

import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name: "Plans",
  data() {
    return {
      active_plan_loading: true,
      active_plan: null,


    }
  },
  methods: {
    Stores_Auth

  }
}


</script>

<template>
  <q-card flat >
    <q-card-section>
      <div class="text-center title-text font-lalezar text-pink-6 animation-fade-in">
        اشتراک ویژه پرگولا
      </div>
       <div class="q-mt-sm text-center">
         <q-btn size="sm" outline color="deep-purple" label="چرا اشتراک ویژه ؟" rounded class="font-11"></q-btn>
       </div>
    </q-card-section>
    <q-card-section class="q-pt-xs" v-if="Stores_Auth().AuthGetCheckAuth">
      <div class="active-plan-box animation-fade-in">
        <div class="text-center">
          <strong class="text-purple-10 active-plan-title">اشتراک فعال من </strong>
        </div>
        <global_loading_colorful size="90"></global_loading_colorful>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.title-text{
  font-size: 45px;
}
.subtitle-text{
  font-size: 17px;
}
.active-plan-box{
  padding: 18px 10px;
  border-radius: 7px;
  background: rgba(179, 188, 196, 0.5);
}
.active-plan-title{
  font-size: 17.5px;
}
@media only screen and (max-width: 768px) {
  .title-text{
    font-size: 30px;
  }
  .active-plan-title{
    font-size: 14.5px;
  }

}
</style>