<template>
    <div class="form-wrapper">
      <header class="form-header">
        <h1 class="header-form-title">CONFIGURAÇÕES EXTRAS</h1>
        <button class="clear-btn" @click="resetForm">CLEAR</button>
      </header>
  
      <div class="form-container">
        <div class="form-inputs">
        <input
          v-model="form.urlFiltro"
          type="text"
          class="input"
          placeholder="Insira o filtro para URL (Exemplo: catho, solides, infojobs...)"
        />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  // Importe as funções do utilitário
  import { saveToStorage, loadFromStorage, clearStorage } from '../utils/storage';
  
  export default {
    name: 'ExtraConfigForm',
    emits: ['updateExtraConfig'],
    data() {
      return {
        form: this.loadFormData('form_extra_config')
      };
    },
    watch: {
      form: {
        handler(newVal) {
          this.$emit('updateExtraConfig', newVal);
          this.saveFormData('form_extra_config', newVal);
        },
        deep: true
      }
    },
    methods: {
      getInitialForm() {
        return {
          urlFiltro: ""
        };
      },
      resetForm() {
        this.form = this.getInitialForm();
        this.clearStorage('form_extra_config');
      },
      saveFormData(storageKey, formData) {
        saveToStorage(storageKey, formData);
      },
      loadFormData(storageKey) {
        return loadFromStorage(storageKey, this.getInitialForm());
      },
      clearStorage(storageKey) {
        clearStorage(storageKey);
      }
    }
  };
  </script>
  