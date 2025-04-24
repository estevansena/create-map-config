<template>
    <div class="form-wrapper">
      <header class="form-header">
        <h1 class="header-form-title">CONFIGURAÇÕES DESCRIÇÃO</h1>
      </header>
  
      <div class="form-container">
        <div class="form-inputs">
          <button :class="{ active: form.filtroDescricao }" @click="toggleField('filtroDescricao')">
            Filtro Descrição: {{ form.filtroDescricao ? "Sim" : "Não" }}
          </button>

          <button :class="{ active: form.excluirProcessadores }" @click="toggleField('excluirProcessadores')">
          Excluir Processadores: {{ form.excluirProcessadores ? "Sim" : "Não" }}
          </button>
  
          <button :class="{ active: form.urlDetalhe }" @click="toggleField('urlDetalhe')">
            Mapear Dentro da URL Detalhe: {{ form.urlDetalhe ? "Sim" : "Não" }}
          </button>
  
          <button :class="{ active: form.excluirCampo }" @click="toggleField('excluirCampo')">
            Excluir Campo: {{ form.excluirCampo ? "Sim" : "Não" }}
          </button>
  
          <button :class="{ active: form.ativo }" @click="toggleField('ativo')">
            Ativar Campo: {{ form.ativo ? "Sim" : "Não" }}
          </button>
       
  
        <input v-model="form.default" type="text" class="input" placeholder="Insira o default" @input="emitUpdate" />
        <input v-model="form.xpath" type="text" class="input" placeholder="Insira o xpath" @input="emitUpdate" />
  
        <select v-model="form.tipo" class="input">
          <option disabled hidden value="">Selecione o processador</option>
          <option value="">Default</option>
          <option value="Replace">Replace</option>
          <option value="RegexMatch">RegexMatch</option>
          <option value="RegexReplace">RegexReplace</option>
          <option value="Prefix">Prefix</option>
          <option value="Sufix">Sufix</option>
          <option value="SplitFirst">SplitFirst</option>
          <option value="SplitLast">SplitLast</option>
          <option value="Split">Split</option>
          <option value="ImageSequence">Image Sequence</option>
          <option value="Eval">Eval</option>
          <option value="Dll">Dll</option>
        </select>
  
        <input v-model="form.valor1" type="text" class="input" placeholder="Insira o valor 1 do processador" />
        <input v-model="form.valor2" type="text" class="input" placeholder="Insira o valor 2 do processador" />
  
        <button class="inserir-processador-btn" @click="InserirProcessador" :disabled="form.tipo === ''">
          Inserir Processador
        </button>
      </div>
        <div v-for="(alerta, index) in alertas" :key="index" class="alerta-box">
          <span class="fechar" @click="removerAlerta(index)">×</span>
          <p><strong>Processador:</strong> {{ alerta.tipo }}</p>
          <p><strong>Valor 1:</strong> {{ alerta.valor1 }}</p>
          <p><strong>Valor 2:</strong> {{ alerta.valor2 }}</p>
        </div>
      </div>
    </div>

  </template>
  
  <script>
import { saveToStorage, loadFromStorage } from '../utils/storage';
  
  export default {
    emits: ['updateDescricao'],
    data() {
      return {
        storageKey: 'form_descricao_config',
        storageKeyAlertas: 'alertas_descricao_config',
        form: this.loadFormData('form_descricao_config'),
        alertas: []
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
    mounted() {
      this.alertas = loadFromStorage(this.storageKeyAlertas, []);
    },
    methods: {
      defaultForm() {
        return {
          tipo: "",
          default: "",
          xpath: "",
          excluirProcessadores: false,
          filtroDescricao: false,
          processadorTipo: [],
          processadorValor1: [],
          processadorValor2: [],
          urlDetalhe: false,
          excluirCampo: false,
          ativo: false,
          refIndex: 3
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
      },
      emitUpdate() {
        this.$emit("updateDescricao", {
          default: this.form.default,
          xpath: this.form.xpath,
          excluirProcessadores: this.form.excluirProcessadores,
          processadorTipo: this.form.processadorTipo,
          processadorValor1: this.form.processadorValor1,
          processadorValor2: this.form.processadorValor2,
          filtroDescricao: this.form.filtroDescricao,
          urlDetalhe: this.form.urlDetalhe,
          excluirCampo: this.form.excluirCampo,
          ativo: this.form.ativo,
          refIndex: this.form.refIndex
        });
      },
      InserirProcessador() {
        if (this.form.tipo || this.form.valor1 || this.form.valor2) {
          const novoAlerta = {
            tipo: this.form.tipo || "",
            valor1: this.form.valor1 || "",
            valor2: this.form.valor2 || ""
          };
  
          this.alertas.push(novoAlerta);
          this.saveAlertas();
  
          this.form.processadorTipo.push(novoAlerta.tipo);
          this.form.processadorValor1.push(novoAlerta.valor1);
          this.form.processadorValor2.push(novoAlerta.valor2);
  
          this.limparTipoEValores();
        }
      },
      limparTipoEValores() {
        this.form.tipo = "";
        this.form.valor1 = "";
        this.form.valor2 = "";
      },
      removerAlerta(index) {
        this.alertas.splice(index, 1);
        this.saveAlertas();
  
        this.form.processadorTipo.splice(index, 1);
        this.form.processadorValor1.splice(index, 1);
        this.form.processadorValor2.splice(index, 1);
      },
      saveAlertas() {
        saveToStorage(this.storageKeyAlertas, this.alertas);
      }
    }
  };
  </script>
  