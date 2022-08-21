<template>
  <v-layout>
    <v-app-bar elevation="0" app>
      <v-row class="d-flex justify-space-between align-center">
        <v-col class="d-flex align-center" lg="2">
          logo
        </v-col>

        <v-col class="d-flex align-center" lg="8" cols="8">
          <v-text-field variant="outlined" density="compact" placeholder="Поиск по ингридиентам или по названию"
            hide-details="auto"></v-text-field>
          <v-btn color="accent" class="header-accent-button ml-4">Поиск по фото</v-btn>
        </v-col>

        <v-col class="d-md-flex d-none align-center justify-end" cols="2">
          <v-btn>
            войти
          </v-btn>
          <v-btn>
            регистрация
          </v-btn>
        </v-col>
        <v-col class="d-md-none d-block" cols="1">
          <v-btn icon="mdi:mdi-menu"></v-btn>
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