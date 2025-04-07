<script>
import {Stores_Pages} from "@/stores/pages/pages.js";

export default {
  name: "Page",
  data() {
      return {
        page:null,
        loading:true,
      }
  },
    methods: {
      Get_Page(){
        Stores_Pages().Show(this.$route.params.slug).then((res)=>{
            this.page = res.data.result;
            this.loading = false;
        }).catch(error => {
          this.Methods_Notify_Error_Server();
          this.loading = false;
        })
      }
    },
    mounted() {
        this.Get_Page();
    },

}
</script>

<template>

  <q-card flat >
    <q-card-section>
      <template v-if="loading">
        <global_loading_colorful :size="80" text="درحال دربافت نوشته ها"></global_loading_colorful>
      </template>
      <template v-else>
        <span v-html="page.content"></span>
      </template>

    </q-card-section>
  </q-card>


</template>

<style scoped>

</style>