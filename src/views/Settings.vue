<template>
  <div id="settings">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    >
    <v-app>
      <v-form>
        <v-container fluid>
          <h3>Settings</h3>
          <v-divider
            class="divider"
            dark
          />
          <v-layout>
            <v-flex class="flex">
              <v-select
                v-model="activeGroupName"
                dark
                color="grey"
                label="Set active emotions"
                :items="emoticonNames"
                @change="previewEmoticon"
              />
            </v-flex>
            <v-flex></v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="flex">
              <label style="float:left;">Emotions preview</label> <br>
              <v-icon
                v-for="emoticon in emoticonPreview"
                :key="emoticon.id"
                v-model="emoticon.symbol"
                dark
                class="fa-2x fa-fw"
                :class="[emoticon.symbol]"
              />
            </v-flex>

            <v-flex class="flex">
              <v-text-field
                v-model="activeSettings.emoticonNumber"
                dark
                color="grey"
                :rules="emotionsRules"
                label="Number of emotions"
                hint="Enter number from 3-5"
                persistent-hint
                type="number"
                min="3"
                max="5"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="flex">
              <v-text-field
                v-show="!showMessages"
                v-model="newMessage.text"
                dark
                color="grey"
                label="Thank you message"
                clearable
              />
              <v-select
                v-show="showMessages"
                v-model="activeSettings.message"
                dark
                color="grey"
                :items="messages"
                return-object
                hide-selected
                label="Thank you message"
              />
            </v-flex>

            <v-flex class="flex">
              <v-text-field
                v-model="activeSettings.messageTimeout"
                dark
                color="grey"
                :rules="timeoutRules"
                label="Mesage timeout"
                hint="Can be from 0-10"
                persistent-hint
                type="number"
                min="1"
                max="10"
              />
            </v-flex>
          </v-layout>
          <v-layout>

            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                >
                  Create new message
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="dialog-title headline"
                  primary-title
                >
                  New message
                </v-card-title>

                <v-card-text class="dialog">
                  <v-text-field
                  v-model="newMessage.text"
                  dark
                  color="black"
                  label="Thank you message"
                  clearable
                />
                </v-card-text>

                <v-card-actions class="dialog-footer">
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    @click="createNewMessage"
                  >
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>

            <v-btn
              class="update"
              @click="updateCheck"
            >
              Confirm
            </v-btn>
          <v-snackbar
            v-model="snackbar"
            :timeout="4000"
          >
            {{ snackbarMsg }}
            <v-btn
              flat
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable prefer-destructuring */
import { some, find, forEach } from 'lodash';
import ApiService from '@/services/ApiService';

export default {
  data() {
    return {
      snackbar: false,
      snackbarMsg: '',
      activeSettings: {},
      messages: [],
      newMessage: {},
      showMessages: false,
      selectedEmoticons: {},
      emoticonPreview: [],
      emoticons: [],
      emoticonNames: [],
      activeGroupName: '',
      emotionsRules: [
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
  created() {
    this.getActiveSettings();
    this.getThanksMessages();
    this.getEmoticonGroup();
  },
  methods: {
    getActiveSettings() {
      ApiService.getActiveSettings().then((response) => {
        this.activeSettings = response.data;
        this.newMessage = this.activeSettings.message;
        this.emoticonPreview = response.emoticons;
      });
    },
    getEmoticonGroup() {
      const token = this.$store.getters.token;
      ApiService.getEmoticonGroup(token).then((response) => {
        this.emoticons = response.data;
        this.activeGroupName = find(this.emoticons, ['id', this.activeSettings.emoticonsGroupId]).name;
        this.getEmoticonGroupNames();
        this.previewEmoticon();
      });
    },
    getEmoticonGroupNames() {
      forEach(this.emoticons, (group) => {
        this.emoticonNames.push(group.name);
      });
    },
    previewEmoticon() {
      this.selectedEmoticons = find(this.emoticons, ['name', this.activeGroupName]);
    },
    updateCheck() {
      if (!this.validateSettings()) {
        this.snackbarMsg = 'Please enter valid data';
        this.snackbar = true;
      } else {
        this.snackbarMsg = 'Settings successfully updated';
        this.updateActiveSettings();
      }
    },
    validateSettings() {
      return (
        this.activeSettings.message.text.length > 0
        && this.activeSettings.message.text.length < 121
        && this.activeSettings.emoticonNumber > 2
        && this.activeSettings.emoticonNumber < 6
        && this.activeSettings.messageTimeout > 0
        && this.activeSettings.messageTimeout < 11
      );
    },
    updateActiveSettings() {
      this.activeSettings.emoticonNumber = Number(this.activeSettings.emoticonNumber);
      this.setMessageId();
      this.updateActiveEmoticons();
      const token = this.$store.getters.token;
      ApiService.updateActiveSettings(
        this.activeSettings,
        this.activeSettings.id,
        token,
      );
      this.snackbar = true;
    },
    updateActiveEmoticons() {
      const id = find(this.emoticons, ['name', this.activeGroupName]).id;
      this.activeSettings.emoticonsGroupId = id;
    },
    createNewMessage() {
      if (!this.isMessageExisting(this.newMessage)) {
        const token = this.$store.getters.token;
        ApiService.createNewMessage(this.newMessage, token)
          .then((response) => {
            this.activeSettings.message = response.data;
            this.updateCheck();
            this.getThanksMessages();
          });
        this.dialog = false;
      }
    },
    isMessageExisting(message) {
      return some(this.messages, ['text', message.text]);
    },
    getThanksMessages() {
      const token = this.$store.getters.token;
      ApiService.getThanksMessages(token).then((response) => {
        this.messages = response.data;
      });
    },
    showExistingMessages() {
      this.showMessages = !this.showMessages;
      this.messagesBtnText = this.showMessages
        ? 'Create new message'
        : 'Show all messages';
    },
    updateEmoticonPreview() {
      this.emoticonPreview = [];
      if (this.activeSettings.emoticonNumber == 3) {
        forEach(this.selectedEmoticons.emoticons, (emoticon) => {
          if (emoticon.value % 2 !== 0) {
            this.emoticonPreview.push(emoticon);
          }
        });
      } else if (this.activeSettings.emoticonNumber == 4) {
        forEach(this.selectedEmoticons.emoticons, (emoticon) => {
          if (emoticon.value !== 3) {
            this.emoticonPreview.push(emoticon);
          }
        });
      } else {
        this.emoticonPreview = this.selectedEmoticons.emoticons;
      }
    },
  },
  watch: {
    activeSettings: {
      handler() {
        if (Object.getOwnPropertyNames(this.selectedEmoticons).length > 1) {
          this.updateEmoticonPreview();
        }
      },
      deep: true,
    },
    activeGroupName() {
      if (Object.getOwnPropertyNames(this.selectedEmoticons).length > 1) {
        this.updateEmoticonPreview();
      }
    },
  },
};
</script>

<style>
.settings {
  width: 80%;
  background: #1B1E24;
}
h3 {
  text-align: left;
  font-size: 2vw;
}
.divider {
  margin: 20px 0;
}
.v-list__tile__title {
   color: white !important;
}
.v-list.theme--light {
   background: #444444 !important;
}
.showMessages,
.update {
  width: 15vw;
}
#settings {
  float: left;
  margin-left: 150px;
  width: calc(100% - 200px);
  background: #1B1E24;
}
.flex {
  width: 45%;
}
.dialog-title {
  background: #1B1E24;
  color: white;
}
.dialog {
  background: #2D3038;
}
.dialog-footer {
  background: #1B1E24;
}
.application--wrap {
  background: #1B1E24;
}
</style>
