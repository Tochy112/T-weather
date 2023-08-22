<template>
  <v-container fluid>
    <Suspense>
        <LoadingView />

        <template #fallback>
            <div class="mx-auto text-center">
                <v-icon id="icon">mdi-loading</v-icon>
            </div>
        </template>
    </Suspense>
  </v-container>
</template>
<script lang="ts" setup>
import LoadingView from '@/components/AsyncCity.vue';
</script>
<style scoped>
#icon{
    animation: animate infinite 1s linear;
    padding: 2rem;
    color: #fff;
}

@keyframes animate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
