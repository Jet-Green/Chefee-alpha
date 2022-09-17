<script setup>
import { ref, onMounted } from 'vue'

import UserService from './services/UserService';

import { useSearch } from './stores/search'
import { useUser } from './stores/userStore'

let searchStore = useSearch()
let userStore = useUser()

let searchRequest = ref('')

let loginEmail = ref('')
let loginPassword = ref('')

let registrationEmail = ref('')
let registrationPassword = ref('')

function search() {
    if (searchRequest.value) {
        searchStore.searchRequest = searchRequest.value
        // Вызывается action addREquestHistory, ищется searchRequest.value в ингрединетах и добавляется в историю запросов
        searchStore.fetchReipesByStrSearch();
    }
}

let loginDialog = ref(false)
function openLoginDialog() {
    loginDialog.value = true;
}
function login() {
    userStore.login(loginEmail.value, loginPassword.value)
}

let registrationDialog = ref(false)
function openRegistrationDialog() {
    registrationDialog.value = true;
}
function registration() {
    userStore.registration(registrationEmail.value, registrationPassword.value)
}


onMounted(() => {
    if (localStorage.getItem('token')) {
        userStore.checkAuth()
    }
})
</script>
<template>
    <v-layout>
        <v-app-bar elevation="0" app>
            <v-row class="d-flex justify-space-between align-center">
                <v-col class="d-flex align-center" cols="2">
                    logo
                </v-col>

                <v-col class="d-none d-md-flex align-center" cols="8">
                    <v-form class="w-100" @submit.prevent="search">
                        <v-text-field variant="outlined" density="compact"
                            placeholder="Поиск по ингредиентам или по названию" hide-details="auto" class="search-input"
                            v-model="searchRequest">
                            <template #append-inner>
                                <span class="material-icons" @click="search">search</span>
                            </template>
                        </v-text-field>
                    </v-form>
                    <v-btn class="accent-button ml-4">Поиск по фото</v-btn>
                </v-col>

                <v-col class="d-lg-flex d-none align-center justify-end" cols="2">
                    <v-btn v-if="userStore.isAuth" @click="userStore.logout">
                        выйти
                    </v-btn>

                    <div v-else>
                        <v-btn @click="openLoginDialog">
                            войти
                        </v-btn>
                        <v-dialog v-model="loginDialog" persistent>
                            <v-card style="min-width: 40vw">
                                <v-card-title>
                                    <h3>Вход</h3>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginEmail" placeholder="email"
                                                    variant="outlined" hide-details="auto" density="compact"
                                                    class="search-input">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginPassword" placeholder="пароль"
                                                    variant="outlined" hide-details="auto" density="compact"
                                                    class="search-input" type="password">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="login">
                                        войти
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>


                        <v-btn @click="openRegistrationDialog">
                            регистрация
                        </v-btn>
                        <v-dialog v-model="registrationDialog" persistent>
                            <v-card style="min-width: 30vw">
                                <v-card-title>
                                    <h3>Регистрация</h3>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="registrationEmail" placeholder="email"
                                                    variant="outlined" hide-details="auto" density="compact"
                                                    class="search-input">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="registrationPassword" placeholder="пароль"
                                                    variant="outlined" hide-details="auto" density="compact"
                                                    class="search-input" type="password">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="registration">
                                        зарегистрироваться
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>

                </v-col>
                <v-col class="d-lg-none d-flex justify-end" cols="2">
                    <span class="material-icons ma-3">menu</span>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
    </v-layout>
</template>