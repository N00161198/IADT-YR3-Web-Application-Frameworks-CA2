
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import LoginComponent from './components/auth/LoginComponent.vue';
import UserHomeComponent from './components/home/UserHome.vue';

import CoursesIndex from './components/courses/CoursesIndex.vue';
import CourseCreate from './components/courses/CourseCreate.vue';
import CourseView from './components/courses/CourseView.vue';
import CourseEdit from './components/courses/CourseEdit.vue';

import EnrolmentsIndex from './components/enrolments/EnrolmentsIndex.vue';
import EnrolmentView from './components/enrolments/EnrolmentView.vue';
import EnrolmentCreate from './components/enrolments/EnrolmentCreate.vue';
import EnrolmentEdit from './components/enrolments/EnrolmentEdit.vue';


// Routes
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {
            default: LoginComponent
        },
        name: 'login'
    },
    {
        path: '/home',
        name: 'home',
        component: UserHomeComponent,
        children: [
            {
                path: 'courses',
                name: 'courses',
                component: CoursesIndex
            },
            {
                path: 'courses/create',
                name: 'course.create',
                component: CourseCreate,
            },
            {
                path: 'courses/:id',
                name: 'courses.view',
                component: CourseView
            },
            {
                path: 'courses/:id/edit',
                name: 'course.edit',
                component: CourseEdit
            },
            {
                path: 'enrolments',
                name: 'enrolments',
                component: EnrolmentsIndex,
            },
            {
                path: 'enrolments/create',
                name: 'enrolment.create',
                component: EnrolmentCreate,
            },
            {
                path: 'enrolments/:id',
                name: 'enrolment.view',
                component: EnrolmentView
            },
            {
                path: 'enrolments/:id/edit',
                name: 'enrolment.edit',
                component: EnrolmentEdit
            },
        ]
    }
];

// Configure Vue Router & Vue
const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router
});