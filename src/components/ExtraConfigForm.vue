<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h1 class="header-form-title">CONFIGURAÇÕES EXTRAS</h1>
    </header>
    <div class="form-container">
      <div class="form-inputs">
        <button :class="{ active: form.limparCache }" @click="toggleField('limparCache')">
          Limpar Cache: {{ form.limparCache ? "Sim" : "Não" }}
        </button>
      </div>
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
import { saveToStorage, loadFromStorage } from '../utils/storage';

export default {
  name: 'ExtraConfigForm',
  emits: ['updateExtraConfig'],
  data() {
    return {
      storageKey: 'form_extra_config',
      form: this.loadFormData('form_extra_config')
    };
  },
  watch: {
    form: {
      handler(newVal) {
        this.saveFormData(this.storageKey, newVal);
        this.$emit('updateExtraConfig', newVal);
      },
      deep: true
    }
  },
  methods: {
    getInitialForm() {
      return {
        urlFiltro: "",
        limparCache: false,
      };
    },
    loadFormData(storageKey) {
      return loadFromStorage(storageKey, this.getInitialForm());
    },
    saveFormData(storageKey, formData) {
      saveToStorage(storageKey, formData);
    },
    toggleField(field) {
      this.form[field] = !this.form[field];
    }
  }
};
</script>

