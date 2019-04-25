<template>
    <div class="card">
        <div class="card-header">
            Enrolment for {{ enrolment.student.name }}
        </div>
        <div class="card-body">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">student</th>
                        <th scope="col">course</th>
                        <th scope="col">status</th>
                        <th scope="col">date</th>
                        <th scope="col">time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ enrolment.student.name }}</td>
                        <td>{{ enrolment.course.title }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td>{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                    </tr>
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
            let id = app.$route.params.id
            let token = localStorage.getItem('token')

            axios.get('/api/enrolments/' + id, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(resp => app.enrolment = resp.data)
                .catch(errors => alert('Could not load enrolment'));
        },
        data() {
            return {
                enrolment: {
                    date: '',
                    time: '',
                    status: '',
                    course: {},
                    student: {},
                }
            }
        }
    }
</script>
