<template>
  <q-layout view="lHh Lpr lFf">
    <Header  />
    <Drawer  />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script setup>


import Header from 'src/components/Header.vue';
import Drawer from 'src/components/Drawer.vue';
import Footer from 'src/components/Footer.vue';


</script>
