<template>
  <section class="container">
    <div>
      <Logo />
      <h1 class="title">
        Employees
      </h1>
      <ul class="users">
        <li v-for="employee in employees" :key="employee.ID" class="user">
          <nuxt-link :to="{ name: 'employees-id', params: { id: employee.ID }}">
            {{ employee.NAME }}
          </nuxt-link>
          <!-- {{ employee[1] }} -->
        </li>
      </ul>
      <nuxt-link class="button" to="/">
        Homepage
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ $http }) {
    const data = await $http.$get('/api/employees')
    return { employees: data }
  },
  head () {
    return {
      title: 'Employees'
    }
  }
}
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
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
.button
{
  display: inline-block;
  margin-top: 50px;
}
</style>
