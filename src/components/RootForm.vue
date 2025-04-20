<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h1 class="header-form-title">CONFIGURAÇÕES ROOT</h1>
    </header>

    <div class="form-container">
      <div class="form-inputs">
        <button 
          :class="{ 'active': form.excluirCampo }"
          @click="toggleField('excluirCampo')"
        >
          Excluir Campo: {{ form.excluirCampo ? 'Sim' : 'Não' }}
        </button>

        <button 
          :class="{ 'active': form.ativo }"
          @click="toggleField('ativo')"
        >
          Ativar Campo: {{ form.ativo ? 'Sim' : 'Não' }}
        </button>
      

      <input
        v-model="form.xpath"
        type="text"
        class="input"
        placeholder="Insira o xpath"
      />
    </div>
  </div>
</div>
</template>

<script>
// Importe as funções de manipulação do localStorage
import { saveToStorage, loadFromStorage } from '../utils/storage';

export default {
  name: 'RootForm',
  emits: ['updateRoot'],
  data() {
    return {
      form: this.loadFormData('form_root') // chave personalizada para o localStorage
    };
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('updateRoot', newVal);
        this.saveFormData('form_root', newVal); // chave personalizada para o localStorage
      },
      deep: true
    }
  },
  methods: {
    getInitialForm() {
      return {
        xpath: "",
        excluirCampo: false,
        refIndex: 1,
        ativo: false,
      };
    },
    toggleField(field) {
      this.form[field] = !this.form[field];
    },
    saveFormData(storageKey, formData) {
      saveToStorage(storageKey, formData); // usa o utilitário para salvar no localStorage
    },
    loadFormData(storageKey) {
      return loadFromStorage(storageKey, this.getInitialForm()); // usa o utilitário para carregar do localStorage
    }
  }
};
</script>
