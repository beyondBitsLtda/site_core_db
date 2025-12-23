// Configurações centralizadas para reduzir a exposição direta de dados sensíveis em marcação HTML.
// Os valores são reconstruídos apenas em tempo de execução.
const contactConfig = {
  emails: {
    primary: 'YnJheWFuLnJvZHJpZ3Vlc0Bjb3JlZGIuY29tLmJy',
    cc: 'aGVucmlxdWUuYXJhdWpvQGNvcmVkYi5jb20uYnI=',
  },
  whatsapp: {
    phone: 'NTUzMTkxODczNDM1', // 55 31 9187-3435
  },
};

function decodeBase64(value) {
  try {
    return atob(value);
  } catch (error) {
    return '';
  }
}
