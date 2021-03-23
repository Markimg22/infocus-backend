import app from './app';

app.on('connected', () => {
  app.listen(3333, () => {
    console.log('Started in port 3333');
  });
});
