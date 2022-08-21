<template>
  <v-layout>
    <v-app-bar elevation="0" app>
      <v-row class="d-flex justify-space-between align-center">
        <v-col class="d-flex align-center" cols="2">
          logo
        </v-col>

        <v-col class="d-none d-md-flex align-center" cols="8">
          <v-text-field variant="outlined" density="compact" placeholder="Поиск по ингредиентам или по названию"
            hide-details="auto" class="search-input">
            <template #append-inner>
              <span class="material-icons">search</span>
            </template>
          </v-text-field>
          <v-btn color="accent" class="accent-button ml-4">Поиск по фото</v-btn>
        </v-col>

        <v-col class="d-lg-flex d-none align-center justify-end" cols="2">
          <v-btn>
            войти
          </v-btn>
          <v-btn>
            регистрация
          </v-btn>
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