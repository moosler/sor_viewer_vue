<template>
  <v-container fluid>
    <v-row class="grey lighten-3" align="center" justify="center">
      <v-col cols="auto">
        <!-- <v-card class="mx-auto" max-width="1000" min-width="700" outlined> -->
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
      <v-col cols="auto">
        <!-- <v-card class="mx-auto" max-width="1000" min-width="700" outlined> -->
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">ParamsBlock</span>
            <v-text-field v-model="search" label="Filter"></v-text-field>
          </v-card-title>
          <v-data-table :headers="fileHeaders" :items="fileblocks" :search="search"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="grey lighten-5" align="center" justify="center">
      <v-col cols="auto">
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">Checksum</span>
          </v-card-title>
          <v-data-table
            :headers="extractHeaders(dumpdata.Cksum)"
            :items="[dumpdata.Cksum]"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">DataPts</span>
          </v-card-title>
          <v-data-table
            :headers="extractHeaders(dumpdata.DataPts)"
            :items="[dumpdata.DataPts]"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="grey lighten-1" align="center" justify="center">
      <v-col v-for="(value, key) in dumpdata" v-bind:key="value.id" cols="auto">
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">{{key}}</span>
          </v-card-title>
          <v-data-table :headers="extractHeaders(value)" :items="[value]" hide-default-footer></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//loop object in object
//http://jsfiddle.net/mnahara/eywraw8t/453302/
import filedata from "../assets/data/sample.json";
import dump from "../assets/data/dump.json";
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  computed: {
    dumpdata() {
      return dump;
    },
    fileHeaders() {
      let headerData = [];
      for (let block in filedata.blocks) {
        for (let item in filedata.blocks[block]) {
          let obj = { text: item, value: item };
          headerData.push(obj);
        }
        break;
      }
      return headerData;
    },
    fileblocks() {
      let blockData = [];
      for (let block in filedata.blocks) {
        let obj = filedata.blocks[block];
        blockData.push(obj);
      }
      return blockData;
    }
  },
  data() {
    return {
      extractHeaders(obj) {
        let objArr = [];
        for (const key in obj) {
          let newObj = { text: key, value: key };
          objArr.push(newObj);
        }
        return objArr;
      },
      items: ["JDSU MTS600", "EXfo"],
      search: "",
      headers: [
        {
          text: "checksum",
          align: "left",
          sortable: false,
          value: "checksum"
        },
        { text: "checksum_ours", value: "checksum_ours" },
        { text: "match", value: "match" }
      ]
    };
  }
};
</script>
