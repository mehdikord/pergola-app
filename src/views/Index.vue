<script>
export default {
  name: "Index",

  data(){
    return{

    }
  }
}
</script>

<template>

  <q-card flat >
    <q-card-section >
      <div class=" text-center">
        <img class="logo-image" src="assets/images/icons/logo.png" alt="">
      </div>
      <div class="text-center subtitle-text">
        <strong class="text-pink-9">
          پرگولا اولین پلتفرم اختصاصی مو و رنگ مو
        </strong>
      </div>
      <div class="q-mt-lg text-center">

      </div>
    </q-card-section>

  </q-card>
</template>

<style scoped>
.title-text{
  font-size: 45px;
}
.subtitle-text{
  font-size: 17px;
}
.logo-image{
  width: 340px;
}
@media only screen and (max-width: 768px) {
  .title-text{
    font-size: 32px;
  }
  .logo-image{
    width: 260px;
  }
}
</style>