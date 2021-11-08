<template>
  <header>
    <div class = "header-logo">
      <img src="../img/logo.png">
    </div>
    <div class="header-list">
      <NuxtLink to="/register" class="register-link">新規登録</NuxtLink>
      <NuxtLink to="/login" class="login-link">ログイン</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(48,48,48);
    height: 48px;
    padding: 15px;
  }

  .header-logo img {
    width: 150px;
  }

  .register-link, .login-link {
    text-decoration: none;
    color: white;
    font-size: 20px;
    margin-right: 20px;
  }

  .register-link:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

  .login-link:hover {
    opacity: 0.6;
    transition: 0.6s;
  }

</style>

