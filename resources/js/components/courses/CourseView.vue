<template>
    <div class="card">
        <div class="card-header">
            Course
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#code</th>
                        <th scope="col">Title</th>
                        <th scope="col">Points</th>
                        <th scope="col">Level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{{ course.code }}</th>
                        <td>{{ course.title }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h2>Description</h2>
            <p>{{ course.description }}</p>
        </div>
    </div>
    <!--/.Card -->
</template>

<script>
    export default {
        mounted() {
            let app = this
            let id = app.$route.params.id
            let token = localStorage.getItem('token')

            axios.get('/api/courses/' + id, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(function (resp) {
                    app.course = resp.data;
                })
                .catch(function (resp) {
                    alert('Could not load course');
                });
        },
        data() {
            return {
                course: {
                    title: '',
                    code: '',
                    description: '',
                    points: '',
                    level: '',
                }
            }
        }
    }
</script>
