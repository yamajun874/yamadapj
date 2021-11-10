<template>
  <div class="register">
    <CommonHeader />
    <div class="register-content">
      <h1 class="register-ttl">新規登録</h1>
      <input type="text" v-model="name" placeholder="ユーザーネーム">
      <input type="email" v-model="email" placeholder="メールアドレス">
      <input type="password" v-model="password" placeholder="パスワード">
      <button @click="register">新規登録</button>
    </div>
  </div>  
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return{
      name: '',
      email: '',
      password: '',
      uid: ''
    }
  },
  methods: {
    register(){
      if(!this.email || !this.password){
        alert('メールアドレスまたはパスワードが入力されていません。 ')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data)=> {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/home')
          })
        })
        .catch((error) => {
          switch(error.code){
            case 'auth/invalid-email':
              alert('メールアドレス形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。再度入力してください。')
              break
          }
        })
        .onAuthStateChange((user) => {
          if(user){
             var uid = user.uid;
             this.uid = uid;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register {
    background: rgb(48,48,48);
    height: 100vh;
  }

  .register-content {
    background: white;
    width: 400px;
    height: 310px;
    text-align: center;
    border-radius: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 100px;
  }

  .register-ttl {
    font-size: 20px;
    padding: 25px 0;
  }

  .register-content input, .register-content button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  .register-content input {
    width: 270px;
    height: 25px;
    border-radius: 10px;
    padding: 5px;
  }

  .register-content button {
    background: #6633CC;
    color: white;
    font-weight: bold;
    width: 100px;
    height: 35px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
  }

  .register-content button:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

</style>