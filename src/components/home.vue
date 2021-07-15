<template>
  <div>
    <div>
      <center>
        <input type="text" ref="searchInput" v-model="search" style="width:330px; margin: auto"/>
      </center>
      <center>
        <md-button style="margin: auto, margin-bottom: 3em" @click="searchMovie()">Search</md-button>
      </center>
    </div>

    <b-container>
      <div class="row" style="margin-bottom: 5em">
        <div class="col-sm-4" v-for="movie in filteredMovies" :key="movie"> 
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
    </b-container>
    
  </div>
</template>

<script>
  import {bus} from '../main';
  import { BContainer, VBModal } from 'bootstrap-vue'
  import searchBar from '../mixins/searchBar'
  export default {
    name: 'RegularButtons',
    components: { BContainer },
    directives: { 'b-container': VBModal },
    props: ['createdBy'],
    data () {
      return {
        currentPage: '',
        alignments: [
          'start',
          'center',
          'end',
        ],
        search: '',
        title: 'Your Weather',
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
    }, 
    created() {
      this.currentPage = 1;
      bus.$on('page', (data) => {
        // console.log("data from bus: "+data)
        this.currentPage = data
        this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+this.currentPage)
        .then(function(data) {
          // console.log(data.body.results)
          this.movies = data.body.results
          this.poster = 'https://image.tmdb.org/t/p/w500/'+data.body.results.poster_path
        })
      })
      this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+ this.currentPage)
        .then(function(data) {
          // console.log(data.body.results)
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
    mixins: [
        searchBar
    ]
    
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