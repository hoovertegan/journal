<template>
  <div>
    <md-dialog :md-active.sync="open">
      <md-dialog-title>What is Your Name?</md-dialog-title>
      <md-field>
        <md-input v-model="username"></md-input>
      </md-field>
      <md-dialog-actions>
        <md-button @click="close">Close</md-button>
        <md-button @click="submit" class="md-raised md-primary">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'set-username-modal',
  props:{
    open: {type: Boolean, default: false}
  },
  data(){
    return{
      username: ''
    }
  },

  methods:{
    close(){
      this.$emit('close')
    },
    submit(){
      this.username.trim().length > 0 ? this.$emit('submit', this.username) : this.close();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
