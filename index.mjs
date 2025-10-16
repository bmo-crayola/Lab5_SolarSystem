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
   let randomImage = data.hits[0].webformatURL;
   res.render('home.ejs');
});

//mercury route
app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;
    
    let planetInfo = solarSystem[`get${planet_name}`]();
    
    
    console.log(planetInfo);
    res.render('planetInfo.ejs', {planetInfo, planet_name});
});

app.listen(3000, () => {
   console.log('server started');
});