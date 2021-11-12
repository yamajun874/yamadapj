<template>
  <div class="home">
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
    <div class="home-content">
      <h2 class="home-ttl">ホーム</h2>
      <div class="home-wrapper" v-for="item in messageList" :key="item.id">
        <div class="home-default">
          <h2 class="home-wrapper--ttl">test</h2>

          <div class="heart-logo" @click="likesCreate(item.id)">
            <img src="../img/heart.png">
          </div>
          <p class="heart-num">{{like_count}}</p>

          <div class="delete-logo" @click="deleteShare(item.id)">
            <img src="../img/cross.png">
          </div>
          <div class="pointer-logo">
            <NuxtLink :to="{path: '/comment', query: {item: item.message}, param: {itemId: item.id}}"><img src="../img/detail.png"></NuxtLink>
          </div>
        </div>
        <p class="home-comment">
          {{item.message}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default{
  data(){
    return{
      like_count: '',
      shareMessage: '',
      messageList: [],
      userId: ''
    }
  },

  methods: {
    logout(){
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/login')
        })
    },



    async getShare(){
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/share');
      this.messageList = resData.data.data;
      this.like_count = resData.data.count;
    },

    async createShare(){
      const sendData = {
        message: this.shareMessage,
      };
      await this.$axios.post('http://127.0.0.1:8000/api/share', sendData);
      this.getShare();
      this.shareMessage = '';
    },

    async deleteShare(id){
      await this.$axios.delete('http://127.0.0.1:8000/api/share/' + id);
      this.getShare();
    },

    async likesCreate(messageId){
      const sendItem = {
        message_id: messageId,
        user_id: this.userId
      };
      const Data = await this.$axios.post('http://127.0.0.1:8000/api/like', sendItem);
      const checkData = Data.data.data;
      console.log(checkData);
      this.getShare();
    },

  },
  
  created(){
    
    this.getShare();
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user.uid);
        this.userId = user.uid;
      }
    })

    },
  
}

</script>

<style scoped>
  .home {
    background: rgb(48,48,48);
    min-height: 100vh;
    display: flex;
  }

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


  .home-content {
    color: white;
    width: 78%;
  }

  .home-ttl {
    font-size: 18px;
    border: 1px solid white;
    padding: 15px;
  }

  .home-wrapper {
    border: 1px solid white;
    padding: 15px;
    border-collapse: collapse;
  }

  .home-default {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  .heart-logo img{
    width: 25px;
  }

  .delete-logo img {
    width: 25px;
  }

  .pointer-logo img {
    width: 25px;
  }

  .heart-logo {
    padding: 0 12px;
    cursor: pointer;
  }

  .delete-logo {
    padding-left: 12px;
    margin-right: 50px;
    cursor: pointer;
  }

  .delete-logo:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

  .heart-logo:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

  .pointer-logo:hover {
    opacity: 0.6;
    transition: 0.6s;
  }
</style>