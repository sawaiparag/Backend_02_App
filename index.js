const app = require('./app')
const {PORT} = process.env

app.listen(PORT, () => {
  console.log(`PORT is listebung at ${PORT}`);  
})