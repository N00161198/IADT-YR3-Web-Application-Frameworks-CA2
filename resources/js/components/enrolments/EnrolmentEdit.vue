<template>
    <div class="card">
        <div class="card-header">
            Create Enrolment
        </div>

        <div class="card-body">
            <form @submit.prevent="onSubmit">
                <div class="form-group">

                    <label for="student">Student</label>

                    <select class="form-control" v-model="form.student_id">
                        <option v-for="student in students" :value="student.id" :key="student.id">
                            {{ student.name }}
                        </option>
                    </select>

                    <span class="badge badge-danger" v-text="form.errors.get('student_id')" v-if="form.errors.has('student_id')"></span>
                </div>
                <div class="form-group">
                    <label for="course">Course</label>

                    <select class="form-control" v-model="form.course_id">
                        <option v-for="course in courses" :value="course.id" :key="course.id">
                            {{ course.title }}
                        </option>
                    </select>
                    
                    <span class="badge badge-danger" v-text="form.errors.get('course_id')" v-if="form.errors.has('course_id')"></span>
                </div>
                <div class="form-group">
                    <label for="date">Date</label>

                    <input type="date" name="date" class="form-control" v-model="form.date" />

                    <span class="badge badge-danger" v-text="form.errors.get('date')" v-if="form.errors.has('date')"></span>
                </div>
                <div class="form-group">
                    <label for="time">Time</label>

                    <input type="time" name="time" class="form-control" v-model="form.time" />

                    <span class="badge badge-danger" v-text="form.errors.get('time')" v-if="form.errors.has('time')"></span>
                </div>
                <div class="form-group">
                    <label for="student">Status</label>

                    <div class="form-check">
                        <input class="form-check-input" id="registered" type="radio" value="registered" v-model="form.status">
                        <label class="form-check-label" for="registered">
                            Registered
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="attending" type="radio" value="attending" v-model="form.status">
                        <label class="form-check-label" for="attending">
                            Attending
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="deferred" type="radio" value="deferred" v-model="form.status">
                        <label class="form-check-label" for="deferred">
                            Deferred
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="withdrawn" type="radio" value="withdrawn" v-model="form.status">
                        <label class="form-check-label" for="withdrawn">
                            Withdrawn
                        </label>
                    </div>

                    <span class="badge badge-danger" v-text="form.errors.get('status')" v-if="form.errors.has('status')"></span>
                </div>

                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
    <!--/.Card -->
</template>

<script>
    import Form from '../../classes/Form.js'

    export default {
        mounted() {
            let app = this
            let token = localStorage.getItem('token')
            let id = app.$route.params.id

            // Load Students
            axios.get('/api/students', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(resp => {
                app.students = resp.data
            })
            .catch(errors => alert('Could not load students'))

            // Load Courses
            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(resp => {
                app.courses = resp.data
            })
            .catch(errors => alert('Could not load courses'))

            // Load individual enrolment
            axios.get('/api/enrolments/' + id, {
                headers: { Authorization: "Bearer " + token }
            })
            .then(resp => {
                app.form.student_id = resp.data.student_id
                app.form.course_id = resp.data.course_id
                app.form.status = resp.data.status
                app.form.date = resp.data.date
                app.form.time = resp.data.time
            })
            .catch(errors => alert('Could not load courses'))
        },
        data() {
            return {
                form: new Form('/enrolments/' + this.$route.params.id, 'put', true, {
                    student_id: '',
                    course_id: '',
                    status: '',
                    date: '',
                    time: ''
                }),
                students: [],
                courses: []
            }
        },
        methods: {
            onSubmit() {
                let app = this

                this.form.submit()
                    .then(data => {
                        app.$router.push({name: 'enrolments'})
                    })
                    .catch(errors => console.log(errors))
            }
        }
    }
</script>
