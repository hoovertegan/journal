<template>
  <div>
    <md-card>
            <md-card-header>
                <div class="md-title">{{header}}</div>
            </md-card-header>

            <md-card-content>
            <journal-entry
            v-for="entry in entries"
            :key="JSON.stringify(entry.date)"
            :entry="entry"
            @deleted="entryDeleted($event)"></journal-entry>
            </md-card-content>
    </md-card>
  </div>
</template>

<script>
import JournalEntry from "./journal-entry.vue";

export default {
  name: 'day-panel',
  components:{
      JournalEntry,
  },
  props:{
      header: {type: String, default: 'EMPTY'},
      entries: {type: Array, default(){[]}}
  }, 

  data(){
      return{

      }
  },

  methods:{
      entryDeleted(key){
          this.$emit('deleted', key);
      }

  }
}
</script>
<style scoped>
.md-card-header{
    text-align: left;
}
.md-card{
    margin: 10px;
}
.md-dialog-container.md-theme-default{
  padding: 20px;
}
</style>