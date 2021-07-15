<template>
  <div>
    <div>
      <center>
        <input type="text" ref="searchInput" v-model="search" style="width:330px; margin: auto"/>
      </center>
      <center>
        <button style="margin: auto, margin-bottom: 3em" @click="searchCity()">Search</button>
      </center>
    </div>
    <div class="row" style="margin-bottom: 5em">
        <div class="col-sm-4" v-for="movie in movies" :key="movie.id"> 
          <router-link @click.native="clickedItem()" v-bind:to="'/movie/' + movie.id" style="color: #000000">      
            <div class="row" style="margin-bottom: 5em">
              <div class="col-sm-5">
                <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" style="width:275px;">
              </div>
              <div class="col-sm-7" style="margin-left: -.5em">
                <h5 class="centered">{{movie.original_title | to-uppercase}}</h5>
                <p style="font-size:12px;" class="quickInfo">{{movie.overview | cut}}</p>
                <p style="font-size:12px;">Released: {{movie.release_date}}</p>
                <p style="font-size:12px, text-align: bottom">Rating: {{movie.vote_average}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
  
  export default {
    
    data () {
      return {
        
        search: '',
        title: 'Your Weather',
        forecast:[],
        coordinates: [],
        ts: [],
        city: '',
        currentPage: 1,
        movies: [],
      }       
    },
    methods: {
        searchCity: function() {
          this.city = this.$refs.searchInput.value;
            console.log("Search: "+this.city)
        this.$http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+this.city+'.json?access_token=pk.eyJ1IjoibWJ1bGVsbyIsImEiOiJja25rN2pxbGIwOGR3MnZvMHZhbm04c3dlIn0.D1L9umIswRGLIgDh0BpSYg')
        .then(function(data) {
        //   console.log(data.body.features[0].place_name)
          console.log(data.body)
          this.coordinates = data.body.features[0].bbox

          this.$http.get('https://api.openweathermap.org/data/2.5/onecall?lat='+this.coordinates[1]+'&lon='+this.coordinates[0]+'&units=metric&exclude=hourly&appid=70f68a6a3d3e4804ac259ff1dd123f66')
            .then(function(data) {
            //   console.log(data.body.features[0].place_name)
            this.forecast = data.body.daily
            this.ts = data.body.daily.dt
            console.log(data.body.daily)
            
            })
        })
       },
      
    }, 
    created() {
      this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+this.currentPage)
        .then(function(data) {
          console.log(data.body)
          this.movies = data.body.results
          this.poster = 'https://image.tmdb.org/t/p/w500/'+data.body.results.poster_path
        })
        
    }, 
    
  }
  
  </script>


<style scoped>

p:hover{
  color: blue;
  text-decoration: none
}
p{
  text-decoration: none

}
li{
    display: inline-block;
    margin: 0 10px;
}

.a{
    color:red;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;

}

nav{
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
}
.router-link-active{
    color:black
}
</style>