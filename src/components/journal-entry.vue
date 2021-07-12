<template>
  <div>
    <md-card md-with-hover>
            <md-card-content>
            {{getEntryTime}} - {{entry.text}}
            </md-card-content>
            <md-card-actions>
                <md-button class="md-accent md-raised" @click="deleted">Delete</md-button>
            </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'journal-entry',
  props:{
    entry: {type: Object},
  },

  data(){
      return{

      }
  },
    computed:{
        getEntryTime(){
          return this.entry.date.toLocaleTimeString();
      }

    },
  methods:{
      deleted(){
          this.$emit('deleted', this.entry.date)
      }

  }
}
</script>
<style scoped>
.md-card{
    margin: 10px;
}

</style>