const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/photos', (req, res) => {
  const data = [
    {
      "id": "mOEqOtmuPG8",
      "alt_description": "Big Ben tower",
      "urls": {"small": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQ0OTh8MHwxfHNlYXJjaHwxfHxsb25kb258ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=400"},
      "user": {"name": "Luke Stackpoole"}
    },
    {
      "id": "Q6UehpkBSnQ",
      "alt_description": "London Bridge, London",
      "urls": {"small": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQ0OTh8MHwxfHNlYXJjaHwyfHxsb25kb258ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=400"},
      "user": {"name": "Luke Stackpoole"}
    }
  ]
  res.json(data);
});

app.listen(8000, function(){
  console.log('Server is running on port:', 8000);
});