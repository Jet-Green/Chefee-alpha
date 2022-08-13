<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

let email = ref('')
let password = ref('')
let correct = ref(true)

async function submit() {
    axios.post('http://localhost:3300/users/auth', {
        email: email.value,
        password: password.value
    })
        .then((res) => {
            correct.value = res.data.correct;
        })
        .catch((err) => console.error(err))
}

watch(correct, (newVal, oldVal) => {
    if (newVal) {
        router.push('/recipes')
    }
})
</script>
<template>
    <h1>Вход</h1>
    <v-form @submit.prevent="submit">
        <v-text-field v-model="email" label="Электронная почта" variant="outlined" class="pt-3"></v-text-field>
        <v-text-field v-model="password" label="Пароль" variant="outlined"></v-text-field>
        <v-btn type="submit">Войти</v-btn>
    </v-form>
    <div v-if="!correct">
        Неправильный логин или пароль
    </div>
</template>