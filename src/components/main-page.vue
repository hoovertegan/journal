<template>
  <div class="main-page">
    <div class="header">
      <h1 v-if="!username">My Digital Journal</h1>
      <h1 v-else>{{username}}'s Journal</h1>
      <md-button class="md-icon-button md-raised md-primary" style="margin:auto" @click="openNewEntryDialog">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <!-- day panels  -->
    <day-panel v-for="panel in journalEntries" 
    :key="getDayDate(panel.day)" 
    :header="getDayDate(panel.day)" 
    :entries="panel.entries"
    @deleted="deletedEntry($event)"></day-panel>
    
    <!-- Dialog to Set Username -->
    <set-username-modal
      :open="usernameDialogOpen"
      @close="closeUsernameDialog"
      @submit="submitUsername($event)"
    ></set-username-modal>

    <!-- Dialog to create new entry -->
    <new-entry-modal
    :open=" newEntryDialogOpen"
    @cancel="closeNewEntryDialog"
    @save="saveNewEntry($event)"></new-entry-modal>
  </div>
</template>

<script>
import SetUsernameModal from "./set-username-dialog.vue";
import NewEntryModal from "./new-entry-dialog.vue";
import DayPanel from "./day-panel.vue"
import { getUserName, setName, createNewEntry, getAllJournalEntries, deleteEntry } from "./services.ts";

export default {
  name: "MainPage",
  components: {
    SetUsernameModal,
    NewEntryModal,
    DayPanel
  },

  data() {
    return {
      username: '',
      usernameDialogOpen: false,
      newEntryDialogOpen: false,
      journalEntries: [],
    };
  },
  beforeMount() {
     getUserName() ? this.username = getUserName() : this.openUsernameDialog();
     this.journalEntries = getAllJournalEntries();
    
  },

  methods: {
  getDayDate(date){
      return date.toDateString()
    }, 
    openUsernameDialog() {
      this.usernameDialogOpen = true;
    },

    closeUsernameDialog() {
      this.usernameDialogOpen = false;
    },

    submitUsername(username){
      setName(username);
      this.username = getUserName();
      this.closeUsernameDialog();
    },

    openNewEntryDialog() {
      this.newEntryDialogOpen = true;
    },

    closeNewEntryDialog() {
      this.newEntryDialogOpen = false;
    },

    saveNewEntry(entry){
      createNewEntry(entry);
      this.journalEntries = getAllJournalEntries()
      this.closeNewEntryDialog();
    },

    deletedEntry(key){
      deleteEntry(key);
      this.journalEntries = getAllJournalEntries()
    }
  },
};
</script>

<style>
h1{
  font-size: 3em;
  text-decoration: underline;
}
.header{
  display: flex;
  margin-bottom: 20px;
}
.add{
  margin: 25px;
}
.main-page{
  margin: 20px;
}
.md-dialog-container{
  padding: 20px !important;
}
</style>
