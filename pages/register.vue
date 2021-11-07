<template>
  <div class="register-content">
    <h1 class="register-ttl">新規登録</h1>
    <input type="text" v-model="name" placeholder="ユーザーネーム">
    <input type="email" v-model="email" placeholder="メールアドレス">
    <input type="password" v-model="password" placeholder="パスワード">
    <button @click="register">新規登録</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data(){
    return{
      name: '',
      email: '',
      password: ''
    }
  }
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
      }
    }
  }
</script>

<style scoped>

</style>