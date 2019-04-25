<template>
    <div class="card">
        <div class="card-header">
            Courses List
            <router-link :to="{ name:'course.create' }" class="btn btn-sm btn-primary float-right">Create</router-link>
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover" v-if="courses.length != 0">
                <thead>
                    <tr>
                        <th scope="col">#code</th>
                        <th scope="col">Title</th>
                        <th scope="col">Points</th>
                        <th scope="col">Level</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course.id">
                        <th scope="row">{{ course.code }}</th>
                        <td>{{ course.title }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <router-link :to="{ name:'courses.view', params: { id:course.id }}" class="btn btn-primary">View</router-link>
                                <router-link :to="{ name:'course.edit', params: { id:course.id }}" class="btn btn-warning">Edit</router-link>
                                <button type="button" class="btn btn-danger" @click="deleteCourse(course.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                    <!--/.Courses Loop -->
                </tbody>
            </table>
        </div>
        <!--/.Card Body -->
    </div>
    <!--/.Card -->
</template>

<script>
    export default {
        mounted() {
            let app = this
            let token = localStorage.getItem('token')

            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                app.courses = resp.data
            })
            .catch(function (resp) {
                alert('Could not load courses')
            })
        },
        data() {
            return {
                courses: []
            }
        },
        methods: {
            deleteCourse(courseId) {
                let app = this

                if(confirm("Are you sure you want to delete this course - (id = " + courseId + ")?")) {
                    let token = localStorage.getItem('token')

                    axios.delete('/api/courses/' + courseId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(resp => {
                       let index = app.courses.findIndex(course => {
                           return course.id == courseId
                       })
                       app.courses.splice(index, 1)
                    })
                    .catch(error => alert("Could not delete course"))
                }
            }
        }
    }
</script>
