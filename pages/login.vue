<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="login-input"
        :invalid-feedback="form.login.errorMessage"
        :state="form.login.state"
      >
        <b-form-input
          id="login"
          v-model="form.login.value"
          required
          trim
          :state="form.login.state"
          placeholder="Введите логин"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="password-input"
        :invalid-feedback="form.password.errorMessage"
        :state="form.password.state"
      >
        <b-form-input
          id="password"
          v-model="form.password.value"
          required
          trim
          type="password"
          :state="form.password.state"
          placeholder="Введите пароль"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="login-authMethod"
        :invalid-feedback="form.authMethod.errorMessage"
        :state="form.authMethod.state"
      >
        <b-form-select
          v-model="form.authMethod.value"
          :options="authList"
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="outline-primary" class="bttn">Войти</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.sessionID) {
      return this.$router.push('/cabinet');
    }
    if (this.$api.hasConnected()) {
      getAvailabilityAuth(this);
    } else {
      this.$api.onOpen = () => {getAvailabilityAuth(this)};
      this.$api.connect(this.$api.apiUrl);
    }

    function getAvailabilityAuth(_this) {
      _this.$api.sendRequest('getAvailabilityAuth', {}, (auth) => {
        console.log(auth);
        let authList = _this.authList;
        auth.list.forEach(el => {
          authList.push({
            value: el.name,
            text: el.displayName
          })
        })
        _this.authList = authList;
      }, console.error);
    }
  },
  head: {
    title: "Login"
  },
  data() {
    return {
      form: {
        login: {
          value: "",
          errorMessage: "",
          state: null
        },
        password: {
          value: "",
          errorMessage: "",
          state: null
        },
        authMethod: {
          value: "",
          errorMessage: "",
          state: null
        }
      },
      authList: [
        {
          value: '',
          text: 'Выберите профиль авторизации',
          disabled: true
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login', {
        login: this.form.login.value,
        password: this.form.password.value,
        authMethod: this.form.authMethod.value,
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
form {
  width: 250px;
  margin-top: 20px;
}
button {
  width: 40%;
  display: block !important;
  margin: auto;
}
.form-group {
  color: #555;
}
</style>
