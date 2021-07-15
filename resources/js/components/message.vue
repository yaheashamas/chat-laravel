<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot></li>
        <small class="badge badge-danger float-right">{{ time}}</small>     
        <small class="badge badge-secondary float-right">{{ user }}</small>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'time'
        ],
        computed:{
            className(){
                return 'list-group-item-'+this.color;

            },
            badgeClass(){
                return 'badge-'+this.color;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
