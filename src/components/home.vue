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
  import searchBar from '../mixins/searchBar'
  export default {
    name: 'home',

    data () {
      return {
        currentPage: '',
        search: '',
        movies: [],
      }       
    },
    methods: {
    },
    created() {
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