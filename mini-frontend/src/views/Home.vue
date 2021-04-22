<template>
  <div class="MainTop">
    <div class="MainTopText">
      <p>This website is made for the mini-project for TWSM 2021 at AAU, 6th semester Medialogy by:</p>
      <ul>
        <li>Thomas K. K. Kjeldsen</li>
        <li>Study No.: 20183944</li>
        <li>Email: <a href="mailto:tkjeld18@student.aau.dk">Tkjeld18@student.aau.dk</a></li>
        <li>Phone: <a href="tel:+4520770673">+45 20770673</a></li>
      </ul>
      <p>Documentation for this website can be found on github <a href="insert git hub link">here</a></p>
    </div>
    <div class="MainTopImage">
      <img src="SelfImage.PNG" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  async mounted() { 
    let res = await axios.get('http://localhost:4000/users');
    console.log(res.data);
  }
}
</script>
