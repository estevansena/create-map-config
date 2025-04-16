<template>
  
  <div class="sidebar">
    <div class="sidebar-header">
      <h1 class="app-name">CREATE MAP CONFIG</h1>
    </div>

    <ul class="sidebar-menu">
      <li v-for="(item, index) in menuItems" :key="index">
        <a
          href="javascript:void(0)"
          @click="setActiveIndex(index)" 
          :class="{ active: activeIndex === index }"
        >
          <component :is="item.icon" class="icon" />
          <span>{{ item.name }}</span>
        </a>
      </li>
    </ul>
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
</template>

<script setup>
import { ref } from "vue";
import { Settings, Code, Type, FileText, MapPin, Globe, Briefcase, Link, DollarSign, List, Hash, BarChart } from "lucide-vue-next";
import { computed } from 'vue';
import { useStore } from 'vuex'; // Importando o Vuex para acesso à store

const store = useStore(); // Usando a store Vuex

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
  { name: "TOTAL ANÚNCIOS SITE", icon: BarChart }
]);

const activeIndex = computed(() => store.getters.activeIndex); // Acessando o activeIndex da store

const setActiveIndex = (index) => {
  store.dispatch('updateActiveIndex', index); // Atualizando o activeIndex na store
};

</script>

<style scoped>
</style>
