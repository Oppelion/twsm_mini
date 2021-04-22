<template>
  <div class="MainTop">
    <div class="square-wrapper">
      <p>Click on the square once it turns yellow.</p><br>
      <div
        class="square"
        :class="startOfRound != null ? 'interact' : ''"
        @click.prevent="onclick"
      >
      </div>
      <button v-if="!started" @click.prevent="startGame">Start game</button>
    </div>
    <div class="highscore">
      <h2>
        Highscore
      </h2>

      <span v-if="ended && !sentRequest">
        You have scored {{ getAvg(userDelays) }}!
        <input v-model="username" type="text" placeholder="Your Username">
        <button @click.prevent="submit">Submit highscore</button>
      </span>

      <ul>
        <li v-for="score in sortedHighscore" :key="score.id">
          <strong>{{ score.name }}</strong> got <i>{{ score.highscore }}</i>ms
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Game',
  data() {
    return {
      timesBetweenClicks: [
        this.random(),
        this.random(),
        this.random(),
        this.random(),
        this.random()
      ],
      userDelays: [],
      startOfRound: null,
      started: false,
      ended: false,
      username: '',
      sentRequest: false
    };
  },
  computed: {
    ...mapGetters(['sortedHighscore'])
  },

  methods: {
    random (min = 1000, max = 2600) {
      const num = Math.random() * (max - min) + min;

      return Math.floor(num);
    },
    submit() {
      this.sentRequest = true;
      const highscore = this.getAvg(this.userDelays);

      this.$store.dispatch('addHighscore', {
        name: this.username,
        highscore
      }).then(() => {
        // for instant update
        this.$store.dispatch('fetchData');
      })

    },
    startGame() {
      this.started = true;
      if(this.timesBetweenClicks.length > 0) {
        setTimeout(this.startRound, this.timesBetweenClicks.shift())
      } else {
        this.ended = true;
      }

    },

    startRound() {
      this.startOfRound = Date.now();
    },

    onclick() {
      if(!this.startOfRound) {
        return;
      }

      const now = Date.now();
      const difference = now - this.startOfRound;

      // User cheated and spamclicked
      if(difference < 100) {
        return;
      }

      this.userDelays.push(difference);
      this.startOfRound = null;
      this.startGame();
    },

    getAvg(arr) {
      const avg = arr.reduce((acc, c) => acc + c, 0);
      return avg / arr.length;
    }
  }
}


/*Add game here*/
</script>

<style scoped>
.square-wrapper 
{
  display: flex;
  flex-direction: column;
  padding-right: 100px;
}
  
.square
{
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
  border: 2px solid black;
  background-color: red;
}

.interact 
{
  background: yellow
}

p
{
  text-align: center;
  margin: auto;
}

.MainTop
{
  margin: auto;
  width: 50%;
  padding: 10px;
}

.highscore
{
  margin: auto;
  min-width: 500px;
}
</style>