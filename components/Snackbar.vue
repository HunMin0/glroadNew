<template>
    <v-snackbar v-model="show" :color="color" :timeout="timeout" :top="'top'" :vertical="vertical">
        {{ message }}
        <template v-if="action" v-slot:action="{ attrs }">
            <v-btn v-if="href" text @click="this.window.location.href=''+href+''">확인</v-btn>
            <v-btn text v-bind="attrs" @click="show = false"> Close </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === "snackbar/SHOW_MESSAGE") {
                this.message = state.snackbar.message;
                this.color = state.snackbar.color;
                this.timeout = state.snackbar.timeout;
                this.vertical = state.snackbar.vertical;
                this.action = state.snackbar.action;
                this.href = state.snackbar.href;
                this.show = true;
            }
        });
    },
    data() {
        return {
            show: false,
            color: "",
            message: "",
            timeout: -1,
            vertical: '',
            action: false,
            href: '',
        };
    },
}
</script>

<style scoped>

</style>
