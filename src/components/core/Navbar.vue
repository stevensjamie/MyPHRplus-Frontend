<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-container>
                <template v-if="user.role == 'admin'">
                  <b-navbar-brand to="/admin/dashboard">MyPHR+ Admin</b-navbar-brand>
                </template>
                <template v-else>
                  <b-navbar-brand to="/dashboard">MyPHR+</b-navbar-brand>
                </template>
                <b-navbar-nav>
                  <template v-if="user.role == 'Patient'">
                     <b-nav-item to="/myrecords">MyRecords</b-nav-item>
                     <b-nav-item to="/diary">Diary</b-nav-item> 
                  </template>
                  <template v-else-if="user.role == 'DR'">
                    <b-nav-item to="/myPatients">My Patients</b-nav-item>
                    <b-nav-item to="/myFiles">My Files</b-nav-item>
                  </template>
                  <template v-else-if="user.role =='DP'">
                    <b-nav-item to="/files">Upload</b-nav-item>
                    <b-nav-item to="/registerDR">Add DR</b-nav-item>
                    <b-nav-item to="/editAttributes">Edit Attributes</b-nav-item>
                  </template>
                  <template v-else-if="user.role =='admin'">
                    <b-nav-item to="/admin/registerDP">Add DP</b-nav-item>
                  </template>
                </b-navbar-nav>
                 <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                      <b-nav-item-dropdown right>
                          <template slot="button-content"><em>{{user.userName}}</em></template>
                          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                          <b-dropdown-item to="/" @click.prevent="signOut">Sign Out</b-dropdown-item>
                      </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-container>
        </b-navbar>
    </div>  
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import 'firebase/auth';

export default {
  computed: {
    ...mapGetters({
      user: "user" // maps `this.user` to `this.$store.getters.user`
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut();
    }
  }
};
</script>