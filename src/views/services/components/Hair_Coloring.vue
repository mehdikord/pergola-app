<script>
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Colors} from "@/stores/colors/colors.js";
import {Stores_Options} from "@/stores/options/options.js";
import {Stores_Plans} from "@/stores/plans/plans.js";

export default {
  name: "Hair_Coloring",
  mounted() {
    this.Get_From_Colors();
    this.Get_To_Colors();
    this.Get_Options();
    if (Stores_Auth().AuthGetCheckAuth){
      this.User_Plan_Active();
    }
  },
  data(){
    return {
      from_colors:[],
      to_colors:[],
      options:[],
      items :{
        from_color_id : null,
        to_color_id : null,
        items:[],
      },
      info_dialog:false,
      loading:false,
      answer:null,
      dialog_auth:false,
      active_plan: null,
    }
  },
  methods:{
    Stores_Auth,
    Get_From_Colors(){
      Stores_Colors().All().then(res => {
        this.from_colors = [];
        res.data.result.forEach(item => {
          this.from_colors.push({
            value : item.id,
            label : item.name,
            color : item.color,
          });
        })

      })
    },
    Get_To_Colors(){
      Stores_Colors().All().then(res => {
        this.to_colors = [];
        res.data.result.forEach(item => {
          this.to_colors.push({
            value : item.id,
            label : item.name,
            color : item.color,
          });
        })

      })
    },
    Get_Options() {
      Stores_Options().All().then(res => {
        this.options = res.data.result;
        this.options.forEach( item=> {
          this.items.items[item.id]={id : item.id,value : null}
          let new_items=[];
          item.items.forEach( get_item=> {
            new_items.push({value: get_item.id, label: get_item.item});
          })
          item.items = new_items;
        });

      })
    },
    User_Plan_Active(){
      Stores_Plans().Active().then(res=> {
        this.active_plan = res.data.result;
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })
    },
    Filter_From_Color_Select (val, update, abort) {
      update(() => {
        if (val){
          this.from_colors =  this.from_colors.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_From_Colors();
        }
      })
    },
    Filter_To_Color_Select (val, update, abort) {
      update(() => {
        if (val){
          this.to_colors =  this.to_colors.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_To_Colors();
        }
      })
    },
    Send_Items(){
      if (!Stores_Auth().AuthGetCheckAuth){
        return this.dialog_auth = true
      }
      if (!this.active_plan){
        return this.dialog_auth = true
      }
      if (!this.items.second_color || !this.items.first_color){
        return this.Methods_Notify_Message_Error('موارد خواسته شده را تکمیل کنید')
      }
      this.loading = true;
      setTimeout(() => {
        this.answer = 'yes';
        this.loading = false;
      }, 1500);

    },
    Find_Color(color){
      let find = null;
      this.colors.forEach(item => {
        if(item.value === color){
          find = item
        }
      })
      return find;
    }
  },
  computed:{
    CheckInfo(){
      let check = true;
      this.items.items.forEach(item => {
        if (!item.value){
          check = false;
        }

      })
      return check;
    }
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section >
      <div class="row">
        <div class="col-6 row">
          <img src="assets/images/icons/coloring.png" class="bread-img" alt="">
          <strong class="bread-title text-pink-8 q-ml-sm q-mt-sm">تغییر رنگ مو</strong>
        </div>
        <div class="col-6 text-right">
          <q-btn :to="{name:'services'}" icon="fa-duotone fa-solid fa-arrow-left-long-to-line" glossy rounded size="sm" color="red-5"></q-btn>
        </div>
      </div>
    </q-card-section>
    <q-separator/>
    <template v-if="loading">
      <q-card-section>
        <div class="text-center q-mt-md">
          <q-spinner-dots color="purple" size="90"/>
          <div class="text-center">
            <strong class="loading-text text-pink-8">
              ...  درحال انجام محاسبات ...
            </strong>
          </div>
        </div>
      </q-card-section>
    </template>
    <template v-else>
      <template v-if="answer">
        <q-card-section>
          <div class="text-center q-mt-sm">
            <strong class="text-purple answer-title">
              نتایج محاسبات
            </strong>
          </div>
          <div class="q-mt-lg text-justify">
            <div class="answer-text row">
              برای تغییر رنگ مو خود از
              <div class="tear-selected q-ml-sm q-mr-sm" :style="'background-color:'+items.first_color"></div>
              <strong class="q-mr-sm">
                {{Find_Color(items.first_color).label}}
              </strong>
               به رنگ
              <div class="tear-selected q-ml-sm q-mr-sm" :style="'background-color:'+items.second_color"></div>
              <strong class="q-mr-sm">
                {{Find_Color(items.second_color).label}}
              </strong>
              باید مراحل زیر را طی کنید :
            </div>
          </div>
          <div class="q-mt-lg">

            <div class="text-justify answer-message">
              <q-card bordered>
                <q-card-section>
                  <q-btn round size="xs" dense color="purple-5" label="1"  class="answer-number q-mr-xs q-mb-sm"></q-btn>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
                </q-card-section>
              </q-card>
            </div>

            <div class="text-justify answer-message q-mt-md">
              <q-card bordered>
                <q-card-section>
                  <q-btn round size="xs" dense color="purple-5" label="2"  class="answer-number q-mr-xs q-mb-sm"></q-btn>
                  لورم ایپسوم متن ساختگی با تولید سادگی
                </q-card-section>
              </q-card>
            </div>

            <div class="text-justify answer-message q-mt-md">
              <q-card bordered>
                <q-card-section>
                  <q-btn round size="xs" dense color="purple-5" label="3"  class="answer-number q-mr-xs q-mb-sm"></q-btn>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                </q-card-section>
              </q-card>
            </div>

            <div class="text-justify answer-message q-mt-md">
              <q-card bordered>
                <q-card-section>
                  <q-btn round size="xs" dense color="purple-5" label="4"  class="answer-number q-mr-xs q-mb-sm"></q-btn>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                </q-card-section>
              </q-card>
            </div>

          </div>

          <div class="q-mt-lg text-center">
            <q-btn class="q-mr-sm" glossy rounded color="pink-7" label="ذخیره در حافظه" icon="fa-duotone fa-light fa-save"></q-btn>
            <q-btn @click="answer = null" class="q-ml-sm" glossy rounded color="blue-grey-8" label="محاسبه مجدد" icon="fa-duotone fa-regular fa-refresh"></q-btn>
          </div>


        </q-card-section>
      </template>
      <template v-else>
        <q-card-section>
          <div class="info q-mt-sm text-justify">
            لطفا برای محاسبات دقیق و پاسخ درست اطلاعات خواسته شده را با دقت و به درستی وارد کرده و دکمه انجام محاسبات را بزنید .
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <label for="" class="text-pink-7"><strong>انتخاب رنگ مو فعلی</strong></label>
            <q-select
                class="q-mt-sm"
                outlined
                :options="from_colors"
                emit-value
                map-options
                use-input
                v-model="items.from_color_id"
                clearable
                @filter="Filter_From_Color_Select"
                color="purple-3"
                clear-icon="fa-duotone fa-solid fa-times-circle text-red-8 font-22"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear" :style="'background-color:'+scope.opt.color"></div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                  <span>
                    {{ scope.opt.label }}
                  </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear-selected" :style="'background-color:'+scope.opt.color"></div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <strong>
                        {{ scope.opt.label }}
                      </strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="q-mt-lg">
            <label for="" class="text-pink-7"><strong>انتخاب رنگ مو جدید</strong></label>
            <q-select
                class="q-mt-sm"
                outlined
                :options="to_colors"
                emit-value
                map-options
                use-input
                v-model="items.to_color_id"
                position="top"
                clearable
                @filter="Filter_To_Color_Select"
                color="purple-3"
                clear-icon="fa-duotone fa-solid fa-times-circle text-red-8 font-22"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear" :style="'background-color:'+scope.opt.color"></div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                  <span>
                    {{ scope.opt.label }}
                  </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear-selected" :style="'background-color:'+scope.opt.color"></div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <strong>
                        {{ scope.opt.label }}
                      </strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>

            </q-select>
          </div>
          <div class="q-mt-lg">
            <label for="" class="text-pink-7"><strong>اطلاعات مورد نیاز</strong></label>
            <div class="q-mt-sm info-box cursor-pointer" @click="info_dialog= !info_dialog">
              <div v-if="!CheckInfo" class="text-center text-grey-10">
                وارد کردن اطلاعات
              </div>
              <div v-else class="text-center">
                <strong class="text-green-8">اطلاعات وارد شده </strong> <q-icon name="fa-duotone fa-regular fa-check-circle" size="xs" color="green-8"></q-icon>
              </div>
            </div>
            <q-dialog
                v-model="info_dialog"
                position="top"
            >
              <q-card style="width: 90vw;">
                <q-card-section>
                  <label for="" class="text-pink-7 font-15"><strong>وارد کردن اطلاعات</strong></label>
                </q-card-section>
                <q-separator/>
                <q-card-section class="q-pt-sm">
                  <div v-for="option in options" class="col-md-4 col-xs-12 q-px-sm q-mb-sm">
                    <q-select
                        class="q-mt-lg"
                        outlined
                        :label="option.name"
                        :options="option.items"
                        emit-value
                        map-options
                        position="top"
                        v-model="items.items[option.id].value"
                    >
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label>
                              {{ scope.opt.label }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>

                    </q-select>
                  </div>

                </q-card-section>
                <q-card-actions align="left" class="q-mb-sm q-px-md">
                  <q-btn class="font-14 items-btn" color="pink-5"  rounded glossy label="‌ثبت اطلاعات" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div class="q-mt-xl text-center">
            <q-btn rounded glossy @click="Send_Items" color="purple-7" label="ثبت و محاسبه اطلاعات شما" class="submit-btn"></q-btn>
          </div>
          <q-dialog
              v-model="dialog_auth"
              position="top"
          >
            <q-card style="width: 100%">
              <q-card-section v-if="Stores_Auth().AuthGetCheckAuth">
                <div class="text-center q-mt-md">
                  <img class="bg-image" src="assets/images/background/plan_need.svg" alt="">
                  <div class="q-mt-sm">
                    <strong>
                      برای استفاده از این قابلیت باید اشتراک ویژه داشته باشید !
                    </strong>
                  </div>
                  <div class="q-mt-md">
                    <q-btn :to="{name : 'plans'}" class="auth-btn" color="pink-7" glossy rounded size="sm" label="دریافت اشتراک ویژه"></q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-card-section v-else>
                <div class="text-center q-mt-md">
                  <img class="bg-image" src="assets/images/background/login_need.svg" alt="">
                  <div class="q-mt-sm">
                    <strong>
                      برای انجام محاسبات ابتدا باید وار حساب کاربری خود شوید
                    </strong>
                  </div>
                  <div class="q-mt-md">
                    <q-btn :to="{name : 'auth'}" class="auth-btn" color="pink-7" glossy rounded size="sm" label="ورود / ثبت نام در پرگولا"></q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="q-mb-sm q-px-md q-mt-sm">
                <q-btn size="sm" class="submit-btn" color="grey-8"  rounded glossy label="بستن" icon="fa-duotone fa-solid fa-times-circle" v-close-popup />
              </q-card-actions>

            </q-card>
          </q-dialog>

        </q-card-section>
      </template>
    </template>
  </q-card>




</template>

<style scoped>
.bread-img{
  width: 48px;
}
.bread-title{
  font-size: 18px;
}
.info{
  font-size: 16px;
}
.tear {
  width: 55px;
  aspect-ratio:1;
  border-radius: 0 50% 50% 50%;
}
.tear-selected {
  width: 32px;
  aspect-ratio:1;
  border-radius: 0 50% 50% 50%;
}
.info-box{
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px 25px;
}
.submit-btn{
  padding: 10px 50px;
  font-size: 14.5px;
  font-weight: bold;
}
.loading-text{
  font-size: 17.5px;
}
.answer-title{
  font-size: 20px;
}
.answer-text{
  font-size: 16px;
}
.answer-number{
  font-size: 13px !important;
}
.answer-message{
  font-size: 15px;
}

.bg-image{
  width: 250px !important;
}
.auth-btn{
  font-size: 15px !important;
}
.submit-btn{
  font-size: 14px !important;
}
@media only screen and (max-width: 768px) {
  .bread-img{
    width: 38px;
  }
  .bread-title{
    font-size: 15px;
  }
  .info{
    font-size: 14px;
  }
  .tear {
    width: 40px;
    aspect-ratio:1;
    border-radius: 0 50% 50% 50%;
  }
  .submit-btn{
    padding: 10px 40px;
    font-size: 14px;
  }
  .loading-text{
    font-size: 14px;
  }
  .answer-title{
    font-size: 16px;
  }
  .answer-text{
    font-size: 14px;
  }
  .answer-number{
    font-size: 11px !important;
  }
  .items-btn{
    width: 100%;
    padding: 8px 5px!important;
  }
  .bg-image{
    width: 200px !important;
  }
  .auth-btn{
    font-size: 14px !important;
  }
  .submit-btn{
    font-size: 12px !important;
  }
}
</style>