<template>
  <div class="wrapper">
    <SiteHeader></SiteHeader>
    <Menu></Menu>
    <div class="Main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu';
import SiteHeader from './components/SiteHeader';

export default {
  name: 'App',
  components: {
    Menu,
    SiteHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper 
{
  display: grid;
  grid-template-columns: 250px 4fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "Header Header"
    "Menu Main";
  width: 100vw;
  height: 100vh;
}

.SiteHeader
{
	grid-area: Header; 
	background-color: rgb(66, 32, 64);
	border: solid;
}

.SiteHeader>h1
{
  color: white;
}

.SiteHeader ul
{
  color: rgb(200,200,200);
}


.Menu 
{ 
	grid-area: Menu; 
	background-color: rgb(200, 200, 200);
  line-height: 25px;
	padding-left: 20px;
	padding-right: 20px;
	text-align: center;
	border: solid;
}

.Main 
{ 
	grid-area: Main; 
	background-color: rgb(230, 230, 230);
	padding: 20px;
	border: solid;
}

.CornerText
{
	text-align: right;
	font-size: 70%;
	padding-right: 10px;
}

.MainTop
{
	display: flex;
	flex-direction: row;
}

.MainTopText
{
	min-width: 650px;
	/*padding-right: 500px;*/
}

.MainTopImage
{
	width: 100%;
}
.MainTopImage img
{
	padding-left: 480px;
}

li
{
	list-style: none;
}

h1, h2, h3, h4
{
	text-align: center;
}

head, body
{
	margin: 0;
}
</style>
