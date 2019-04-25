<template>
    <div class="row">
        <div class="col-md-4">
            <div class="list-group">
                <router-link :to="{ name: 'home' }" class="list-group-item list-group-item-action">Home</router-link>
                <router-link :to="{ name: 'courses' }" class="list-group-item list-group-item-action">Courses</router-link>
                <router-link :to="{ name: 'enrolments' }" class="list-group-item list-group-item-action">Enrolments</router-link>
                <button @click="logout()" class="list-group-item list-group-item-action">Logout</button>
            </div>
        </div>
        <div class="col-md-8">
            <router-view></router-view>
        </div>
    </div>
    <!--/.Row -->
</template>

<script>
    export default {
        mounted() {
            // Redirect to enrolments
            this.$router.replace({name: 'enrolments'});
        },
        methods: {
            logout() {
                let app = this
                let token = localStorage.removeItem('token')
                app.$router.push({ name: 'login' })
            }
        }
    }
</script>
