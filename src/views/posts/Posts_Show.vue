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
        <div v-if="item.files.length" class="q-mt-md">
          <div class="q-mb-md">
            <strong class="text-grey-7">فایل های پیوست شده</strong>
            <div class="q-mt-md" v-for="file in item.files">
              <div class="text-primary font-weight-500 q-mb-md font-15">{{ file.title }}</div>
              <template v-if="Methods_File_Type(file.file_url) === 'video'">
                <div class="q-mt-md q-mb-md">
                  <video width="100%" :src="this.$api_assets+file.file_url" controls></video>
                </div>
              </template>
              <template v-if="Methods_File_Type(file.file_url) === 'image'">

                <q-btn @click="Methods_Downloader(file.file_url,file.title)" class="" color="teal-7" icon="fa-duotone fa-download" label="دریافت تصویر" outline rounded></q-btn>
              </template>
              <template v-if="Methods_File_Type(file.file_url) === 'other'">
                <a :href="this.$api_assets+file.file_url" target="_blank" download="">
                  <q-btn  class="" color="deep-orange-7" icon="fa-duotone fa-download" label="دریافت فایل" outline rounded></q-btn>
                </a>

              </template>



            </div>
          </div>
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