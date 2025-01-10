<script>
export default {
  name: "Hair_Coloring",
  mounted() {

  },
  data(){
    return {
      colors : [
        {
          label : "بلوند آفتابی",
          value : "#e2c295",
        },
        {
          label : "بلوند الماسی",
          value : "#d5bba1",
        },
        {
          label : "کاراملی",
          value : "#996b4b",
        },
        {
          label : "تافی تیره",
          value : "#704c38",
        },
        {
          label : "کهربایی درخشان",
          value : "#ac7f65",
        },
        {
          label : "قهوه‌ای هاوانایی",
          value : "#351c12",
        },
        {
          label : "اسپرسو",
          value : "#452f2c",
        },
        {
          label : "مسی درخشان",
          value : "#bb6d4d",
        },
        {
          label : "یاقوتی براق",
          value : "#8b444a",
        },
        {
          label : "لعل تیره",
          value : "#442825",
        },
        {
          label : "شرابی بورگاندی",
          value : "#6b3945",
        },
        {
          label : "گیلاس شکلاتی",
          value : "#6b4252",
        },
        {
          label : "مشکی چرمی",
          value : "#0e1013",
        },
        {
          label : "بلوند خاکستری",
          value : "#c9a17d",
        },
        {
          label : "بلوند طلایی",
          value : "#d5b68f",
        },
        {
          label : "عسلی",
          value : "#c79164",
        },
        {
          label : "باتراسکاچ",
          value : "#513118",
        },
        {
          label : "قهوه‌ای سرد",
          value : "#705948",
        },
        {
          label : "مشکی مات",
          value : "#070a07",
        },
        {
          label : "قرمز دارچینی",
          value : "#623b29",
        },
        {
          label : "قرمز طلایی",
          value : "#a42b08",
        },
      ],
      conditions:{
        whites:[
          {
            label : "صفر",
            value : 1
          },
          {
            label : "خیلی کم",
            value : 2
          },
          {
            label : "حدود 50 درصد",
            value : 3
          },
          {
            label : "بالا 50 درصد",
            value : 4
          }
        ],
        declare:[
          {
            label : "صفر",
            value : 1
          },
          {
            label : "20 درصد",
            value : 2
          },
          {
            label : "50 درصد",
            value : 3
          },
          {
            label : "80 درصد",
            value : 4
          },
          {
            label : "100 درصد",
            value : 5
          }
        ],
        base:[
          {
            label : "قرمزی",
            value : 1
          },
          {
            label : "زردی",
            value : 2
          },
          {
            label : "نارنجی",
            value : 3
          },
          {
            label : "زیتونی",
            value : 4
          },
          {
            label : "مشکی",
            value : 5
          }
        ],
        consolidated:[
          {
            label : "آمبره",
            value : 1
          },
          {
            label : "لایت",
            value : 2
          },
          {
            label : "بالیاژ",
            value : 3
          },
          {
            label : "سامبره",
            value : 4
          },
        ],
      },
      items :{
        first_color : null,
        second_color : null,
        conditions : {
          whites:null,
          declare:null,
          base:null,
          consolidated:null,
        }
      },
      info_dialog:false,
      loading:false,
      answer:null,
    }
  },
  methods:{
    Send_Items(){
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
      return !!(this.items.conditions.base && this.items.conditions.consolidated && this.items.conditions.declare && this.items.conditions.whites);
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
                :options="colors"
                emit-value
                map-options
                use-input
                v-model="items.second_color"
                position="top"
                clearable
                color="purple-3"
                clear-icon="fa-duotone fa-solid fa-times-circle text-red-8 font-22"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear" :style="'background-color:'+scope.opt.value"></div>
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
                    <div class="tear-selected" :style="'background-color:'+scope.opt.value"></div>
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
                :options="colors"
                emit-value
                map-options
                use-input
                v-model="items.first_color"
                position="top"
                clearable
                color="purple-3"
                clear-icon="fa-duotone fa-solid fa-times-circle text-red-8 font-22"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <div class="tear" :style="'background-color:'+scope.opt.value"></div>
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
                    <div class="tear-selected" :style="'background-color:'+scope.opt.value"></div>
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
              <div v-if="!CheckInfo" class="text-center text-grey-9">
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
                <q-card-section class="q-pt-sm">
                  <div>
                    <q-select
                        outlined
                        :options="conditions.whites"
                        emit-value
                        map-options
                        v-model="items.conditions.whites"
                        label="میزان سفیدی"
                        color="purple-8"
                        rounded
                    >
                    </q-select>
                  </div>
                  <div class="q-mt-lg">
                    <q-select
                        outlined
                        :options="conditions.declare"
                        emit-value
                        map-options
                        v-model="items.conditions.declare"
                        label="میزان دکلره"
                        color="purple-8"
                        rounded
                    >
                    </q-select>
                  </div>
                  <div class="q-mt-lg">
                    <q-select
                        outlined
                        :options="conditions.base"
                        emit-value
                        map-options
                        v-model="items.conditions.base"
                        label="رنگ پایه"
                        color="purple-8"
                        rounded
                    >
                    </q-select>
                  </div>
                  <div class="q-mt-lg">
                    <q-select
                        outlined
                        :options="conditions.consolidated"
                        emit-value
                        map-options
                        v-model="items.conditions.consolidated"
                        label="تلفیقی"
                        color="purple-8"
                        rounded
                    >
                    </q-select>
                  </div>
                </q-card-section>
                <q-card-actions align="left" class="q-mb-sm q-px-md">
                  <q-btn class="font-14" color="pink-5" rounded glossy label="‌ثبت اطلاعات" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div class="q-mt-xl text-center">
            <q-btn glossy @click="Send_Items" color="purple-7" label="ثبت و محاسبه اطلاعات شما" class="submit-btn"></q-btn>
          </div>



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
  border-radius:6px;
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
}




</style>