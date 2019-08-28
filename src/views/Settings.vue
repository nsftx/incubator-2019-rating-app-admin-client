<template>
  <div id="settings">
    <v-app>
      <v-form ref="form">
        <v-container fluid>
          <h3 class="marginTop1"
            :class="{ marginTop2 : this.$parent.toggleNav }">Settings</h3>
          <v-divider
            class="divider"
            dark
          />
          <v-layout>
            <v-flex class="flex">
              <v-select
                v-model="activeSettings.emoticonsGroup.name"
                dark
                color="grey"
                label="Set active emotions"
                :items="emoticonNames"
                @change="updateEmoticonPreview"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                :rules="emotionsRules"
                v-model.number="activeSettings.emoticonNumber"
                dark
                color="grey"
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
              <label class="preview">Emotions preview</label>
              <v-icon
                v-for="emoticon in emoticonPreview"
                :key="emoticon.id"
                dark
                class="fa-2x fa-fw"
                :class="[emoticon.symbol]"
              />
            </v-flex>
            <v-flex></v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="flex">
              <v-select
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
                :rules="timeoutRules"
                v-model.number="activeSettings.messageTimeout"
                dark
                color="grey"
                label="Mesage timeout"
                hint="Can be from 1-10"
                persistent-hint
                type="number"
                min="1"
                max="10"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-dialog
              v-model="newMessageDialog"
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
                <v-form ref="message">
                  <v-card-text class="dialog">
                    <v-text-field
                    :rules="messageRules"
                    v-model="newMessage.text"
                    dark
                    color="@white"
                    label="Thank you message"
                    clearable
                  />
                  </v-card-text>
                </v-form>
                <v-card-actions class="dialog-footer">
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="newMessageDialog = false"
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
              @click="updateActiveSettings"
            >
              Confirm
            </v-btn>
            <h4 class="modified">
              Last modified by: {{ user.firstName }} {{ user.lastName }}
              at: {{ activeSettings.updatedAt.substr(0, 19) }}
            </h4>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>
<script>
import { some, find, cloneDeep } from 'lodash';

export default {
  data() {
    return {
      user: {},
      activeMessage: {},
      newMessageDialog: false,
      newMessage: {},
      emoticonPreview: [],
      emotionsRules: [
        v => v > 2 || 'Min value is 3',
        v => v < 6 || 'Max values is 5',
      ],
      timeoutRules: [
        v => v > 0 || 'Min value is 1',
        v => v < 11 || 'Max values is 10',
      ],
      messageRules: [
        v => (v && v.length > 2) || 'Min length is 3',
        v => (v && v.length < 121) || 'Max length is 120',
      ],
    };
  },
  created() {
    if (this.$store.getters.isLogged) {
      this.$store.dispatch('setUser');
      this.$store.dispatch('getEmoticons')
        .then(() => this.$store.dispatch('getActiveSettings'))
        .then(() => this.$store.dispatch('getThanksMessages'))
        .then(() => {
          this.activeMessage = find(this.messages, ['id', this.activeSettings.messageId]);
        });
    }
  },
  methods: {
    updateActiveSettings() {
      if (this.$refs.form.validate()) {
        this.activeSettings.userId = this.$store.getters.loggedUser.id;
        this.activeSettings.messageId = this.activeSettings.message.id;
        this.updateActiveEmoticons();
        this.$store.dispatch('updateSettings', this.activeSettings)
          .then(() => this.$store.dispatch('getActiveSettings'));
      } else {
        const message = 'Please enter valid settings';
        this.$store.dispatch('setMessage', { type: 'error', text: message });
      }
    },
    updateActiveEmoticons() {
      const activeEmoticons = find(this.emoticons, ['name', this.activeSettings.emoticonsGroup.name]);
      this.activeSettings.emoticonsGroupId = activeEmoticons.id;
    },
    createNewMessage() {
      if (!this.isMessageExisting(this.newMessage) && this.$refs.message.validate()) {
        this.$store.dispatch('createThanksMessage', this.newMessage)
          .then(() => this.$store.dispatch('getThanksMessages'));
        this.newMessageDialog = false;
      } else {
        const message = 'Please enter valid message';
        this.$store.dispatch('setMessage', { type: 'error', text: message });
      }
    },
    isMessageExisting(message) {
      return some(this.messages, ['text', message.text]);
    },
    updateEmoticonPreview() {
      const selectedEmoticons = find(this.emoticons, ['name', this.activeSettings.emoticonsGroup.name]).emoticons;
      this.emoticonPreview = cloneDeep(selectedEmoticons);
      if (this.activeSettings.emoticonNumber === 3) {
        this.emoticonPreview.splice(3, 1);
        this.emoticonPreview.splice(1, 1);
      } else if (this.activeSettings.emoticonNumber === 4) {
        this.emoticonPreview.splice(2, 1);
      }
    },
    setSettingsModifiedBy() {
      this.$store.dispatch('getUserById', this.activeSettings.userId)
        .then((response) => {
          this.user = response.data.data;
        });
    },
  },
  computed: {
    activeSettings() {
      return this.$store.getters.activeSettings;
    },
    emoticons() {
      return this.$store.getters.emoticons;
    },
    messages() {
      return this.$store.getters.thanksMessages;
    },
    emoticonNames() {
      return this.$store.getters.emoticonGroupNames;
    },
  },
  watch: {
    activeSettings: {
      handler() {
        this.setSettingsModifiedBy();
        this.updateEmoticonPreview();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
@import '../styles/main.less';
h3 {
  text-align: left;
  font-size: 2vw;
}
.divider {
  margin: 20px 0;
}
.v-list__tile__title {
   color: @white !important;
}
.v-list.theme--light {
   background: @dark-grey !important;
}
.update {
  width: 20vw;
}
#settings {
  float: left;
  margin-left: 150px;
  width: calc(100% - 200px);
}
.flex {
  width: 45%;
}
.preview {
  float: left;
}
.dialog-title {
  background: @cinder;
  color: @white;
}
.dialog {
  background: @dark-grey;
}
.dialog-footer {
  background: @cinder;
}
.application--wrap {
  background: @cinder;
}
.modified {
  text-align: right;
  color: @silver;
}
@media only screen and (max-width: 1024px) {
  .layout{
    flex: none;
    display:block;
    margin: 0 auto;
  }
  .flex.flex {
    width:100%;
    float: none;
  }
h3 {
  text-align: center;
  font-size: 5vw;
}
.container.fluid {
    width: 100%;
    height:100%;
    left: 0;
    position: fixed;
    overflow-y: scroll;
}
.marginTop1 {
  margin-top:50px;
}
}
</style>
