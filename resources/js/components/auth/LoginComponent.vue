<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" class="form-control" v-model="form.email" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" class="form-control" v-model="form.password" />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>

                        <br /><br /><span class="badge badge-danger" v-text="form.errors.getOne('error')" v-if="form.errors.has('error')"></span>
                    </form>
                </div>
            </div>
            <!--/.Card -->
        </div>
    </div>
    <!--/.Row -->
</template>

<script>
    import Form from '../../classes/Form.js'

    export default {
        mounted() {
            // Redirect to home if the user is already logged in
            let app = this
            if (localStorage.getItem('token') !== null) {
                app.$router.replace({name: 'home'});
            }
        },
        data() {
            return {
                form: new Form('/login', 'post', false, {
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            onSubmit() {
                let app = this

                this.form.submit()
                    .then(data => {
                        localStorage.setItem('token', data.token)
                        app.$router.push({name: 'home'})
                    })
                    .catch(errors => console.log(errors))
            }
        }
    }
</script>
