(()=>{"use strict";let s=new WebSocket("wss://ahj-http-yanach.herokuapp.com/");s.onopen=()=>{console.log("[open] Соединение установлено")},new Vue({el:"#app",data:{nickNames:[],nick:"",showModal:!0,nickError:"",message:"",messages:[]},created(){s.onmessage=s=>{const{successNick:e,nickNames:t,newMessage:a}=JSON.parse(s.data);!1===e&&(this.nickError=!0),!0===e&&(this.nickError=!1,this.showModal=!1),t&&(this.nickNames=t),a&&(this.messages=[...this.messages,...a])}},methods:{processInput(){this.nick&&s.send(JSON.stringify({nick:this.nick}))},sendMessage(){this.message&&(s.send(JSON.stringify({message:this.message})),this.message="")}},filters:{date(s){const e=new Date(s),t=e.getFullYear(),a=e.getMonth(),n=e.getDate();return`${e.getHours()}:${e.getMinutes()} ${n}.${a}.${t}`}}})})();