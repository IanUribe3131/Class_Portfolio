const cities = {
  GDL: { lat: 20.6597, long: -103.3496, name: "Guadalajara" },
  LSN: {lat: 46.52, long: 6.63, name: "Lausanne"},
};

app.get("/weather/:city", async (req,res, next) => {
  const { city } = req.params;
  if(!city) next(new Error("City code is required"));
  if(!cities[city]) next(new Error("City code is invalid"));
  const { lat, long, name} = cities[city];
  const respString = await getWeatherFrom(lat, long, name);
  res.send(respString);

});
