
require('./bootstrap');
window.Vue = require('vue').default;

//import 
import Vue from 'vue'
import 'v-toaster/dist/v-toaster.css'

// scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

//notification toaster
import Toaster from 'v-toaster'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/message.vue').default);
const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        typing: '',
        numberOfUser :0
    }, watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.meesage
                });
        }
    }, methods: {
        send() {
            if (this.message.length != 0) {
                this.chat.message.push(this.message);
                this.chat.user.push('you');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
                axios.post('send', {
                    message: this.message,
                })
                    .then(response => {
                        console.log(response);
                        this.message = '';
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }, getTime() {
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.color.push('warning');
                this.chat.user.push(e.user);
                this.chat.time.push(this.getTime());
            })
            .listenForWhisper('typing', (e) => {

                if (e.name != '') {
                    this.typing = 'typing ...'
                } else {
                    this.typing = ''
                }
            })
            Echo.join('chat')
            .here((users) => {
                this.numberOfUser = users.length;
                console.log(users);
            })
            .joining((user) => {
                this.numberOfUser +=1;
                this.$toaster.success(user.name + "  انه متصل في المحادثة ");
                console.log(user.name);
            })
            .leaving((user) => {
                this.numberOfUser -=1;
                this.$toaster.error(user.name+ "  انه غادر المحادثة ")
                console.log(user.name);
            })
            .error((error) => {
                console.error(error);
            });
    }
});
