<template>
    <div class="form-wrapper">
      <header class="form-header">
        <h1 class="header-form-title">CONFIGURAÇÕES PAGINAÇÃO</h1>
      </header>
  
      <div class="form-container">
        <div class="form-inputs">
          <button :class="{ active: form.excluirCampo }" @click="toggleField('excluirCampo')">
            Excluir Campo: {{ form.excluirCampo ? "Sim" : "Não" }}
          </button>
  
          <button :class="{ active: form.ativo }" @click="toggleField('ativo')">
            Ativar Campo: {{ form.ativo ? "Sim" : "Não" }}
          </button>
     
  
        <input v-model="form.parametro" type="text" class="input" placeholder="Insira o Parametro de Paginação" @input="emitUpdate" />
        <input v-model="form.urlPaginacao" type="text" class="input" placeholder="Insira a Url de Paginacao ou Rota principal (Insira 'urlMapeada' (sem aspas) para inserir a url mapeada)" @input="emitUpdate" />
  
        <select v-model="selectedAction" class="input">
          <option disabled hidden value="">Selecione o action</option>
          <option value="Eval">Eval</option>
          <option value="Intercept">Intercept</option>
          <option value="ScrollDown">ScrollDown</option>
        </select>
  
        <input v-model="form.scriptValor" type="text" class="input" placeholder="Insira o Script" @input="emitUpdate" />
  
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
    emits: ['updatePaginacao'],
    data() {
      return {
        storageKey: 'form_paginacao_config',
        form: this.loadFormData('form_paginacao_config'),
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
          parametro: "",
          urlPaginacao: "", // Para inserir a url do mapa, insira a string "urlMapeada"
          actionTipo: "", //"Eval", "Intercept", "ScrollDown"
          scriptValor: "",
          excluirCampo: false,
          refIndex: 10,
          ativo: false
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
        this.$emit("updatePaginacao", {
          parametro: this.form.parametro,
          urlPaginacao: this.form.urlPaginacao,
          actionTipo: this.form.actionTipo,
          scriptValor: this.form.scriptValor,
          excluirCampo: this.form.excluirCampo,
          refIndex: this.form.refIndex,
          ativo: this.form.ativo
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
      // Carregar os dados do formulário do storage ao montar o componente
      this.form = this.loadFormData(this.storageKey);
    }
  };
  </script>
  