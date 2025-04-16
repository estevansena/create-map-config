export function saveToStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  
  export function loadFromStorage(key, defaultValue) {
    try {
      const saved = sessionStorage.getItem(key);
      if (!saved || saved === "undefined") return defaultValue;
      return JSON.parse(saved);
    } catch (error) {
      console.error(`Erro ao carregar do storage com a chave "${key}":`, error);
      return defaultValue;
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      sessionStorage.clear();
    });
  }
  
  
  export function clearStorage(key) {
    sessionStorage.removeItem(key);
  }
  