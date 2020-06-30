<template>
  <div>
    <h1>Тут будет кабинет лол</h1>
    <b-button variant="outline-primary" to="/logout">Выйти</b-button>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
