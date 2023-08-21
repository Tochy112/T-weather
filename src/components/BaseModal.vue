<template>
  <Teleport to="body">
    <Transition name="modal-outer">
    <div v-show="modalActive">
      <Transition name="modal-inner">
        <v-card class="w-75" id="card" v-if="modalActive" elevation="8">
          <slot />

          <v-card-actions class="d-flex justify-end">
            <v-btn
              class="bg-secondary"
              elevation="1"
              @click="$emit('close-modal')"
              >close</v-btn
            >
          </v-card-actions>
        </v-card>
      </Transition>
    </div>
  </Transition>
  </Teleport>
</template>
<script setup lang="ts">
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
#card {
  position: absolute;
  top: 5rem;
  left: 0;
  right: 0;
  margin: auto;
}

/* model outer stylings */

.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

/* model inner stylings */
.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-enter-from {
    transform: scale(0.8);
}

</style>
