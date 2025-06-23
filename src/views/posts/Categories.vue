<script>
import {Stores_Posts} from "@/stores/posts/posts.js";

export default {
  name : "Categories",
  mounted() {
    this.Get_Items();
  },
  data(){
    return{
      loading : true,
      items:[],
    }
  },
  methods:{
    Get_Items(){
      this.loading=true;
      Stores_Posts().Categories_Children({id : this.$route.params.id}).then(res => {
        this.items = res.data.result;
        this.loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server()
        this.loading=false;
      })

    }
  }
}
</script>

<template>
  <div class="q-mt-md">
    <div class="text-center q-mb-lg">
      <strong class="font-17">

      </strong>
    </div>
    <div class="q-px-sm">
      <global_loading_colorful size="100" v-if="loading"></global_loading_colorful>
      <template v-else>
        <router-link v-for="item in items"  :to="{name : 'posts',params:{category_id : item.id}}">
          <div class="category-box q-mb-md bg-white shadow-1" :style="{'borderColor' : item.color ?? 'rgba(33,33,33,0.49)'+' !important'}">
            <q-icon name="fa-duotone fa-grid-2" class="q-mr-md" size="30px" :style="{'color' : item.color}"></q-icon>
            <strong class="font-14 text-grey-10">{{item.name}}</strong>
          </div>
        </router-link>
      </template>
    </div>
  </div>

</template>
<style scoped>
.category-box{
  padding: 23px 15px;
  border-radius: 20px;
  border: 1px solid;

}
</style>