<script>
import { useQuasar} from 'quasar'
import {Stores_Profile} from "@/stores/profile/profile.js";
import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name: "Profile",
  mounted() {
    this.Get_Profile();
  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      user:null,
      dialog_edit:false,
      edit_items:{
        name:null,
        age:null,
      },
      errors :[],
      $q: useQuasar(),

    }
  },
  methods:{
    Get_Profile(){
      Stores_Profile().Index().then((res)=>{
        this.user=res.data.result;
        this.edit_items.name=this.user.name;
        this.edit_items.age=this.user.age;
        this.loading=false;
      }).catch((error)=>{
        return this.Methods_Notify_Error_Server();
      })

    },
    Edit_Profile(){
      this.edit_loading=true;
      Stores_Profile().Edit(this.edit_items).then((res)=>{
        this.user=res.data.result;
        this.edit_items.name=this.user.name;
        this.edit_items.age=this.user.age;
        this.edit_loading=false;
        this.dialog_edit=false;
        return this.Methods_Notify_Message_Success("اطلاعات کاربری باموفقیت ویرایش شد")

      }).catch((error)=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.edit_loading=false;

      })

    },
    Logout(){
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'از حساب کاربری خود خارج شوید ؟',
        ok: {
          glossy: true,
          rounded: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          rounded: true,
          color: 'red-7'
        },
        persistent: true
      }).onOk(() => {
        Stores_Auth().AuthLogout();
        this.Methods_Notify_Message_Success("از حساب کاربری خود خارج شدید")
        this.$router.push('/auth');
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    }
  }
}
</script>

<template>
  <q-card class="q-mt-md q-mx-xs " flat style="background-color: rgba(110,21,140,0.09)">
    <template v-if="loading">
      <global_loading_colorful class="q-pb-lg" size="90" text="درحال دریافت اطلاعات کاربری"></global_loading_colorful>
    </template>
    <template v-else>
      <q-card-section>
        <div class="row animation-fade-in">
          <div class="col-md-2 col-sm-3 col-xs-3 q-px-sm">
            <img src="assets/images/icons/profile.png" class="profile-image" alt="">
          </div>
          <div class="col-md-10 col-sm-9 col-xs-9 q-px-sm">
            <div class="">
              <strong v-if="user.name" class="profile-name text-teal-8">{{user.name}}</strong>
              <strong v-else class="profile-name text-grey-7">( نام وارد نشده )</strong>
            </div>
            <div class="q-mt-sm">
              <strong class="profile-phone text-grey-9">{{user.phone}}</strong>
            </div>
            <div class="q-mt-sm">
              <span class="text-grey-8">سن : </span>
              <strong class=" text-red-8">{{user.age ?? '---'}}</strong>
            </div>
            <div class="text-right q-mt-sm">
              <q-btn @click="dialog_edit=true" class="profile-btn q-mr-xs" size="sm" outline color="blue-8" glossy rounded label="ویرایش" icon="fa-duotone fa-regular fa-edit"></q-btn>
              <q-btn @click="Logout" class="profile-btn" size="sm" color="red-7" outline glossy rounded label="خروج" icon="fa-duotone fa-regular fa-arrow-left-from-arc"></q-btn>
            </div>
          </div>
        </div>
        <q-dialog
            v-model="dialog_edit"
            position="top"
        >
          <q-card style="width: 90vw;">
            <q-card-section>
              <label for="" class="text-blue-8"><strong>ویرایش اطلاعات کاربری</strong></label>
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-mt-sm">
              <div class="q-px-sm">
                <q-input v-model="edit_items.name" outlined rounded label="نام کامل" :error="this.Methods_Validation_Check(errors,'name')">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-solid fa-user text-purple-7" />
                  </template>
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                  </template>
                </q-input>
              </div>
              <div class="q-px-sm q-mt-sm">
                <q-input v-model="edit_items.age" outlined rounded label="سن" type="number" :error="this.Methods_Validation_Check(errors,'age')">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-solid fa-calendar-circle-user text-purple-7" />
                  </template>
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'age')" />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="q-mb-sm q-px-md q-mt-sm">
              <q-btn @click="Edit_Profile" :loading="edit_loading" size="sm" class="submit-btn" color="blue-8"  rounded glossy label="ویرایش اطلاعات" icon="fa-duotone fa-solid fa-check-circle" />
              <q-btn size="sm" class="submit-btn" color="grey-8"  rounded glossy label="بستن" icon="fa-duotone fa-solid fa-times-circle" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>



      </q-card-section>

    </template>
  </q-card>
  <q-card flat class="q-mt-sm">
    <q-card-section class="q-px-xs">
      <div class="row justify-center">
        <div class="col-md-3 col-sm-4 col-xs-4 q-px-xs">
          <div class="profile-menu-box glossy bg-teal-7">
            <q-icon name="fa-duotone fa-light fa-stars" color="white" class="icon-size"></q-icon>
            <strong class="float-right q-mt-xs text-white profile-menu-title">اشتراک ها</strong>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 col-xs-4 q-px-xs">
          <div class="profile-menu-box glossy bg-blue-7">
            <q-icon name="fa-duotone fa-light fa-floppy-disk" color="white" class="icon-size"></q-icon>
            <strong class="float-right q-mt-xs text-white profile-menu-title">ذخیره شده</strong>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 col-xs-4 q-px-xs">
          <div class="profile-menu-box glossy bg-deep-orange-8">
            <q-icon name="fa-duotone fa-light fa-money-bill-transfer" color="white" class="icon-size"></q-icon>
            <strong class="float-right q-mt-xs text-white profile-menu-title">تراکنش ها</strong>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.profile-image {
  width: 100px;
}
.profile-name{
  font-size: 16px;
}
.profile-btn{
  font-size: 12px !important;
}
.submit-btn{
  font-size: 13px !important;
}
.profile-menu-box{
  padding: 16px 14px;
  border-radius: 8px;
}
.profile-menu-title{
  font-size: 16px;
}
.icon-size{
  font-size: 32px !important;
}

@media only screen and (max-width: 768px) {
  .profile-image {
    width: 75px;
  }
  .profile-name{
    font-size: 15px;
  }
  .profile-phone{
    font-size: 14px;
  }
  .profile-btn{
    font-size: 11px !important;
  }
  .submit-btn{
    font-size: 12px !important;
  }
  .profile-menu-box{
    padding: 13px 8px;
    border-radius: 8px;
  }
  .profile-menu-title{
    font-size: 13px;
  }
  .icon-size{
    font-size: 28px !important;
  }
}

</style>