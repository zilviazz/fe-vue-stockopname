<script>
import { useRackStore } from '../../stores/masterdata/rack'
import { mapState, mapActions } from 'pinia'

// import component
import BaseInput from '../../components/BaseInput.vue'
import BaseTable from '../../components/BaseTable.vue'
import ArgonButton from '../../components/ArgonButton.vue'

const initialInput = {
  rack_no: '',
}

export default {
  name: 'TablesRack',
  data: () => ({
    isFormOpen: false,
    input: { ...initialInput },
    editing: false,
    // UI
    table: {
      columns: ['id', 'rack_no'],
      actions: [
        {
          title: 'Edit',
          event: 'event-edit'
        },
        {
            title: 'Delete',
            event: 'event-delete'
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
    ...mapState(useRackStore, ['g$rack', 'getDetail'])
  },
  async mounted() {
    await this.a$rack()
  },
  methods: {
    // import all defined action via mapActions helper
    ...mapActions(useRackStore, [
      'a$rack',
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
    detailRack(index) {
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
      this.detailRack(row)
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
    <argon-button @click="openForm">New Rack</argon-button>
    <div v-if="isFormOpen" class="popup-container">
      <div class="popup">
        <h2>New Rack</h2>
        <form @submit.prevent="addForm" @reset="resetForm">
          <base-input
            v-model="input.rack_no"
            class="input"
            placeholder="rack_no"
            required
          ></base-input>
          <br />

          <!-- <base-input
            v-model="input.part_uniq"
            class="input"
            placeholder="part_uniq"
            required
          ></base-input>
          <br /> -->

          <!-- <base-input
            v-model="input.category"
            class="input"
            placeholder="category"
            required
          ></base-input> -->
          <!-- <br />
          <input v-model="input.completed" type="checkbox" /> Completed -->
          <br /><br>
          <argon-button type="submit">{{ editing !== false ? 'Edit' : 'Add' }}</argon-button>
          <argon-button color="danger" type="reset" @click="closeForm" class="cancel-button">Cancel</argon-button>
        </form>
      </div>
    </div>
  </div>


    <hr />

    <!-- <ol class="list">
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
    </ol> -->

    <hr />

    <base-table
      :data="g$rack"
      :columns="table.columns"
      :actions="table.actions"
      @event-edit="handleLogEdit"
      @event-delete="handleLogDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
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

</style>