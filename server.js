const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
   const { lat, lng } = req.query;

   try {
      const { data } = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.REACT_APP_GOOGLE_API_KEY}&rankBy=prominence&orderBy=rating`
      );

      res.json(data);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
