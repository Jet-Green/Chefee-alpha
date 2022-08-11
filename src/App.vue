<template>
  <v-layout>
    <v-app-bar app>
      <h2>Header</h2>
    </v-app-bar>
    <v-main>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="10" lg="6">
          <router-view />
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>