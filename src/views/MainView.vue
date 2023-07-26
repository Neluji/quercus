<script setup lang="ts">
import { useLayersStore } from '@/stores/layers'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref, toRefs } from 'vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import NewLayerForm from '@/components/NewLayerForm.vue'

const zoom = ref(2)

const { layers, addLayer, removeLayer } = toRefs(useLayersStore())
</script>

<template>
  <main
    class="bg-[url(../assets/blurred-bg.jpg)] bg-no-repeat bg-cover bg-center h-screen w-screen"
  >
    <div v-if="layers.length" class="h-full">
      <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LTileLayer
          v-for="layer in layers"
          :key="layer.uuid"
          :url="layer.url"
          layer-type="base"
          :name="layer.name"
          :attribution="layer.attribution"
        ></LTileLayer>
      </LMap>
    </div>
    <Dialog :open="!layers.length">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-al"
        >
          <DialogTitle as="h2" class="text-center text-3xl font-medium leading-6 text-gray-900 my-2"
            >Quercus</DialogTitle
          >
          <DialogDescription as="h3" class="text-xl font-medium leading-6 text-gray-900 mt-8"
            >Welcome onboard !</DialogDescription
          >

          <p class="mt-2 text-base text-gray-500">
            To get started, please add your first map layer :
          </p>

          <NewLayerForm class="mt-4"></NewLayerForm>
        </DialogPanel>
      </div>
    </Dialog>
  </main>
</template>
