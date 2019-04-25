<template>
    <div class="card">
        <div class="card-header">
            Enrolments List
            <router-link :to="{ name:'enrolment.create' }" class="btn btn-sm btn-primary float-right">Create</router-link>
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover" v-if="enrolments.length != 0">
                <thead>
                    <tr>
                        <th scope="col">student</th>
                        <th scope="col">course</th>
                        <th scope="col">status</th>
                        <th scope="col">date</th>
                        <th scope="col">time</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="enrolment in enrolments" :key="enrolment.id">
                        <td>{{ enrolment.student.name }}</td>
                        <td>{{ enrolment.course.title }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td scope="row">{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <router-link :to="{ name:'enrolment.view', params: { id:enrolment.id }}" class="btn btn-primary">View</router-link>
                                <router-link :to="{ name:'enrolment.edit', params: { id:enrolment.id }}" class="btn btn-warning">Edit</router-link>
                                <button type="button" class="btn btn-danger" @click="deleteEnrolment(enrolment.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                    <!--/.Enrolments loop -->
                </tbody>
            </table>
        </div>
    </div>
    <!--/.Card -->
</template>

<script>
    export default {
        mounted() {
            let app = this
            let token = localStorage.getItem('token')

            axios.get('/api/enrolments', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(resp => {
                app.enrolments = resp.data;
            })
            .catch(errors => alert('Could not load enrolments'))
        },
        data() {
            return {
                enrolments: []
            }
        },
        methods: {
            deleteEnrolment(enrolmentId) {
                let app = this

                if(confirm("Are you sure you want to delete this enrolment - (id = " + enrolmentId + ")?")) {
                    let token = localStorage.getItem('token')

                    axios.delete('/api/enrolments/' + enrolmentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(resp => {
                       let index = app.enrolments.findIndex(enrolment => {
                           return enrolment.id == enrolmentId
                       })
                       app.enrolments.splice(index, 1)
                    })
                    .catch(error => alert("Could not delete enrolment"))
                }
            }
        }
    }
</script>
