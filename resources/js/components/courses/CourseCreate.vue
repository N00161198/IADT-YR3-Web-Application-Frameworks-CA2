<template>
    <div class="card">
        <div class="card-header">
            Create Enrolment
        </div>

        <div class="card-body">
            <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
                <div class="form-group">
                    <label for="title">Title</label>

                    <input type="text" name="title" class="form-control" v-model="form.title" />

                    <span class="badge badge-danger" v-text="form.errors.get('title')" v-if="form.errors.has('title')"></span>
                </div>
                <div class="form-group">
                    <label for="code">Code</label>

                    <input type="text" name="code" class="form-control" v-model="form.code" />

                    <span class="badge badge-danger" v-text="form.errors.get('code')" v-if="form.errors.has('code')"></span>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>

                    <textarea v-model="form.description" name="description" class="form-control"></textarea>

                    <span class="badge badge-danger" v-text="form.errors.get('description')" v-if="form.errors.has('description')"></span>
                </div>
                <div class="form-group">
                    <label for="points">Points</label>

                    <input type="number" name="points" class="form-control" v-model="form.points" />

                    <span class="badge badge-danger" v-text="form.errors.get('points')" v-if="form.errors.has('points')"></span>
                </div>
                <div class="form-group">
                    <label for="level">Level</label>

                    <input type="number" name="level" class="form-control" v-model="form.level" />

                    <span class="badge badge-danger" v-text="form.errors.get('level')" v-if="form.errors.has('level')"></span>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <!--/.Card Body -->
    </div>
    <!--/.Card -->
</template>

<script>
    import Form from '../../classes/Form.js'

    export default {
        mounted() {
            let app = this
            let token = localStorage.getItem('token')
        },
        data() {
            return {
                form: new Form('/courses', 'post', true, {
                    title: '',
                    code: '',
                    description: '',
                    points: '',
                    level: ''
                }),
            }
        },
        methods: {
            onSubmit() {
                let app = this

                this.form.submit()
                    .then(data => {
                        app.$router.push({name: 'courses'})
                    })
                    .catch(errors => console.log(errors))
            }
        }
    }
</script>
