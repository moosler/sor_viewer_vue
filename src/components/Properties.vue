<template>
  <v-row>
    <v-col cols="auto">
      <v-card class="mx-auto" max-width="400" tile>
        <v-list dense>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>