<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h1 class="header-form-title">CONFIGURAÇÕES URL DETALHE</h1>
    </header>

    <div class="form-container">
      <div class="form-inputs">
        <button :class="{ active: form.excluirCampo }" @click="toggleField('excluirCampo')">
          Excluir Campo: {{ form.excluirCampo ? "Sim" : "Não" }}
        </button>

        <button :class="{ active: form.ativo }" @click="toggleField('ativo')">
          Ativar Campo: {{ form.ativo ? "Sim" : "Não" }}
        </button>
     

      <input v-model="form.xpath" type="text" class="input" placeholder="Insira o xpath" @input="emitUpdate" />

      <select v-model="selectedAction" class="input">
        <option disabled hidden value="">Selecione o action</option>
        <option value="Href">Href</option>
        <option value="Click">Click</option>
      </select>

      <button class="inserir-processador-btn" @click="inserirAcao" :disabled="selectedAction === ''">
        Inserir Action
      </button>
    </div>
      <div v-if="form.actionTipo !== ''" class="alerta-box">
        <span class="fechar" @click="removerAcao">×</span>
        <p><strong>Action:</strong> {{ form.actionTipo }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import { saveToStorage, loadFromStorage } from '../utils/storage';

export default {
  emits: ['updateUrlDetalhe'],
  data() {
    return {
      storageKey: 'url_detalhe_config',
      form: this.loadFormData('url_detalhe_config'),
      selectedAction: ""
    };
  },
  watch: {
    form: {
      handler(newVal) {
        this.saveFormData(this.storageKey, newVal);
        this.emitUpdate();
      },
      deep: true
    }
  },
  methods: {
    defaultForm() {
      return {
        xpath: "",
        actionTipo: "",
        excluirCampo: false,
        ativo: false,
        refIndex: 7
      };
    },
    loadFormData(key) {
      return loadFromStorage(key, this.defaultForm());
    },
    saveFormData(key, formData) {
      saveToStorage(key, formData);
    },
    toggleField(field) {
      this.form[field] = !this.form[field];
      this.emitUpdate();
    },
    emitUpdate() {
      this.$emit("updateUrlDetalhe", {
        xpath: this.form.xpath,
        actionTipo: this.form.actionTipo,
        excluirCampo: this.form.excluirCampo,
        ativo: this.form.ativo,
        refIndex: this.form.refIndex
      });
    },
    inserirAcao() {
      this.form.actionTipo = this.selectedAction;
      this.selectedAction = "";
      this.emitUpdate();
    },
    removerAcao() {
      this.form.actionTipo = "";
      this.emitUpdate();
    },

  },
  mounted() {
    this.form = loadFromStorage(this.storageKey, this.defaultForm());
  }
};
</script>
