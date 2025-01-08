<script>
export default {
  name: "Hair_Coloring",
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
      first_color : null,
      second_color : null,
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
            v-model="second_color"
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
            v-model="first_color"
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


    </q-card-section>

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
}




</style>