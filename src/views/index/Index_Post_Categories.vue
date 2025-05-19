<script>

import {Stores_Posts} from "@/stores/posts/posts.js";

export default {
  name: "Index_Post_Categories",
  mounted() {
    this.Get_Items();
  },
  data(){
    return {
      loading:true,
      items : [],
    }
  },
  methods:{
    Get_Items(){
      Stores_Posts().Categories().then((res)=>{
        this.items = res.data.result;
        this.loading=false;
      }).catch((err)=>{
        this.Methods_Notify_Error_Server()
      })
    }
  }
}

</script>

<template>
  <div class="q-mt-md">
    <div class="text-center q-mb-lg">
      <strong class="font-19">آموزش ها و مقالات پرگولا</strong>
    </div>
    <div class="q-px-sm">
      <global_loading_colorful size="100" v-if="loading"></global_loading_colorful>
      <template v-else>
        <router-link v-for="item in items"  :to="{'name' : 'posts',params:{'category_id' : item.id}}">
          <div class="service-box q-mt-md" :style="{'backgroundColor' : item.color}">
            <strong class="font-15">{{item.name}}</strong>
            <span class="float-right"><strong class="q-mr-xs">{{item.posts_count}}</strong> نوشته</span>
          </div>
        </router-link>
      </template>
    </div>
  </div>

</template>

<style scoped>

.service-box{
  padding: 22px 15px;
  border-radius: 20px;
  border: 5px double #ffffff;
  color: white;
}


</style>