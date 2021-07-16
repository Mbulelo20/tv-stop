<template>
  <div>
    <div>
      <center>
        <input type="text" ref="searchInput" v-model="search" v-on:keyup.enter="searchMovie()" style="width:330px; margin: auto"/>
      </center>
      <center>
        <button style="margin: auto, margin-bottom: 3em" @click="searchMovie()">Search</button>
      </center>
    </div>

    <b-container>
    <div class="row" style="margin-bottom: 5em; margin-top: 3em">
        <div class="col-sm-4" v-for="movie in movies" :key="movie.id"> 
          <router-link v-bind:to="'/movie/' + movie.id" style="color: #000000; text-decoration: none"> 
            <a target="_blank">
            <div class="row" style="margin-bottom: 5em">
              <div class="col-sm-5">
                <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" style="width:175px;">
              </div>
              <div class="col-sm-7" style=" text-align: left">
                <h5 class="centered">{{movie.original_title | to-uppercase}}</h5>
                <p style="font-size:12px; text-decoration: none" class="quickInfo">{{movie.overview | cut}}</p>
                <p style="font-size:12px;">Released: {{movie.release_date}}</p>
                <p style="font-size:12px, text-align: bottom">Rating: {{movie.vote_average}}</p>
              </div>
            </div>
            </a>
          </router-link>
        </div>
      </div>
      <button @click="nextPage()">NEXT</button>
      </b-container>
  </div>
</template>

<script>
  import { BContainer } from 'bootstrap-vue'
  export default {
    components: { BContainer },
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
      searchMovie: function() {
        this.search = this.$refs.searchInput.value;
        // console.log("Search: "+this.search)
        this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=9270421e43cc32ed6056cad8de3c2c67&query=' + this.search ).then(function(data) {
        // console.log("Results: " + data.body)
          this.movies = data.body.results
        })
      },
      nextPage: function() {
        this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+2)
        .then(function(data) {
          console.log(data.body)
          this.movies = data.body.results
          this.poster = 'https://image.tmdb.org/t/p/w500/'+data.body.results.poster_path
        })
      }
    }, 
    created() {
      this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+this.currentPage)
        .then(function(data) {
          console.log(data.body)
          this.movies = data.body.results
          this.poster = 'https://image.tmdb.org/t/p/w500/'+data.body.results.poster_path
        })
        
    }, 
     filters: {
      toUppercase(value){
        return value.toUpperCase()
      }, 
      'cut': function(value){
        return value.slice(0,300) + "..."
      },
    },
  }
  
  </script>


<style >

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