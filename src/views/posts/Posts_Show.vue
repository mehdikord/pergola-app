<script>
import {Stores_Posts} from "@/stores/posts/posts.js";

export default {
  name: "Posts_Show",
  mounted() {
    this.Get_Item();
  },
  data(){
    return {
      item:null,
      loading:true,

    }
  },
  methods:{
    Get_Item(){
      Stores_Posts().Show(this.$route.params.slug).then((res)=>{
        this.item = res.data.result;
        this.loading=false;
      }).catch(error=>{

      })
    }
  }
}
</script>
<template>
  <q-card flat>
    <q-card-section>
      <template v-if="loading">
        <global_loading_colorful :size="80" text="درحال دربافت نوشته"></global_loading_colorful>
      </template>
      <template v-else>
        <div class="q-mt-md q-mb-lg">
          <strong class="text-pink-8 font-15">{{item.title}}</strong>
        </div>
        <div v-if="item.image" class="q-mt-md">
          <img :src="item.image" alt="" class="post-image">
        </div>
        <div class="q-mt-md">
          <span v-html="item.description"></span>
        </div>

      </template>

    </q-card-section>
  </q-card>
</template>

<style scoped>
.post-image{
  width: 100%;
  border-radius: 10px;
}
</style>