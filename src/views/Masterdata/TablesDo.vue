<template>
    <h1>Upload Stock Out</h1>
    <div class="form-container">
      <label for="date">Tanggal:</label>
      <input type="date" id="date" v-model="date" class="form-input">
  
      <label for="file">Upload File:</label>
      <input type="file" id="file" ref="fileInput" @change="handleFileUpload" class="form-input">
  
      <label for="description">Keterangan:</label>
      <textarea id="description" v-model="description" class="form-textarea"></textarea>
  
      <argon-button color="success" @click="submitForm" class="form-button">Submit</argon-button>
    </div>
    <div>
        <h2>History Upload</h2>
        <div class="search">
            <input type="date" id="search-date" v-model="searchDate" class="search-input">
            <argon-button color="success" @click="search" class="search-button">Cari</argon-button>
        </div>
        <BaseTable :columns="table.columns"/>
    </div>
  </template>
  
  <style scoped>
  h1{
    color: white;
    padding: 10px 20px 15px 30px;
    }
    h2{
        padding: 10px 20px 15px 30px;
    }
  .form-container {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .search{
    padding: 10px 20px 15px 30px;
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
  
  <script>
import BaseTable from '../../components/BaseTable.vue'
import ArgonButton from '../../components/ArgonButton.vue'

  export default {
    data() {
      return {
        date: '',
        selectedFile: null,
        description: '',
        table: {
            columns: ['Tanggal', 'File', 'Keterangan'],
            actions: [
                {
                    title: 'Delete',
                    event: 'delete-event'
                }
            ]
            }
      };
    },
    components:{
        BaseTable,
        ArgonButton
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      submitForm() {
        // Lakukan logika untuk mengirim data form ke server di sini
        // Misalnya menggunakan Axios atau Fetch API
        // Contoh sederhana menggunakan Axios:
        const formData = new FormData();
        formData.append('date', this.date);
        formData.append('file', this.selectedFile);
        formData.append('description', this.description);
  
        axios.post('/api/submit-form', formData)
          .then(response => {
            // Tangani respons sukses di sini
            console.log(response.data);
          })
          .catch(error => {
            // Tangani error di sini
            console.error(error);
          });
      }
    }
  };
  </script>


