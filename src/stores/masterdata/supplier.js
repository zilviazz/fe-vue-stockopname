import { defineStore } from 'pinia'

import * as s$sup from '../../sevices/masterdata/supplier'

export const useSupplierStore = defineStore({
  id: 'supplier',
  // state is same as data in options api
  state: () => ({
    supplier: [],
  }),
  actions: {
    async a$sup() {
      try {
        // object destructure
        const { data } = await s$sup.supplier()
        this.supplier = data;
      } catch (e) {
        console.error('actions supplier error', e);
        this.supplier = [];
        throw e;
      }
    },
    async a$add(data) {
      try {
        await s$sup.add(data)
        await this.a$sup()
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
    g$sup: ({ supplier }) => supplier,
    getDetail: ({ supplier }) => {
      return (index) => list[supplier]
    }
  }
})

export default useSupplierStore;