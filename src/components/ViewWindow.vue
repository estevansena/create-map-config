<template>
  <div class="view-window">
    <div class="window-header">
      <h3>PREVIEW</h3>
      <div class="buttons-container">
        <button class="copy-btn" @click="copiarJs">{{ copyTexto }}</button>
        <button class="download-btn" @click="baixarJs">DOWNLOAD</button>
      </div>
    </div>
    <pre>{{ formattedJs }}</pre>
  </div>
</template>

<script>
export default {
  name: 'ViewWindow',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      copyTexto: 'COPIAR'
    };
  },
  computed: {
    formattedJs() {
      const obj = this.data;
      let result = '';

      function formatObject(obj, indent = 2) {
        const spaces = ' '.repeat(indent);
        let result = '{\n';
        for (const [key, value] of Object.entries(obj)) {
          const formattedValue =
            typeof value === 'string' ? `"${value}"` : JSON.stringify(value, null, 0);
          result += `${spaces}${key}: ${formattedValue},\n`;
        }
        result += '}';
        return result;
      }

      result += 'export async function mapConfig() {\n\n';

      if ('extra_config' in obj) {
        result += `  const extra_config = ${formatObject(obj['extra_config'], 2)};\n\n`;
      }

      if ('root' in obj) {
        result += `  const root = ${formatObject(obj['root'], 2)};\n\n`;
      }

      if ('vaga_titulo' in obj) {
        result += `  const vaga_titulo = ${formatObject(obj['vaga_titulo'], 2)};\n\n`;
      }

      if ('vaga_descricao' in obj) {
        result += `  const vaga_descricao = ${formatObject(obj['vaga_descricao'], 2)};\n\n`;
      }

      if ('vaga_cidade' in obj) {
        result += `  const vaga_cidade = ${formatObject(obj['vaga_cidade'], 2)};\n\n`;
      }

      if ('vaga_estado_sigla' in obj) {
        result += `  const vaga_estado_sigla = ${formatObject(obj['vaga_estado_sigla'], 2)};\n\n`;
      }

      if ('vaga_tipo' in obj) {
        result += `  const vaga_tipo = ${formatObject(obj['vaga_tipo'], 2)};\n\n`;
      }

      if ('url_vaga_detalhe' in obj) {
        result += `  const url_vaga_detalhe = ${formatObject(obj['url_vaga_detalhe'], 2)};\n\n`;
      }

      if ('vaga_salario' in obj) {
        result += `  const vaga_salario = ${formatObject(obj['vaga_salario'], 2)};\n\n`;
      }

      if ('paginacao' in obj) {
        result += `  const paginacao = ${formatObject(obj['paginacao'], 2)};\n\n`;
      }

      if ('total_vagas' in obj) {
        result += `  const total_vagas = ${formatObject(obj['total_vagas'], 2)};\n\n`;
      }

      if ('total_vagas_site' in obj) {
        result += `  const total_vagas_site = ${formatObject(obj['total_vagas_site'], 2)};\n\n`;
      }

      if ('total_anuncios_site' in obj) {
        result += `  const total_anuncios_site = ${formatObject(obj['total_anuncios_site'], 2)};\n\n`;
      }

      result += '  return { extra_config, root, url_vaga_detalhe, vaga_titulo, vaga_descricao, vaga_cidade, vaga_estado_sigla, vaga_tipo, vaga_salario, paginacao, total_vagas, total_vagas_site, total_anuncios_site };\n}';

      return result;
    }
  },
  methods: {
    baixarJs() {
      const blob = new Blob([this.formattedJs], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mapConfig.js";
      a.click();
      URL.revokeObjectURL(url);
    },
    copiarJs() {
      navigator.clipboard.writeText(this.formattedJs).then(() => {
        this.copyTexto = 'COPIADO';
        setTimeout(() => {
          this.copyTexto = 'COPY';
        }, 3000);
      }).catch(err => {
        console.error('Erro ao copiar:', err);
      });
    }
  }
};
</script>

<style scoped>
</style>
