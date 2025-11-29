// Configurações centralizadas para reduzir a exposição direta de dados sensíveis em marcação HTML.
// Os valores são reconstruídos apenas em tempo de execução.
const contactConfig = {
  emails: {
    primary: 'YnJheWFuLnJvZHJpZ3Vlc0Bjb3JlZGIuY29tLmJy', // base64 de brayan.rodrigues@coredb.com.br
    cc: 'aGVucmlxdWUuYXJhdWpvQGNvcmVkYi5jb20uYnI=', // base64 de henrique.araujo@coredb.com.br
  },
  whatsapp: {
    phone: 'NTUzMTk5MDgyMjczNA==', // base64 de 5531990822734
  },
};

function decodeBase64(value) {
  try {
    return atob(value);
  } catch (error) {
    return '';
  }
}
