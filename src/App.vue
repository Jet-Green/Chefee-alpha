<template>
  <v-layout>
    <v-app-bar app>
      <v-row class="d-flex justify-space-between align-center">
        <v-col class="d-flex align-center" lg="2">
          logo
        </v-col>

        <v-col class="d-flex align-center" lg="5">
          <v-text-field variant="outlined" density="compact" placeholder="Поиск по ингридиентам или по названию"
            hide-details="auto"></v-text-field>
        </v-col>

        <v-col class="d-flex align-center" lg="3">
          <v-btn color="accent" class="header-accent-button">Поиск по фото</v-btn>
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