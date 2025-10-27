import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar systemLinks to an external site.";
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   let randomNum = Math.floor(Math.random() * data.hits.length);
   let randomImage = data.hits[randomNum].webformatURL;
   res.render('home.ejs', {randomImage});
});

//planet route
app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;
    if (planet_name == "APOD") {
      res.render('apod.ejs');
    } else {
      let planetInfo = solarSystem[`get${planet_name}`]();
      res.render('planetInfo.ejs', {planetInfo, planet_name});
    }
    
});

app.listen(3000, () => {
   console.log('server started');
});