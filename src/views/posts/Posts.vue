<script>
import {Stores_Posts} from "@/stores/posts/posts.js";

export default {
  name: "Posts",
  mounted() {
    this.Get_Items();
  },
  data(){
    return {
      items:[],
      loading:true,

    }
  },
  methods:{
    Get_Items(){
      Stores_Posts().Index().then(res=>{
        res.data.result.data.forEach((item)=>{
          this.items.push(item)
        })
        this.loading=false;
      }).catch(error=>{

      })
    }
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section >
      <div class=" text-center q-mt-sm res-page-title font-lalezar text-pink-6 animation-fade-in">
        نوشته ها و مقالات پرگولا
      </div>
    </q-card-section>
    <q-card-section>
      <template v-if="loading">
        <global_loading_colorful :size="80" text="درحال دربافت نوشته ها"></global_loading_colorful>
      </template>
      <template v-else>
        <div v-for="item in items" class="item-box q-mb-md row">
          <div class="col-sm-3 col-xs-3">
            <img v-if="item.image" :src="item.image" class="news-image q-mt-xs" alt="">
            <img v-else src="assets/images/icons/news.svg" class="news-image q-mt-xs" alt="">
          </div>
          <div class="col-sm-9 col-xs-9 q-pa-sm q-pl-md">
            <div>
              <strong class="text-grey-10 font-14">{{item.title}}</strong>
            </div>
            <div>
              <router-link :to="{name : 'posts_show', params:{slug:item.slug}}">
                <strong class="float-right font-13 q-mt-md text-pink-7">
                  مشاهده کامل ...
                </strong>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.news-image{
  width: 98px;
  border-radius: 8px;
}
.item-box{
  border-radius: 10px;
  border: 1px dashed rgba(154, 154, 154, 0.0);
  background-color: rgba(26, 54, 122, 0.1);
}
</style>