<template>
  <div id="settings">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    />
    <v-app>
      <v-form>
        <v-container fluid>
          <h3>Settings</h3>
          <v-divider class="divider" dark />
          <v-layout>
            <v-flex class="flex">
              <label style="float:left;">Emotions preview</label> <br/>
              <i
              class="fa-2x"
                v-for="emoticon in emoticons.emoticons"
                :key="emoticon.id"
                :class="[emoticon.symbol]"
              ></i>
            </v-flex>

            <v-flex class="flex">
              <v-text-field
                dark
                color="grey"
                v-model="activeSettings.emoticonNumber"
                :rules="emotionsRules"
                label="Number of emotions"
                hint="Enter number from 3-5"
                persistent-hint
                type="number"
                min="3"
                max="5"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="flex">
              <v-text-field
                v-show="!showMessages"
                dark
                color="grey"
                v-model="activeMessage.text"
                label="Thank you message"
                clearable
              ></v-text-field>
              <v-select
                v-show="showMessages"
                dark
                color="grey"
                v-model="activeSettings.message"
                :items="messages"
                return-object
                hide-selected
                label="Thank you message"
              ></v-select>
            </v-flex>

            <v-flex class="flex">
              <v-text-field
                dark
                color="grey"
                v-model="activeSettings.messageTimeout"
                :rules="timeoutRules"
                label="Mesage timeout"
                hint="Can be from 0-10"
                persistent-hint
                type="number"
                min="1"
                max="10"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-btn
                class="showMessages"
                color="secondary"
                @click="showExistingMessages"
              >{{messagesBtnText}}</v-btn>
              <br />
              <v-btn class="update" color="secondary" @click="updateActiveSettings">Confirm</v-btn>
            </v-flex>
            <v-flex></v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  data() {
    return {
      activeSettings: {},
      messages: [],
      activeMessage: {},
      showMessages: false,
      emoticons: {},
      messagesBtnText: "Show all messages",
      emotionsRules: [
        v => v > 2 || "Min value is 3",
        v => v < 6 || "Max value is 5"
      ],
      timeoutRules: [
        v => !!v || "Message timeout is required",
        v => v > 0 || "Min value is 1",
        v => v < 11 || "Max values is 10"
      ]
    };
  },
  methods: {
    validateSettings() {
      return (
        this.activeSettings.message.length > 0 &&
        this.activeSettings.message.length < 121 &&
        this.activeSettings.emotionsNum > 2 &&
        this.activeSettings.emotionsNum < 6 &&
        this.activeSettings.messageTimeout > 0 &&
        this.activeSettings.messageTimeout < 11
      );
    },
    getActiveSettings() {
      ApiService.getActiveSettings().then(response => {
        this.activeSettings = response.data;
        this.activeMessage = this.activeSettings.message;
      });
    },
    updateActiveSettings() {
      if (this.showMessages) {
        this.activeSettings.messageId = this.activeSettings.message.id;
        ApiService.updateActiveSettings(
          this.activeSettings,
          this.activeSettings.id
        );
      } else if (!this.isMessageExisting(this.activeMessage.text)) {
        this.createNewMessage(this.activeSettings.id, this.activeMessage);
      }
    },
    isMessageExisting(message) {
      return _.some(this.messages, ["text", this.activeMessage.text]);
    },
    getThanksMessages() {
      ApiService.getThanksMessages().then(response => {
        this.messages = response.data;
      });
    },
    createNewMessage(settingsId, newMessage) {
      ApiService.createNewMessage(settingsId, newMessage);
    },
    showExistingMessages() {
      this.showMessages = !this.showMessages;
      this.messagesBtnText = this.showMessages
        ? "Create new message"
        : "Show all messages";
    },
    getEmoticonGroup() {
      ApiService.getEmoticonGroup().then(response => {
        this.emoticons = response.data[0];
      });
    }
  },
  created() {
    this.getActiveSettings();
    this.getThanksMessages();
    this.getEmoticonGroup();
  }
};
</script>

<style>
.settings {
  width: 80%;
  background: rgb(18, 20, 22);
}
h3 {
  text-align: left;
  font-size: 2vw;
}
.divider {
  margin: 20px 0;
}
.showMessages,
.update {
  width: 15vw;
}
#settings {
  float: left;
  margin-left: 150px;
  width: calc(100% - 200px);
  background: rgb(18, 20, 22);
}
.flex {
  width: 45%;
}
.application--wrap {
  background: rgb(18, 20, 22);
}
</style>
