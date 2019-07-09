<template>
<div id="settings">
  <v-app>
    <v-form>
      <v-container class="settings" fluid>
        <h1>Settings</h1>
        <v-divider class="divider" dark/>
        <v-layout>
          <v-flex md6>
            <v-text-field
              dark color="grey"
              v-model="activeSettings.emotions"
              label="Emotions preview">
            </v-text-field>
          </v-flex>

          <v-flex md6>
            <v-combobox
              dark color="grey"
              v-model="activeSettings.message"
              :items="messages"
              label='Thank you message'
              clearable>
              </v-combobox>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-text-field
              dark color="grey"
              v-model="activeSettings.emotionsNum"
              :rules="emotionsRules"
              label="Number of emotions"
              type="number"
              min="3"
              max="5">
            </v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              dark color="grey"
              v-model="activeSettings.messageTimeout"
              :rules="timeoutRules"
              label="Mesage timeout"
              type="number"
              min="1"
              max="10">>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-app>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';

export default {
  data() {
    return {
      activeSettings: {
        emotions: ' ',
        message: 'Thanks',
        emotionsNum: 5,
        messageTimeout: 7,
      },
      messages: ['thanks', 'thank you'],
      emotionsRules: [
        v => !!v || 'Emotions number is required',
        v => v > 2 || 'Min value is 3',
        v => v < 6 || 'Max value is 5',
      ],
      timeoutRules: [
        v => !!v || 'Message timeout is required',
        v => v > 0 || 'Min value is 1',
        v => v < 11 || 'Max values is 10',
      ],
    };
  },
  methods: {
    validateSettings() {
      return this.activeSettings.message.length > 0
        && this.activeSettings.message.length < 121
        && this.activeSettings.emotionsNum > 2
        && this.activeSettings.emotionsNum < 6
        && this.activeSettings.messageTimeout > 0
        && this.activeSettings.messageTimeout < 11;
    },
    getActiveSettings() {
      ApiService.getActiveSettings()
        .then((response) => {
          this.activeSettings = response.data;
        });
    },
  },
  created() {
    this.getActiveSettings();
  },
};
</script>

<style>
.settings {
    width: 80%;
    background: rgb(18, 20, 22);
  }
  .divider {
    margin: 20px 0;
  }
  #settings {
    float: left;
    margin-left: 200px;
    width:calc(100% - 200px);
    background: rgb(18, 20, 22);
  }
  .application--wrap{
    background: rgb(18, 20, 22);
  }
</style>
