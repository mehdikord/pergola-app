<script>
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Colors} from "@/stores/colors/colors.js";
import {Stores_Options} from "@/stores/options/options.js";
import {Stores_Plans} from "@/stores/plans/plans.js";
import {Stores_Services} from "@/stores/services/services.js";

export default {
  name: "Hair_Coloring",
  mounted() {
    this.Get_From_Colors();
    this.Get_To_Colors();
    this.Get_Options();
    if (Stores_Auth().AuthGetCheckAuth){
      this.User_Plan_Active();
    }
    if (localStorage.getItem('pergola_answer')){
      this.answer = JSON.parse(localStorage.getItem('pergola_answer'));
      this.loading=false;
    }
  },
  data(){
    return {
      level : 'start_color',
      from_colors:[],
      from_colors_loading:true,
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
      errors:[],
      search : null,
      search_loading:false,
      save_dialog:false,
    }
  },
  methods:{
    Stores_Auth,
    Get_From_Colors(){
      Stores_Colors().Grouping().then(res => {
        this.from_colors = res.data.result;
        this.from_colors_loading = false;
      })
    },
    Search_From_Colors(){
      if (this.search && this.search.replace(/\s+/g, "").length >= 2) {
        setTimeout(() => {
          this.search_loading = true;
          Stores_Colors().Grouping({name : this.search}).then(res => {
            this.from_colors = res.data.result;
            this.search_loading = false;
          })
        }, 500);
      }else {
        this.search_loading = false;

      }
    },
    From_Clear_Search(){
      this.search = null;
      this.Get_From_Colors()
    },

    Get_To_Colors(){
      Stores_Colors().All().then(res => {
        this.to_colors = [];
        res.data.result.forEach(item => {
          this.to_colors.push({
            value : item.id,
            label : item.name,
            color : item.color,
            image : item.image,

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
    Change_Level(text,id) {
      this.$q.dialog({
        message: 'رنگ انتخابی شما : ' + text +' است ، بریم مرحله بعد ؟',
        ok: {
          glossy: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        if (this.level === 'start_color') {
          this.items.from_color_id  = id;
          this.level = 'end_color';
          return this.$nextTick(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }
        if(this.level === 'end_color') {
          if (this.items.from_color_id === id) {
            return this.Methods_Notify_Message_Error("رنگ جدید و رنگ فعلی نمیتوانند یکی باشند !")
          }
          this.items.to_color_id  = id;
          this.level = 'info';
          return this.$nextTick(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }

      }).onCancel(() => {

      }).onDismiss(() => {
      })
    },
    Back_Level(){
      if (this.level === 'end_color') {
        this.level = 'start_color';
      }
      if (this.level === 'info') {
        this.level = 'end_color';
      }
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
      if (this.items.from_color_id === this.items.to_color_id){
        return this.Methods_Notify_Message_Error("رنگ انتخابی و رنگ فعلی نمیتوانند یکی باشند !")
      }
      this.loading = true;
      this.items.items = this.items.items.filter(item => item !== null && item !== undefined);
      Stores_Services().Coloring_Create(this.items).then(res => {

        this.answer = res.data.result;
        this.level = 'answer'
        if (this.answer) {
          localStorage.setItem('pergola_answer',JSON.stringify(this.answer));
        }
        this.loading = false;
      }).catch(error=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.loading=false;
      })
    },
    Clear_Answer(){
      localStorage.removeItem('pergola_answer');
      this.Get_From_Colors();
      this.Get_To_Colors();
      this.Get_Options();
      this.search=null
      this.answer=null;
      this.level='start_color';
      return this.$nextTick(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },
    Save_Answer(){
      let data={
        'from_color_id' : this.items.from_color_id,
        'to_color_id' : this.items.to_color_id,
        'items' : this.items.items,
        'answers' : this.answer,
      }
      Stores_Services().Store_Answer(data).then(res => {
        this.save_dialog = true;
        this.Clear_Answer();
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })
    },

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
    <template v-if="!loading">
      <q-card-section >
        <div class="text-center animation-fade-in">
          <img v-if="level === 'start_color'" src="assets/images/icons/colors.svg" class="header-image animation-fade-in" alt="">
          <img v-if="level === 'end_color'" src="assets/images/icons/hair_color.svg" class="header-image animation-fade-in" alt="">
          <img v-if="level === 'info'" src="assets/images/icons/info.svg" class="header-image animation-fade-in" alt="">
          <img v-if="level === 'answer' && answer" src="assets/images/icons/done.svg" class="header-image animation-fade-in" alt="">
          <div class="header-title font-lalezar">
            هوش مصنوعی رنگ مو
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div class="text-center question-title animation-fade-in">
          <strong v-if="level === 'start_color'" class="text-deep-purple-8 animation-fade-in">
            رنگ درحال حاضر موهاتو انتخاب کن
          </strong>
          <strong v-if="level === 'end_color'" class="text-deep-purple-8 animation-fade-in">
            حالا رنگ مورد نظر موهاتو انتخاب کن
          </strong>
          <strong v-if="level === 'info'" class="text-deep-purple-8 animation-fade-in">
            اطلاعات خواسته شده را وارد کنید
          </strong>
        </div>
        <div class="text-center q-mt-md" v-if="level!=='start_color' && level !== 'answer'">
          <q-btn outline @click="Back_Level" size="sm" color="red-10 font-13" rounded  label="مرحله قبل" icon-right="fa-duotone fa-left"></q-btn>
        </div>

        <template v-if="level === 'start_color' || level === 'end_color' ">
          <div class="q-mt-lg q-mb-lg text-center animation-fade-in">
            <q-input   @update:model-value="Search_From_Colors" outlined rounded v-model="search" placeholder="جستجو رنگ ( حداقل ۲ حرف )">
              <template v-slot:append>
                <q-btn outline v-if="search" @click="From_Clear_Search" class="font-13" size="sm" color="red" rounded icon="fa-duotone fa-times fa-solid" label="حذف جستجتو"></q-btn>
                <q-icon v-else name="fa-duotone fa-magnifying-glass fa-solid q-mr-sm fa-bounce" size="29px" color="deep-orange-8" ></q-icon>
              </template>
            </q-input>
          </div>
          <template v-if="from_colors_loading">
            <global_loading_colorful size="115" text="درحال دریافت اطلاعات"></global_loading_colorful>
          </template>
          <template v-else class="q-mt-md animation-fade-in">
            <template v-if="search_loading">
              <global_searching></global_searching>
            </template>
            <template v-else>
              <template v-if="from_colors.length < 1">
                <global_empty></global_empty>
              </template>
              <template v-else>
                <div v-for="(form_color,index) in from_colors">
                  <div class="text-center">
                    <strong class="text-purple-8 font-16">{{index}}</strong>
                  </div>
                  <div class="q-mt-md row justify-center">
                    <div v-for="color in form_color" class="col-sm-4 col-xs-4 col-md-2 col-lg-2 col-xl-2 q-px-xs q-mb-md">
                      <div class="color-box text-center cursor-pointer" @click="Change_Level(color.name,color.id)">
                        <template v-if="color.is_active">
                          <img v-if="color.image" :src="color.image" class="image-color" />
                          <img v-else src="assets/images/icons/default-color.svg" class="image-color" />
                          <div class="q-mt-xs">
                            <strong class="font-14 text-grey-9">{{color.name}}</strong>
                          </div>
                        </template>
                        <template v-else>
                          <img v-if="color.image" :src="color.image" class="image-color inactive-image" />
                          <img v-else src="assets/images/icons/default-color.svg" class="image-color inactive-image" />
                          <div class="q-mt-xs">
                            <q-icon name="fa-duotone fa-solid fa-lock" class="q-mr-xs" color="red-8" size="14px"></q-icon>
                            <strong class="font-14 text-grey-7">{{color.name}}</strong>
                          </div>
                        </template>

                      </div>
                    </div>
                  </div>
                  <q-separator class="q-mt-sm q-mb-sm" />
                </div>
              </template>
            </template>


          </template>
        </template>
        <template v-if="level === 'info'">
          <div v-for="option in options" class="col-md-4 col-xs-12 q-px-sm q-mb-sm">
            <q-select
                class="q-mt-lg"
                outlined
                rounded
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
          <div class="text-center q-mt-xl">
            <q-btn class="submit-btn" @click="Send_Items" label="ثبت اطلاعات و انجام محاسبات" icon="fa-duotone fa-check fa-solid" color="indigo-7" rounded></q-btn>
          </div>
        </template>

        <template v-if="level === 'answer'">
          <div v-if="!answer" class="q-mt-md text-center">
            <img src="assets/images/icons/sad-bot.svg" width="140" alt="">
            <div class="q-mt-sm">
              <strong class="text-red font-15">متاسفانه نتیجه ای برای درخواست شما یافت نشد !</strong>
               <div class="q-mt-md">
                 <q-btn @click="Clear_Answer" color="teal" rounded outline class="font-14" style="width: 80%;padding-bottom: 10px;padding-top: 10px" label="تلاش دوباره " icon="fa-duotone fa-arrows-rotate fa-regular"></q-btn>
               </div>
            </div>
          </div>
          <div v-else>

            <div class="text-center q-mt-sm">
              <strong class="text-purple answer-title">
                مراحل انجام کار
              </strong>
            </div>
            <div class="q-mt-lg text-center">
              برای تغییر رنگ مو خود از رنگ ( <strong>{{answer.from_color.name}}</strong> )
              به رنگ ( <strong>{{answer.to_color.name}}</strong> )
              مراحل گفته شده را با دقت انجام دهید
            </div>
            <div class="q-mt-lg">

              <div v-for="(item,index) in answer.answers" class="info-box q-mb-md">
                <div class="text-center font-15">
                  <strong class="text-grey-9"> مرحله : </strong><strong class="text-red-6">{{index + 1}}</strong>
                </div>
                <q-separator class="q-mt-sm"/>
                <div class="q-mt-md">
                  <template v-if="item.answer.colors.length > 0">
                    <strong class="text-teal-7">تلفیق رنگ های مورد نیاز : </strong>
                    <div class="q-mt-md row">
                      <div v-for="color in item.answer.colors" class="col-12 q-px-sm q-mb-sm">
                        <div class="color-box color-text text-grey-9">
                          <strong class="text-dark font-13">{{color.name }}</strong>
                          <span class="float-right">مقدار : <strong class="text-red-6 font-15">{{color.val}}</strong></span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="q-mt-md" v-if="item.answer.oxidant">
                    <strong class="text-teal-7">اکسیدان مورد نیاز به مقدار  : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant}}</strong>
                    <strong class="q-ml-sm">میل</strong>
                  </div>
                  <div class="q-mt-md" v-if="item.answer.oxidant_percent">
                    <strong class="text-teal-7">درصد اکسیدان : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant_percent}}</strong>
                    <strong class="q-ml-sm">درصد</strong>
                  </div>
                  <div class="q-mt-md" v-if="item.answer.oxidant_time">
                    <strong class="text-teal-7">مدت زمان : </strong>
                    <strong class="text-red font-15">{{item.answer.oxidant_time}}</strong>
                  </div>
                  <div class="q-mt-lg" v-if="item.answer.text">
                    <div v-html="item.answer.text"></div>
                  </div>
                </div>

              </div>

            </div>
            <div class="q-mt-lg text-center q-mb-lg">

              <q-btn @click="Save_Answer" class="q-mr-sm font-15" glossy rounded color="purple-9" label="ذخیره در حافظه" icon="fa-duotone fa-light fa-save"></q-btn>

              <q-btn @click="Clear_Answer" class="q-ml-sm font-15" glossy rounded color="teal-8" label="محاسبه مجدد" icon="fa-duotone fa-regular fa-refresh"></q-btn>
            </div>

          </div>
        </template>

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
    <template v-else>

      <global_loading_colorful size="115" text="درحال انجام محاسبات"></global_loading_colorful>

    </template>
  </q-card>

  <q-dialog
      v-model="save_dialog"
  >
    <q-card style="width: 100%">
      <q-card-section class="q-mt-md">
        <strong>
          فرایند مورد نظر در ذخیره شد
          <br>
          برای دسترسی به موارد ذخیره شده میتوانید از قسمت پروفایل به قسمت ذخیره شده ها بروید
        </strong>
      </q-card-section>
      <q-card-actions align="right" class="q-mb-sm q-px-md q-mt-sm">
        <q-btn  class="submit-btn" color="teal-8"  rounded glossy label="متوجه شدم" icon="fa-duotone fa-solid fa-check" v-close-popup />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<style scoped>
.inactive-image {
  filter: grayscale(100%);
  opacity: 0.6; /* اختیاری - کاهش شفافیت */
  cursor: not-allowed; /* اختیاری - نشانگر غیرفعال */

  /* پشتیبانی از مرورگرهای قدیمی */
  -webkit-filter: grayscale(100%);
}

/* حالت hover (اختیاری) */
.inactive-image:hover {
  opacity: 0.8;
  transition: all 0.3s ease;
}
.header-image{
  width: 110px !important;
}
.header-title{
  font-size: 26px !important;
  font-weight: 50!important;
}
.question-title{
  font-size: 16px !important;
  font-weight: 500;
}
.color-box{
  padding:10px 8px;
  border-radius: 10px;
  border: 1px dashed rgba(128, 128, 128, 0.5);
}
.submit-btn{
  padding: 14px 40px;
  font-size: 14px;
}
.info-box{
  border-radius: 8px;
  border: 1px dashed rgba(30, 30, 30, 0.4);
  padding: 15px 10px;
}
.answer-title{
  font-size: 16px;
}
.image-color{
  border-radius: 50%;
  width: 85px;
  height: 85px;
}
@media only screen and (max-width: 768px) {

  .header-image{
    width: 90px !important;
  }
  .header-title{
    font-size: 20px !important;
    font-weight: 50!important;
  }
  .question-title{
    font-size: 15px !important;
    font-weight: 500;
  }
  .color-box{
    padding:10px 8px;
    border-radius: 10px;
    border: 1px dashed rgba(128, 128, 128, 0.5);
  }
  .submit-btn{
    padding: 14px 40px;
    font-size: 14px;
  }
  .info-box{
    border-radius: 8px;
    border: 1px dashed rgba(30, 30, 30, 0.4);
    padding: 15px 10px;
  }
  .answer-title{
    font-size: 16px;
  }
  .image-color{
    border-radius: 50%;
    width: 65px;
    height: 65px;
  }
}


</style>