import { defineStore } from 'pinia';
import { type MapItem } from '../types/gameInfo';
import { getMaps } from '../api';

export const useMapStore = defineStore('map',{
  state: () => ({
    maps: [] as MapItem[] 
  }),
  actions: {
    async getMaps () {
      const { data } = await getMaps()
      this.maps = data
      return this.maps
    }
  }
});

useMapStore().getMaps()