import 'bootstrap/dist/css/bootstrap.min.css';

let socket = new WebSocket('wss://ahj-http-yanach.herokuapp.com/');

socket.onopen = () => {
  console.log('[open] Соединение установлено');
};

// eslint-disable-next-line no-new, no-undef
new Vue({
  el: '#app',
  data: {
    nickNames: [],
    nick: '',
    showModal: true,
    nickError: '',
    message: '',
    messages: [],
  },
  created() {
    socket.onmessage = (event) => {
      const { successNick, nickNames, newMessage } = JSON.parse(event.data);

      if (successNick === false) {
        this.nickError = true;
      }
      if (successNick === true) {
        this.nickError = false;
        this.showModal = false;
      }

      if (nickNames) {
        this.nickNames = nickNames;
      }

      if (newMessage) {
        this.messages = [...this.messages, ...newMessage];
      }
    };
  },
  methods: {
    processInput() {
      if (this.nick) {
        socket.send(JSON.stringify({ nick: this.nick }));
      }
    },
    sendMessage() {
      if (this.message) {
        socket.send(JSON.stringify({ message: this.message }));
        this.message = '';
      }
    },
  },
  filters: {
    date(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();

      return `${hour}:${minutes} ${day}.${month}.${year}`;
    },
  },
});
