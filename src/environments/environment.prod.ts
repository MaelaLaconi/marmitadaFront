export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allReceipt: '/receipt',
      randomReceipt: '/receipt/random'
    }
  }
};
