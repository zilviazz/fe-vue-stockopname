import { defineStore } from 'pinia'

import * as s$part from '../../sevices/masterdata/part'

export const usePartStore = defineStore({
  id: 'part',
  // state is same as data in options api
  state: () => ({
    part: [],
  }),
  actions: {
    async a$part() {
      try {
        // object destructure
        const { data } = await s$part.part()
        this.part = data;
      } catch (e) {
        console.error('actions part error', e);
        this.part = [];
        throw e;
      }
    },
    async a$add(data) {
      try {
        await s$part.add(data)
        await this.a$part()
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
    g$part: ({ part }) => part,
    getDetail: ({ part }) => {
      return (index) => list[part]
    }
  }
})

export default usePartStore;