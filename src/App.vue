<template>
  <v-layout>
    <v-app-bar app>
      <v-row>
        <v-col>
          logo
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" placeholder="Поиск по ингридиентам или по названию"
            hide-details="auto"></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="primary">Поиск по фото</v-btn>
        </v-col>
        <v-col>
          войти
        </v-col>
        <v-col>
          регистрация
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="10" lg="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>