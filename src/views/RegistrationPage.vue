<script setup>
import { ref } from 'vue'
import axios from 'axios'

let name = ref('')
let email = ref('')
let password = ref('')

async function submit() {
    axios.post('http://localhost:3300/users/register', {
        username: name.value,
        email: email.value,
        password: password.value
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then((res) => {
            console.log(res.status);
        })
        .catch((err) => console.error(err))
}
</script>
<template>
    <h1>Регистрация</h1>
    <v-form @submit.prevent="submit">
        <v-text-field v-model="email" label="Электронная почта" variant="outlined" class="pt-3"></v-text-field>
        <v-text-field v-model="name" label="Имя" variant="outlined"></v-text-field>
        <v-text-field v-model="password" label="Пароль" variant="outlined"></v-text-field>
        <v-btn type="submit">Зарегистрироваться</v-btn>
    </v-form>
</template>