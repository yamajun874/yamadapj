<template>
  <div class="login">
    <CommonHeader />
    <div class="login-content">
      <h1 class="login-ttl">ログイン</h1>
      <input type="email" v-model="email" placeholder="メールアドレス">
      <input type="password" v-model="password" placeholder="パスワード">
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      if(!this.email || !this.password){
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/home')
        })
        .catch((error) => {
          switch (error.code){
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    }
  }
}
</script>

<style scoped>
  .login {
    background: rgb(48,48,48);
    height: 100vh;
  }

  .login-content {
    background: white;
    width: 400px;
    height: 250px;
    text-align: center;
    border-radius: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 100px;
  }

  .login-ttl {
    font-size: 20px;
    padding: 25px 0;
  }

  .login-content input, .login-content button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  .login-content input {
    width: 270px;
    height: 25px;
    border-radius: 10px;
    padding: 5px;
  }

  .login-content button {
    background: #6633CC;
    color: white;
    font-weight: bold;
    width: 100px;
    height: 35px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
  }

  .login-content button:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

</style>