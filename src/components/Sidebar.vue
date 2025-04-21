<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1 class="app-name">CREATE MAP CONFIG</h1>
    </div>

    <ul class="sidebar-menu">
      <li v-for="(item, index) in menuItems" :key="index">
        <template v-if="item.name === 'CLEAR ALL'">
          <button
            class="clear-all-button"
            @click="openPopup"
          >
            <component :is="item.icon" class="icon" />
            <span>{{ item.name }}</span>
          </button>
        </template>
        <template v-else>
          <a
            href="javascript:void(0)"
            @click="setActiveIndex(index)"
            :class="{ active: activeIndex === index }"
          >
            <component :is="item.icon" class="icon" />
            <span>{{ item.name }}</span>
          </a>
        </template>
      </li>
    </ul>
    <div class="sidebar-footer">
  Desenvolvido por <a href="https://github.com/estevansena" target="_blank">Estevan Sena</a>
  - v.1.2.0
</div>

  </div>

  <main>
    <div v-if="activeIndex === 0">
      <ExtraConfigForm :extraConfig="extra_config" @updateExtraConfig="updateExtraConfig" />
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
  </main>

  <!-- Pop-up de confirmação -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <p>Deseja limpar todos os formulários?</p>
      <div class="popup-buttons">
        <button @click="confirmClear">Sim</button>
        <button @click="cancelClear">Não</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import {
  Settings, Code, Type, FileText, MapPin, Globe,
  Briefcase, Link, DollarSign, List, Hash, Trash2
} from "lucide-vue-next";

const store = useStore();

const menuItems = ref([
  { name: "EXTRA CONFIG", icon: Settings },
  { name: "ROOT", icon: Code },
  { name: "TÍTULO", icon: Type },
  { name: "DESCRIÇÃO", icon: FileText },
  { name: "CIDADE", icon: MapPin },
  { name: "ESTADO", icon: Globe },
  { name: "VAGA TIPO", icon: Briefcase },
  { name: "URL DETALHE", icon: Link },
  { name: "SALÁRIO", icon: DollarSign },
  { name: "PAGINAÇÃO", icon: List },
  { name: "TOTAL VAGAS", icon: Hash },
  { name: "TOTAL VAGAS SITE", icon: Hash },
  { name: "TOTAL ANÚNCIOS SITE", icon: Hash },
  { name: "CLEAR ALL", icon: Trash2 }
]);

const activeIndex = computed(() => store.getters.activeIndex);

const setActiveIndex = (index) => {
  store.dispatch('updateActiveIndex', index);
};

// Variável para controle do pop-up
const showPopup = ref(false);

// Função para abrir o pop-up
const openPopup = () => {
  showPopup.value = true;
};

// Função para confirmar o "CLEAR ALL" e recarregar a página
const confirmClear = () => {
  location.reload(); // Recarrega a página, similar a F5
};

// Função para cancelar o "CLEAR ALL" e fechar o pop-up
const cancelClear = () => {
  showPopup.value = false;
};
</script>

<style scoped>
/* Estilos do pop-up */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Colocando o pop-up no topo de todos os outros elementos */
}

.popup-content {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  padding: 30px 50px; /* Aumentando o tamanho do pop-up */
  border-radius: 3px;
  text-align: center;
  width: 300px; /* Tornando o pop-up mais largo */
}

.popup-buttons {
  display: flex;
  justify-content: space-evenly; /* Para colocar os botões lado a lado */
  margin-top: 20px;
}

.popup-content button {
  background-color: #f0f0f0;
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100px; /* Tamanho fixo para os botões */
}

.popup-content button:hover {
  background-color: #dedede;
}

.sidebar-footer {
  font-size: 11px;
  color: #979595;
  text-align: center;
  margin-top: auto;
  padding: 10px 0px;
  bottom: 10px;
  width: 100%;

}
.sidebar-footer a {
  color: #c4c3c3;
  text-decoration: none;
}
.sidebar-footer a:hover {
  text-decoration: none;
  color: #ffffff;

}

</style>
