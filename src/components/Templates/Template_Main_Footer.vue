<script>
export default {
  name: "Template_Dark_Main_Footer",

}
</script>

<template>
  <div class="menu-box">
    <div class="row justify-center">

      <div class="col text-center">
        <router-link :to="{name : 'auth'}" title="حساب کاربری">
          <q-btn class="icon-size" v-if="this.$route.name === 'auth'" round icon="fa-duotone fa-solid fa-user-vneck text-pink-8" color="white"></q-btn>
          <q-btn class="icon-size" v-else round icon="fa-duotone fa-regular fa-user-vneck text-white" flat color="white"></q-btn>
        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'services'}" title="خدمات پرگولا">
          <q-btn class="icon-size" v-if="this.$route.name === 'services' || this.$route.name === 'services_coloring'" round icon="fa-duotone fa-solid fa-paintbrush-pencil text-pink-8" color="white"></q-btn>
          <q-btn class="icon-size" v-else round icon="fa-duotone fa-regular fa-paintbrush-pencil text-white" flat color="white"></q-btn>
        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'index'}" title="پرگولا">
          <q-btn class="icon-size" v-if="this.$route.name === 'index'" round icon="fa-duotone fa-solid fa-solar-system text-pink-8" color="white"></q-btn>
          <q-btn class="icon-size" v-else round icon="fa-duotone fa-regular fa-solar-system text-white" flat color="white"></q-btn>
        </router-link>
      </div>


      <div class="col text-center">
        <router-link :to="{name : 'plans'}" title="اشتراک ها">
          <q-btn class="icon-size" v-if="this.$route.name === 'plans'" round icon="fa-duotone fa-solid fa-crown text-pink-8" color="white"></q-btn>
          <q-btn class="icon-size" v-else round icon="fa-duotone fa-regular fa-crown text-white" flat color="white"></q-btn>
        </router-link>
      </div>

      <div class="col text-center">
        <router-link :to="{name : 'contact'}" title="ارتباط و پشتیبانی">
          <q-btn class="icon-size" v-if="this.$route.name === 'contact'" round icon="fa-duotone fa-solid fa-user-headset text-pink-8" color="white"></q-btn>
          <q-btn class="icon-size" v-else round icon="fa-duotone fa-regular fa-user-headset text-white" flat color="white"></q-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-size{
  font-size:15px;
}


@media only screen and (max-width: 768px) {
  .icon-size{
    font-size:15px;
  }

}


</style>