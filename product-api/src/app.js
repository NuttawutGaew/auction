const express = require('express');
const productRoutes = require('./routes/productRoutes');
const bidRoutes = require('./routes/bidRoutes');

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', bidRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});