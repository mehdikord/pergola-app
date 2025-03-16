<script >

import Template_Main_Header from "@/components/Templates/Template_Main_Header.vue";
import Template_Main_Footer from "@/components/Templates/Template_Main_Footer.vue";
import ComingSoon from "@/views/ComingSoon.vue";
import InstallPrompt from "@/views/InstallPrompt.vue";

export default {
  name: "App",
  components :{
    "template_header" : Template_Main_Header,
    "template_footer" : Template_Main_Footer,
    'coming_soon' : ComingSoon,
    'install_prompt' : InstallPrompt
  },
  data(){
    return {
      launching : 0,
    }
  }
}
</script>

<template>


  <q-layout view="lHh Lpr lFf">
    <div class="app-container">
      <template v-if="this.$route.name === 'index'">
        <q-page-container>
          <coming_soon></coming_soon>
        </q-page-container>
      </template>
      <template v-else>
        <q-header class="header-bg" elevated style=" margin: 0 auto">
          <template_header></template_header>
        </q-header>
        <q-drawer  side="left" behavior="mobile" elevated>
          <!-- drawer content -->
        </q-drawer>
        <q-page-container>
          <router-view/>
          <install_prompt></install_prompt>
        </q-page-container>
        <q-footer class="footer-style bg-transparent">
          <template_footer></template_footer>
        </q-footer>
      </template>


    </div>

  </q-layout>
</template>
<style>

.footer-style{
  max-width: 1024px !important;
  margin: 0 auto !important;


}
.menu-box{
  background-color: rgba(14, 49, 121, 0.91) !important;
  padding: 8px 15px 8px 15px;
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px;
  color: black;

}
.header-bg{
  background-color: rgb(243, 240, 240) !important;
}

</style>


