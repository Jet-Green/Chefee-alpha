<script setup>
import { ref, onMounted } from 'vue'

import UserService from './services/UserService';

import { useRecipes } from './stores/recipes'
import { useUser } from './stores/userStore'

import logo from './assets/chefee-logo.svg'

let useRecipesStore = useRecipes()
let userStore = useUser()

let searchRequest = ref('')

let loginEmail = ref('')
let loginPassword = ref('')

let registrationEmail = ref('')
let registrationPassword = ref('')

let drawer = ref(false)

function search() {
    if (searchRequest.value.trim()) {
        useRecipesStore.setSearchRequest(searchRequest.value.trim());
        useRecipesStore.fetchReipesByStrSearch();
    }
}

let loginDialog = ref(false)
function openLoginDialog() {
    loginDialog.value = true;
    registrationDialog.value = false;
}
function login() {
    userStore.login(loginEmail.value, loginPassword.value)
}

let registrationDialog = ref(false)
function openRegistrationDialog() {
    registrationDialog.value = true;
    loginDialog.value = false;
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
    <v-app>
        <v-app-bar elevation="0" app>
            <v-row class="d-flex justify-space-between align-center">
                <v-col class="d-flex align-center jusitfy-center" cols="2">
                    <img :src="logo" class="ml-5" />
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
                <v-spacer></v-spacer>
                <v-col class="d-flex justify-end">
                    <v-app-bar-nav-icon @click="drawer = !drawer">
                        <span class="material-icons ma-3">menu</span>
                    </v-app-bar-nav-icon>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-navigation-drawer v-model="drawer" right temporary>
                <v-list>
                    <v-list-item v-if="userStore.isAuth">
                        <v-list-item-title @click="userStore.logout">
                            выйти
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="!userStore.isAuth">
                        <v-list-item-title @click="openLoginDialog">войти</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="!userStore.isAuth">
                        <v-list-item-title @click="openRegistrationDialog">регистрация</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <v-dialog v-model="loginDialog">
            <v-card style="min-width: 30vw">
                <v-card-title>
                    <h3>Вход</h3>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="loginEmail" placeholder="email" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="loginPassword" placeholder="пароль" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input" type="password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="login">
                        войти
                    </v-btn>
                    <v-btn @click="openRegistrationDialog">
                        регистрация
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="registrationDialog">
            <v-card style="min-width: 30vw" class="d-flex">
                <v-card-title>
                    <h3>Регистрация</h3>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="registrationEmail" placeholder="email" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="registrationPassword" placeholder="пароль" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input" type="password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="registration">
                        зарегистрироваться
                    </v-btn>
                    <v-btn @click="openLoginDialog">
                        вход
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>