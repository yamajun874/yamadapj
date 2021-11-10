<template>
  <div class="comment">
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
    <div class="comment-content">
      <h2 class="comment-ttl">コメント</h2>
      <div class="comment-wrapper">
        <div class="comment-default">
          <h2 class="comment-wrapper--ttl">test</h2>
          <div class="heart-logo" @click="heartNum++">
            <img src="../img/heart.png">
          </div>
          <p class="heart-num">{{heartNum}}</p>
          <div class="delete-logo" @click="deleteShare($route.param.itemId)">
            <img src="../img/cross.png">
          </div>
        </div>
        <p class="comment-comment">
          {{$route.query.item}}
        </p>
      </div>
      <h3 class="comment-ttl--small">コメント</h3>
      <div class="comment-content--bottom">
        <h4 class="comment-ttl--bottom">test</h4>
        <p class="comment-comment--bottom">コメント</p>
      </div>
      <input type="text" v-model="shareComment" class="shareComment" />
      <button class="comment-btn" @click="createComment">コメント</button>
    </div>
  </div>
</template>

<script>//コメントに関して,いいねに関して,messageデータの移行の仕方
import firebase from '~/plugins/firebase'
export default {
  data(){
    return{
      heartNum: 0,
      shareMessage: '',
      shareComment: '',
      commentList: [],
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

    async createShare(){
      const sendData = {
        message: this.shareMessage,
      };
      await this.$axios.post('http://127.0.0.1:8000/api/share', sendData);
      this.shareMessage = '';
      this.$router.replace('/home')
    },

    async deleteShare(id){
      await this.$axios.delete('http://127.0.0.1:8000/api/share/' + id);
    }　//idの値が不特定になってしまう
  }
}
</script>

<style scoped>
  .comment {
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


  .comment-content {
    color: white;
    width: 78%;
  }

  .comment-ttl {
    font-size: 18px;
    border: 1px solid white;
    padding: 15px;
  }

  .comment-wrapper {
    border: 1px solid white;
    padding: 15px;
    border-collapse: collapse;
  }

  .comment-default {
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

  .comment-ttl--small {
    border: 1px solid white;
    padding: 15px;
    text-align: center;
  }

  .comment-content--bottom {
    border: 1px solid white;
    border-collapse: collapse;
    padding: 15px;
  }

  .comment-ttl--bottom {
    margin-bottom: 15px;
  }

  .shareComment {
    display: block;
    margin: 20px;
    width: 95%;
    height: 30px;
    background: rgb(48,48,48);
    color: white;
    border: 1px solid white;
    border-radius: 10px;
  }

  .comment-btn {
    background: #6633CC;
    color: white;
    font-weight: bold;
    width: 100px;
    height: 35px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    display: block;
    margin-left: auto;
  }

  .comment-btn:hover {
    opacity: 0.6;
    transition: 0.6s;
  }
</style>