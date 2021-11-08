<template>
  <aside>
    <div class="sideber-logo">
      <img src="../img/logo.png">
    </div>
    <NuxtLink to="/home" class="home-icon">ホーム</NuxtLink>
    <p @click="logout" class="logout-btn">ログアウト</p>
    <span>シェア</span>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{errors}" rules="required||max:120">
        <textarea type="text" v-model="shareMessage"></textarea>
        <div class="error">{{errors[0]}}</div>
      </validation-provider>
      <button class="share-btn" type="button" :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="createShare">シェアする</button>
    </validation-observer>
  </aside>
</template>


<style scoped>
  aside {
    background: rgb(48,48,48);
    width: 300px;
    padding: 20px 15px;
    position: relative;
    height: 360px;
  }

  .home-icon {
    text-decoration: none;
    color: white;
    margin: 15px 0;
    position: relative;
    height: 30px;
    padding-left: 50px;
    display: flex;
    align-items: center;
  }

  .home-icon::before {
    content: "";
    background: url("../img/home.png");
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
  }

  .home-icon:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

  .logout-btn {
    color: white;
    cursor: pointer;
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    position: relative;
    margin-bottom: 15px;
  }

  .logout-btn:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

  .logout-btn::before {
    content: "";
    background: url("../img/logout.png");
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
  }

  .sideber-logo img {
    width: 150px;
  }

  span {
    display: block;
    color: white;
    padding-bottom: 15px;
  }

  textarea {
    background: rgb(48,48,48);
    color: white;
    border: 1px solid white;
    height: 130px;
    width: 250px;
    display: block;
    border-radius: 20px;
    margin-bottom: 15px;
  }

  .share-btn {
    background: #6633CC;
    color: white;
    font-weight: bold;
    width: 100px;
    height: 35px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    display: block;
    position: absolute;
    right: 50px;
    bottom: 15px;
  }

  .share-btn:hover {
    opacity: 0.6;
    transition: 0.6s;
  }



</style>