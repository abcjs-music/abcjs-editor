<template>
	<span class="animated-button">

		<button class="animate" v-if="el === 'button'" @click="$emit('click')">
		{{ label }}
		</button>

		<a class="animate" v-if="el === 'a'" :download="download" :href="href">
		{{ label }}
		</a>

		<check-box class="animate" v-if="el === 'checkbox'" :label="label" :id="id" :action="action"></check-box>

	</span>
</template>

<script>
import CheckBox from "./CheckBox";
export default {
	name: "animated-button",
	components: {CheckBox},
	props: {
		label: {
			type: String,
			required: true
		},
		el: {
			type: String,
			required: true
		},
		download: {
			type: String,
			required: false,
			default: ""
		},
		href: {
			type: String,
			required: false,
			default: ""
		},
		id: {
			type: String,
			required: false,
			default: ""
		},
		action: {
			type: String,
			required: false,
			default: ""
		},
	},
}
</script>

<style scoped>
.animate {
	background: white;
	color: black;
	border: 1px solid #0fb4e7;
	border-radius: 4px;
	padding: 10px;
	font-size: 1em;
	text-align: left;
	text-decoration: none;
	transition: .6s;
	overflow: hidden;
	margin-bottom: 5px;
	position: relative;
	width: 100%;
	display: inline-block;
}
.animate.check-box {
	padding: 0;
}

.animate:before{
	 content: '';
	 display: block;
	 position: absolute;
	 background: rgba(255,255,255,0.5);
	 width: 60px;
	 height: 100%;
	 left: 0;
	 top: 0;
	 opacity: .5;
	 filter: blur(30px);
	 transform: translateX(-100px)  skewX(-15deg);
 }
.animate:after{
	 content: '';
	 display: block;
	 position: absolute;
	 background: rgba(255,255,255,0.2);
	 width: 30px;
	 height: 100%;
	 left: 30px;
	 top: 0;
	 opacity: 0;
	 filter: blur(5px);
	 transform: translateX(-100px) skewX(-15deg);
 }
.animate:hover {
	background: #0fb4e7;
	color: white;
	cursor: pointer;
}
.animate:hover:before{
	 transform: translateX(300px)  skewX(-15deg);
	 opacity: 0.6;
	 transition: .7s;
 }
.animate:hover:after{
	 transform: translateX(300px) skewX(-15deg);
	 opacity: 1;
	 transition: .7s;
 }
</style>

<style>
.animated-button .check-box label {
	background-color: transparent;
	padding: 7px 7px 7px 32px;
	transition: color .5s ease-in;
}
.animated-button .check-box:hover label {
	color: white;
}
.animated-button .check-box label:before {
	border: 1px solid #606878;
	transition: border-color .5s ease-in;
}
.animated-button .check-box:hover label:before {
	border: 1px solid white;
}
</style>
