import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

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

interface LayerModel extends WeakLayerModel {
  uuid: string
}

export const useLayersStore = defineStore('layers', () => {
  const layers = ref<LayerModel[]>([])

  const addLayer = (layer: WeakLayerModel) => {
    layers.value.push(layer.uuid ? (layer as LayerModel) : { ...layer, uuid: uuidv4() })
  }

  const removeLayer = (id: string) => {
    layers.value.splice(
      layers.value.findIndex((layer) => layer.uuid === id),
      1
    )
  }

  return { layers, addLayer, removeLayer }
})
