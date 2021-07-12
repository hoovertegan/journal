<template>
  <div class="new">
    <md-dialog :md-active.sync="open" :md-click-outside-to-close="false">
      <md-dialog-title>New Journal Entry</md-dialog-title>
      <md-datepicker v-model="date">
        <label>Select date</label>
      </md-datepicker>
       <div class="time">
        <md-field>
        <label>Hour</label>
        <md-select v-model="hour">
          <md-option v-for="hour in hours" :key="hour" :value="hour">{{hour}}</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Minutes</label>
        <md-select v-model="minute">
          <md-option v-for="minute in minutes" :key="minute" :value="minute">{{minute}}</md-option>
        </md-select>
      </md-field>
      <div>
        <md-radio v-model="timeOfDay" value="AM">AM</md-radio>
        <md-radio v-model="timeOfDay" value="PM">PM</md-radio>  
      </div>
      </div>
     
      <md-field>
        <label>Journal Entry</label>
        <md-textarea v-model="entry"></md-textarea>
      </md-field>
      <md-dialog-actions>
        <md-button @click="cancel">Cancel</md-button>
        <md-button @click="save">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "new-entry-modal",
  props: {
    open: { type: Boolean, default: false },
  },
  computed: {
    minutes() {
      let minutes = [];
      for (let i = 0; i <= 59; i++) {
        minutes.push(i);
      }
      return minutes;
    },
    hours() {
      let hours = [];
      for (let i = 0; i <= 12; i++) {
        hours.push(i);
      }
      return hours;
    },
  },
  data() {
    return {
      entry: "",
      date: "",
      timeOfDay: "",
      minute: "",
      hour: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.entry = "";
    },
    reset() {
      this.entry= "";
      this.date= "";
      this.timeOfDay= "";
      this.minute= "";
      this.hour= "";
    },
    save() {
      let response ={
        text: this.entry,
        date: this.date ? this.createDateObject() : undefined
      }
      this.$emit("save", response);
      this.reset();
    },
    createDateObject() {
      let dateArray = this.date.split("-");
      let date = new Date(parseInt(dateArray[0]), parseInt(dateArray[1])-1, parseInt(dateArray[2]), this.timeOfDay == "PM" ? this?.hour + 12 : this?.hour, this?.minute, 0, 0);
      return date;
    },
  },
};
</script>
<style scoped>
.time{
  display:flex;
  margin: 10px
}
.md-radio{
  margin: 5px 10px;
}

</style>