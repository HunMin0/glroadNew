<template>
    <v-app-bar flat color="white">
        <v-app-bar-nav-icon>
            <v-btn icon @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon> </v-btn>
        </v-app-bar-nav-icon>
        <v-app-bar-title>{{title}}</v-app-bar-title>
    </v-app-bar>
</template>

<script>
export default {
    name: "AppBar",
    props: ['title'],
    data: () => ({

    }),
}
</script>

<style scoped>
>>> .v-app-bar-title__content {
    width:70% !important;
}
</style>
