const  app = require('./app')
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`);
});
