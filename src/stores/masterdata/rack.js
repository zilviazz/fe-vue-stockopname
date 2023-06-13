import { defineStore } from 'pinia'

import * as s$rack from '../../sevices/masterdata/rack'

export const useRackStore = defineStore({
  id: 'rack',
  // state is same as data in options api
  state: () => ({
    rack: [],
  }),
  actions: {
    async a$rack() {
      try {
        // object destructure
        const { data } = await s$rack.rack()
        this.rack = data;
      } catch (e) {
        console.error('actions rack error', e);
        this.rack = [];
        throw e;
      }
    },
    async a$add(data) {
      try {
        await s$rack.add(data)
        await this.a$rack()
      } catch ({ message, error }) {
        throw message ?? error
      }
    },

    removeIndex(index) {
      this.list = this.list.filter((val, idx) => index !== idx)
    },
    editIndex(index, data) {
      this.list[index] = data
    }
  },
  getters: {
    g$rack: ({ rack }) => rack,
    getDetail: ({ rack }) => {
      return (index) => list[rack]
    }
  }
})

export default useRackStore;