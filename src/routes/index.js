import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/core/Login';
import Register from '../components/core/Register';
import Dashboard from '../components/core/Dashboard';
import Welcome from '../components/core/Welcome';
import Profile from '../components/core/Profile';
import MyRecords from '../components/patient/MyRecords';
import Diary from '../components/patient/Diary';
import AdminDash from '../components/admin/AdminDash';
import registerDP from '../components/admin/registerDP';
import Error404 from '../components/core/Error404';
import registerDR from '../components/DP/registerDR';
import myPatients from '../components/DR/myPatients';
import myFiles from '../components/DR/myFiles';
import files from '../components/DP/files';
import editAttributes from '../components/DP/editAttributes'

import store from '@/store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta:
            {
                requiresAuth: true, adminAuth: false
            }
        },
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta:
            {
                requiresAuth: true, adminAuth: false
            }
        },
        {
            path: '/myrecords',
            name: 'MyRecords',
            component: MyRecords,
            meta:
            {
                requiresAuth: true, adminAuth: false
            }
        },
        {
            path: '/diary',
            name: 'Diary',
            component: Diary,
            meta:
            {
                requiresAuth: true, adminAuth: false
            }
        },
        {
            path: '/admin/Dashboard',
            name: 'Admin Dashboard',
            component: AdminDash,
            meta:
            {
                requiresAuth: true, adminAuth: true
            }
        },
        {
            path: '/admin/registerDP',
            name: 'Register DP',
            component: registerDP,
            meta: {
                requiresAuth: true, adminAuth: true
            }
        },
        {
            path: '/registerDR',
            name: 'Register DR',
            component: registerDR,
            meta: {
                requiresAuth: true, adminAuth: false
            }
        },{
            path: '/myPatients',
            name: 'My Patients',
            component: myPatients,
            meta : {
                requiresAuth: true, adminAuth: false
            }
        },{
            path: '/myFiles',
            name: 'My Files',
            component: myFiles,
            meta: {
                requiresAuth: true, adminAuth: false
            }
        },{
            path: '/files',
            name: 'Files',
            component: files,
            meta: {
                requiresAuth: true, adminAuth: false
            }
        },{
            path: '/editAttributes',
            name: 'Edit Attributes',
            component: editAttributes,
            meta: {
                requiresAuth: true, adminAuth: false
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error 404',
            component: Error404
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) { //Does request need auth
        var user = store.getters.user;
        if (user.loggedIn) {
            var role = user.role;
            if (to.meta.adminAuth) { //Does request need admin auth
                if (role == "admin") {
                    next();
                }
                else {
                    next({ name: 'Error 404' });
                }
            } else { //Request doesn't need admin auth
                next();
            }
        }
        else {
            next({ name: 'Welcome' });
        }
    }
    else {
        next();
    }
});

export default router