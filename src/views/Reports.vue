<template>
<div id="reports">
    <div id="pickerWrap">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Pick a date..."
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable :dark="dark" :reactive="reactive">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      
    </v-layout>
    </div>
    <br>
    <h2>Showing reports for {{date}}</h2>
</div>
</template>

<script>
export default {
    data:function(){
        return{
        dark: true,
        reactive: true,
        logged: true,
        password: "",
        date: new Date().toISOString().substr(0, 10),
}
        }
    }

</script>

<style>
#pickerWrap{
    padding-top:10px;
    color:rgb(214, 214, 214);
    background:rgb(180, 180, 180);
    width:200px;
    margin-left:120px;
    border-radius: 5px;
}
#pickerWrap input{
    color:rgb(36, 36, 36);
    background:rgb(180, 180, 180);
    width:150px;    
}
</style>