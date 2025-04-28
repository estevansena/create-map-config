<template>
  <div class="app-container">
    <!-- Sidebar à esquerda -->
    <Sidebar class="sidebar" />

    <!-- Formulários no meio -->
    <div class="form-container">
      <nav class="header">
        <!-- Cabeçalho (opcional) -->
      </nav>
      
      <!-- Exibir o formulário baseado no item selecionado -->
      <div class="form-content">
        <div v-if="activeIndex === 0">
          <ExtraConfigForm :extraConfig="extra_config" @updateExtraConfig="updateExtraConfig"
          />
        </div>
        <div v-if="activeIndex === 1">
          <RootForm :root="root" @updateRoot="updateRoot" />
        </div>
        <div v-if="activeIndex === 2">
          <TituloForm :titulo="titulo" @updateTitulo="updateTitulo" />
        </div>
        <div v-if="activeIndex === 3">
          <DescricaoForm :descricao="descricao" @updateDescricao="updateDescricao" />
        </div>
        <div v-if="activeIndex === 4">
          <CidadeForm :vagaCidade="vaga_cidade" @updateCidade="updateCidade" />
        </div>
        <div v-if="activeIndex === 5">
          <EstadoForm :vagaEstado="vaga_estado_sigla" @updateEstado="updateEstado" />
        </div>
        <div v-if="activeIndex === 6">
          <VagaTipoForm :vagaTipo="vaga_tipo" @updateVagaTipo="updateVagaTipo" />
        </div>
        <div v-if="activeIndex === 7">
          <UrlDetalheForm :urlDetalhe="url_vaga_detalhe" @updateUrlDetalhe="updateUrlDetalhe" />
        </div>
        <div v-if="activeIndex === 8">
          <SalarioForm :vagaSalario="vaga_salario" @updateSalario="updateSalario" />
        </div>
        <div v-if="activeIndex === 9">
          <PaginacaoForm :paginacao="paginacao" @updatePaginacao="updatePaginacao" />
        </div>
        <div v-if="activeIndex === 10">
          <TotalVagasForm :totalVagas="total_vagas" @updateTotalVagas="updateTotalVagas" />
        </div>
        <div v-if="activeIndex === 11">
          <TotalVagasSiteForm :totalVagasSite="total_vagas_site" @updateTotalVagasSite="updateTotalVagasSite" />
        </div>
        <div v-if="activeIndex === 12">
          <TotalAnunciosSiteForm :totalAnunciosSite="total_anuncios_site" @updateTotalAnunciosSite="updateTotalAnunciosSite" />
        </div>
      </div>
    </div>
    
    <!-- Visualizador à direita -->
    <ViewWindow class="view-window" :data="formData" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Sidebar from './components/Sidebar.vue';
import ViewWindow from './components/ViewWindow.vue';

// Componentes dos formulários
import ExtraConfigForm from './components/ExtraConfigForm.vue';
import RootForm from './components/RootForm.vue';
import TituloForm from './components/TituloForm.vue';
import DescricaoForm from './components/DescricaoForm.vue';
import CidadeForm from './components/CidadeForm.vue';
import EstadoForm from './components/EstadoForm.vue';
import VagaTipoForm from './components/VagaTipoForm.vue';
import UrlDetalheForm from './components/UrlDetalheForm.vue';
import SalarioForm from './components/SalarioForm.vue';
import PaginacaoForm from './components/PaginacaoForm.vue';
import TotalVagasForm from './components/TotalVagasForm.vue';
import TotalVagasSiteForm from './components/TotalVagasSiteForm.vue';
import TotalAnunciosSiteForm from './components/TotalAnunciosSiteForm.vue';

const store = useStore();
const activeIndex = computed(() => store.getters.activeIndex);

// Objetos reativos para os dados dos formulários
const extra_config = reactive({
  urlFiltro: "",
  limparCache: false,
});

const root = reactive({
  xpath: '',
  excluirCampo: false,
  refIndex: 1,
  ativo: false,
});

const vaga_titulo = reactive({
  default: '',
  xpath: '',
  bancoCurriculos: false,
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 2,
  ativo: false,
});

const vaga_descricao = reactive({
  default: '',
  xpath: '',
  excluirProcessadores: false,
  filtroDescricao: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 3,
  ativo: false,
});

const vaga_cidade = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 4,
  ativo: false,
});

const vaga_estado_sigla = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 5,
  ativo: false,
});

const vaga_tipo = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 6,
  ativo: false,
});

const url_vaga_detalhe = reactive({
  xpath: "",
  actionTipo: "",
  excluirCampo: false,
  refIndex: 7,
  ativo: false,
});

const vaga_salario = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 8,
  ativo: false,
});

const paginacao = reactive({
  parametro: "",
  urlPaginacao:"", // Para inserir a URL do mapa, insira a string "urlMapeada" para inserir a URL do mapa
  actionTipo: "", //"Eval", "Intercept", "ScrollDown"
  scriptValor: "",
  excluirCampo: false,
  refIndex: 10,
  ativo: false,
});

const total_vagas = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 11,
  ativo: false,
});

const total_vagas_site = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  excluirCampo: false,
  refIndex: 12,
  ativo: false,
});

const total_anuncios_site = reactive({
  default: "",
  xpath: "",
  excluirProcessadores: false,
  processadorTipo: [],
  processadorValor1: [],
  processadorValor2: [],
  urlDetalhe: false,
  excluirCampo: false,
  refIndex: 13,
  ativo: false,
});

// Dados para o preview
const formData = reactive({
  extra_config,
  root,
  vaga_titulo,
  vaga_descricao,
  vaga_cidade,
  vaga_estado_sigla,
  vaga_tipo,
  url_vaga_detalhe,
  vaga_salario,
  paginacao,
  total_vagas,
  total_vagas_site,
  total_anuncios_site,
});

// Funções de atualização
function updateExtraConfig(novoExtraConfig) {
  Object.assign(extra_config, novoExtraConfig);
}

function updateRoot(novoRoot) {
  Object.assign(root, novoRoot);
}

function updateTitulo(novoTitulo) {
  Object.assign(vaga_titulo, novoTitulo);
}

function updateDescricao(novoDescricao) {
  Object.assign(vaga_descricao, novoDescricao);
}

function updateCidade(novoCidade) {
  Object.assign(vaga_cidade, novoCidade);
}

function updateEstado(novoEstado) {
  Object.assign(vaga_estado_sigla, novoEstado);
}

function updateVagaTipo(novoVagaTipo) {
  Object.assign(vaga_tipo, novoVagaTipo);
}

function updateUrlDetalhe(novoUrlDetalhe) {
  Object.assign(url_vaga_detalhe, novoUrlDetalhe);
}

function updateSalario(novoSalario) {
  Object.assign(vaga_salario, novoSalario);
}

function updatePaginacao(novoPaginacao) {
  Object.assign(paginacao, novoPaginacao);
}

function updateTotalVagas(novoTotalVagas) {
  Object.assign(total_vagas, novoTotalVagas);
}

function updateTotalVagasSite(novoTotalVagasSite) {
  Object.assign(total_vagas_site, novoTotalVagasSite);
}

function updateTotalAnunciosSite(novoTotalAnunciosSite) {
  Object.assign(total_anuncios_site, novoTotalAnunciosSite);
}

</script>

<style scoped>
</style>