<template>
  <client-only>
    <l-map class="map-base" :zoom="zoom" :min-zoom="13" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" :tile-size="tileSize" :options="options" />
      <MapMarker v-for="item in markers" :key="item.id" :marker="item" />
    </l-map>
  </client-only>
</template>

<script>
import MapMarker from '@/components/mwf/MapMarker.vue'

export default {
  components: {
    MapMarker
  },
  data () {
    return {
      url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F3dWNodXUiLCJhIjoiY2t0Mjh6d2t3MGxtYjMxcGs1Nmwwd2pxdyJ9.TGiI2hgQUsNnQf8Udt9xSQ',
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      zoom: 14,
      center: [-37.8136, 144.957],
      tileSize: 512,
      options: {
        zoomOffset: -1
      },
      markers: [
        {
          location: [-37.82263399550439, 144.96892172346216],
          id: 'marker-1',
          popup: {
            title: 'History of Melbourne',
            time: '13:30',
            location: 'National Gallery of Victoria'
          }
        },
        {
          location: [-37.82981846868417, 144.9756203483033],
          id: 'marker-2',
          popup: {
            title: 'Photography Workshop',
            time: '09:00',
            location: 'Royal Botanic Gardens'
          }
        },
        {
          location: [-37.78364745271192, 144.95162969144576],
          id: 'marker-3',
          popup: {
            title: 'Australian Animals',
            time: '12:00',
            location: 'Melbourne Zoo'
          }
        },
        {
          location: [-37.82321962601976, 144.97461819443708],
          id: 'marker-4',
          popup: {
            title: 'MWF Live Performance',
            time: '20:00',
            location: 'Sidney Myer Music Bowl'
          }
        },
        {
          location: [-37.80717368352269, 144.95678102613195],
          id: 'marker-5',
          popup: {
            title: 'Twilight Market',
            time: '16:30',
            location: 'Queen Victoria Market'
          }
        },
        {
          location: [-37.81990169525162, 144.98317793565326],
          id: 'marker-6',
          popup: {
            title: 'Free MCG Tour',
            time: '14:45',
            location: 'Melbourne Cricket Ground'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.map-base {
  width: 100%;
  max-width: 1100px;
  height: calc(100% - 70px);
  justify-self: center;
  position: relative;
  z-index: 1;
}

.leaflet-container {
  background: #3d3d3d;

  .leaflet-control-attribution {
    background: black;
    color: white;
  }
}

div.leaflet-container .leaflet-control-attribution {
  color: white !important;
}

@media (max-width: 1050px) {
  .map-base {
    height: 90%
  }
}

</style>
