<script>
import { useSupplierStore } from '../../stores/masterdata/supplier'
import { mapState, mapActions } from 'pinia'

// import component
import BaseInput from '../../components/BaseInput.vue'
import BaseTable from '../../components/BaseTable.vue'
import ArgonButton from '../../components/ArgonButton.vue'

const initialInput = {
  name: '',
  address: '',
  phone: ''
}

export default {
  name: 'TablesSupplier',
  data: () => ({
    isFormOpen: false,
    input: { ...initialInput },
    editing: false,
    // UI
    table: {
      columns: ['id', 'name', 'address', 'phone'],
      actions: [
        {
          title: 'Edit',
          event: 'edit-event'
        },
        {
            title: 'Delete',
            event: 'delete-event'
        }
      ]
    }
  }),
  // declate component
  components: {
    BaseInput,
    BaseTable,
    ArgonButton
  },
  computed: {
    // import all defined getters via mapState helper
    ...mapState(useSupplierStore, ['g$sup', 'getDetail'])
  },
  async mounted() {
    await this.a$sup()
  },
  methods: {
    // import all defined action via mapActions helper
    ...mapActions(useSupplierStore, [
      'a$sup',
      'a$add',
      'editIndex',
      'removeIndex'
    ]),
    // reset form
    resetForm() {
      // Reset Input with initial value
      Object.assign(this.input, initialInput)

      // reset editing state
      this.editing = false
    },
    // submit form
    addForm(event) {
      console.log(event)

      // pass input to action
      // determine
      if (this.editing === false) {
        this.a$add({ ...this.input })
      } else {
        this.editIndex(this.editing, { ...this.input })
      }

      // call reset form
      this.resetForm()
      this.closeForm();
    },
    detailSupplier(index) {
      // set editing to true from index params
      this.editing = index
      // set input value from getters by index params
      this.input = { ...this.getDetail(index) }
    },
    // toggle completed
    toggleCompleted(index) {
      const detail = this.getDetail(index)
      this.editIndex(index, {
        // pass all entries in detail object
        ...detail,
        // take completed value then toggle it
        completed: !detail.completed
      })
    },

    // handle event
    handleLogDelete(row) {
      // console.log(row)
      this.removeIndex(row)
    },
    handleLogEdit(row) {
      // console.log(row)
      this.openForm(),
      this.detailSupplier(row)
    },
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
  }
}
</script>

<template>
  <div>
    <div>
      <div class="btn-container">
        <div class="search">
            <input type="text" id="search-id" v-model="searchId" class="search-input" placeholder="Type ID here">
            <argon-button color="success" @click="search" class="search-button">Cari</argon-button>
        </div>
        <div class="btn-new">
          <argon-button color="success" @click="openForm">Add</argon-button>
        </div>
      </div>
    <div v-if="isFormOpen" class="popup-container">
      <div class="popup">
        <h2>New Supplier</h2>
        <form @submit.prevent="addForm" @reset="resetForm">
          <base-input
            v-model="input.name"
            class="input"
            placeholder="name"
            required
          ></base-input>
          <br />

          <base-input
            v-model="input.address"
            class="input"
            placeholder="address"
            required
          ></base-input>
          <br />

          <base-input
            v-model="input.phone"
            class="input"
            placeholder="phone"
            required
          ></base-input>
          <!-- <br />
          <input v-model="input.completed" type="checkbox" /> Completed -->
          <br /><br>
          <argon-button type="submit">{{ editing !== false ? 'Edit' : 'Add' }}</argon-button>
          <argon-button color="danger" type="reset" @click="closeForm" class="cancel-button">Cancel</argon-button>
        </form>
      </div>
    </div>
  </div>


    <!-- <hr />

    <ol class="list">
      <template v-for="(item, index) in g$list" :key="index">
        <li
          @dblclick="() => toggleCompleted(index)"
          :class="{ strike: item.completed }"
        >
          <button
            class="red"
            @click="() => removeIndex(index)"
            :disabled="editing !== false"
          >
            &times;
          </button>
          <button
            class="orange"
            @click="openForm(),detailList(index)"
            :disabled="editing !== false"
          >
            &#9998;
          </button>
          {{ item.title }}
          {{ item?.description ? `- ${item.description}` : '' }}
        </li>
      </template>
    </ol>

    <hr /> -->

    <base-table
      :data="g$sup"
      :columns="table.columns"
      :actions="table.actions"
      @edit-event="handleLogEdit"
      @delete-event="handleLogDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
.btn-container{
  display: flex;
}
.list {
  margin-block: 0.5rem;
}
.strike {
  text-decoration: line-through;
}
button {
  &.red {
    color: red;
  }
  &.orange {
    color: black;
  }
}
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
}

.btn-new{
  width: 200px;
  padding: 8px;
  margin-right: 10px;
  padding-left: 700px;
}
.search{
    padding: 10px 20px 15px 0px;
  }
  .search-input {
  width: 200px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

}


.search-results {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.search-results th,
.search-results td {
  padding: 8px;
  border: 1px solid #ccc;
}

.search-results th {
  background-color: #f2f2f2;
}

</style>