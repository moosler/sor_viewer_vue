<template>
  <v-row>
    <v-col cols="auto">
      <v-card class="mx-auto" outlined>
        <v-card-title>Select a Test File or Load a File from Disk</v-card-title>
        <v-select :items="items" dense label="Test File" outlined></v-select>
        <v-file-input
          accept=".sor, .SOR"
          label="Select an SOR File"
          outlined
          dense
          filled
          prepend-icon="mdi-current-ac"
        ></v-file-input>
      </v-card>
    </v-col>
  </v-row>
</template>