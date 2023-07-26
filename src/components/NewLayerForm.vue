<script setup lang="ts">
import { useLayersStore } from '@/stores/layers'
import { ref, toRefs } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'

interface LayerOptionsModel {
  minZoom?: number
  maxZoom?: number
  subdomains?: string | string[]
  errorTileUrl?: string
  zoomOffset?: number
  tms?: boolean
  zoomReverse?: boolean
  detectRetina?: boolean
  crossOrigin?: boolean | string
  referrerPolicy?: boolean | string
}

interface WeakLayerModel {
  url: string
  name: string
  attribution: string
  visible?: boolean
  opacity?: number
  options?: LayerOptionsModel
  uuid?: string
}

const advancedConfig = ref(false)

const toggleAdvancedConfig = () => (advancedConfig.value = !advancedConfig.value)

const { addLayer } = toRefs(useLayersStore())

const layer = ref<WeakLayerModel>({
  name: '',
  url: '',
  attribution: ''
})

const onSubmit = () => addLayer.value(layer.value)
const validateName = (value: string) => {
  if (!value) {
    return 'The name is required.'
  }
  return true
}
const validateUrl = (value: string) => {
  if (!value) {
    return 'The API URL template is required.'
  }
  const regex = /^https?:\/\/({s}\.)?[\w./]+[^.]\/{z}\/{x}\/{y}({r})?\.(png|jpg)$/
  if (!regex.test(value)) {
    return 'Please provide a valid template URL.'
  }

  return true
}
</script>

<template>
  <Form @submit="onSubmit">
    <section class="simple">
      <label class="block">
        <span class="text-sm text-slate-700">Layer name *</span>
        <Field
          class="mt-1 block w-full rounded-md border-slate-300 text-sm shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
          type="text"
          name="layerName"
          placeholder="Awesome Layer"
          v-model="layer.name"
          :rules="validateName"
        />
        <ErrorMessage name="layerName" class="italic text-red-700" />
      </label>
      <label class="mt-2 block">
        <span class="text-sm text-slate-700">API URL template *</span>
        <Field
          class="mt-1 block w-full rounded-md border-slate-300 text-sm shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
          type="url"
          name="layerUrl"
          placeholder="https://{s}.tile.examplemapprovider.org/{z}/{x}/{y}{r}.png"
          v-model="layer.url"
          :rules="validateUrl"
        />
        <ErrorMessage name="layerUrl" class="italic text-red-700" />
      </label>
      <label class="mt-2 block">
        <div class="flex">
          <span class="text-sm text-slate-700">Attribution</span>
          <font-awesome-icon
            icon="fa-lightbulb"
            shake
            style="--fa-animation-duration: 3s"
            class="peer ml-[1ch] pt-0.5"
          />
          <span class="relative grow opacity-0 transition peer-hover:opacity-100">
            <div
              class="absolute -top-4 left-2 whitespace-normal break-words rounded-md bg-slate-100 p-2 text-sm italic text-slate-500 drop-shadow-md"
            >
              Don't forget to attribute the contributors of the data you're using for their hard
              work !
            </div>
          </span>
        </div>
        <Field
          class="mt-1 block w-full rounded-md border-slate-300 text-sm shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
          type="text"
          name="layerAttribution"
          placeholder="&copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors"
          v-model="layer.attribution"
        />
        <span class="text-xs italic text-slate-500"
          >Psst! You can use Markdown syntax to render links here, but shh...
        </span>
      </label>
    </section>

    <div class="buttons my-4 flex gap-2">
      <button
        type="button"
        class="inline-flex grow justify-center rounded-md border border-slate-700 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 active:shadow-inner active:shadow-slate-300"
        @click="toggleAdvancedConfig"
      >
        <font-awesome-icon icon="fa-cog" class="mr-[1ch] pt-1" />
        Advanced configuration
      </button>
      <button
        v-if="!advancedConfig"
        type="submit"
        class="inline-flex grow justify-center rounded-md bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:shadow-inner active:shadow-sky-300"
      >
        Add Layer !
      </button>
    </div>

    <section v-if="advancedConfig" class="advanced">Woaw, so advanced</section>

    <div class="mt-4 flex">
      <button
        v-if="advancedConfig"
        type="submit"
        class="inline-flex grow justify-center rounded-md bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:shadow-inner active:shadow-sky-300"
      >
        Add Layer !
      </button>
    </div>

    <aside class="text-sm italic text-slate-500">* Required fields</aside>
  </Form>
</template>
