<script>
import {Stores_Posts} from "@/stores/posts/posts.js";
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Plans} from "@/stores/plans/plans.js";

export default {
  name: "Posts",
  mounted() {
    this.Get_Items();
    this.Get_Category();
    if (Stores_Auth().AuthGetCheckAuth){
      this.User_Plan_Active();
    }
  },
  data(){
    return {
      items:[],
      category: null,
      loading:true,
      active_plan: null,


    }
  },
  methods:{
    Get_Category(){
      Stores_Posts().Category_Show(this.$route.params.category_id).then(res=>{
        this.category = res.data.result;
        this.loading=false;
      }).catch(error=>{

      })
    },
    Get_Items(){
      Stores_Posts().Index(this.$route.params.category_id).then(res=>{
        res.data.result.forEach((item)=>{
          this.items.push(item)
        })
        this.loading=false;
      }).catch(error=>{

      })
    },
    User_Plan_Active(){
      Stores_Plans().Active().then(res=> {
        if (res.data.result.id){
          this.active_plan = res.data.result;
        }
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })
    },

  }
}
</script>

<template>
  <q-card flat>
    <q-card-section >
      <div v-if="category" class=" text-center q-mt-sm res-page-title font-lalezar text-pink-6 animation-fade-in">
        {{ category.name }}
      </div>
      <div v-if="category && category.description" class="text-center q-mt-sm text-grey-8">
        {{category.description}}
      </div>
    </q-card-section>
    <q-card-section>

      <template v-if="loading">
        <global_loading_colorful :size="80" text="درحال دربافت نوشته ها"></global_loading_colorful>
      </template>
      <template v-else>
        <div v-for="item in items">
          <router-link :to="{name : 'posts_show', params:{slug:item.slug}}">
          <div class="item-box q-mb-md row">
            <div class="col-sm-3 col-xs-3">
              <img v-if="item.image" :src="item.image" class="news-image q-mt-xs" alt="">
              <img v-else src="assets/images/icons/news.svg" class="news-image q-mt-xs" alt="">
            </div>
            <div class="col-sm-9 col-xs-9 q-pa-sm ">
              <div class="q-mt-lg">
                <strong class="text-grey-10 font-14">{{item.title}}</strong>
              </div>
            </div>
          </div>
          </router-link>

        </div>

      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.news-image{
  width: 90px;
  border-radius: 8px;
}
.item-box{
  border-radius: 10px;
  border: 1px dashed rgba(154, 154, 154, 0.0);
  background-color: rgba(26, 54, 122, 0.1);
}
</style>