export function generateOrderCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let prefix = '';
    let suffix = '';
  
    // Gera 3 letras
    for (let i = 0; i < 3; i++) {
      prefix += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  
    // Gera 6 caracteres alfanuméricos
    for (let i = 0; i < 6; i++) {
      suffix += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
  
    return `${prefix}-${suffix}`;
  }