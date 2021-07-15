<template> 
  <div id="single-movie">
    <div class="container">
      <center>
        
        <div class="container row" style="margin-bottom: 3em; margin-top: -3.5em">
           
          <div class="col-sm-6" style="float: right">
            <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" style="width:25%, "/>
          </div>
          <div class="col-sm-6 center">
            
            <h1 style="margin-top:2em">{{movie.original_title}}</h1>
            <div class="row" v-for="g in genres" :key="g.id" style="display: inline-block">
              <div class="col-sm" >
                <p>{{g.name + "|"}} </p>
              </div>
            </div>
            <div class="container" v-bind:style="{marginTop: '2em'}" >
              <h6 style="color: #212529, margin-top: 2em">{{movie.overview}}</h6>
            </div>

            <div class="container" v-bind:style="{marginTop: '2em'}" >
                
              <h6>Year: {{movie.release_date}}</h6>
              <h6>Budget: ~ ${{movie.budget / 1000000}} million</h6>
              <h6>Rating: {{movie.vote_average * 10}}%</h6>
            </div>
            <div class="container" v-bind:style="{marginTop: '2em'}" >
              <div style="margin-top: 2em"><h4>Cast</h4></div>
              <div class="row" style="display: inline-block, margin-top: 2em">
                <div class="col-sm-3" v-for="actor in cast" :key="actor.id">                  
                  <img v-bind:src="'http://image.tmdb.org/t/p/w500/' + actor.profile_path" style="width: 90%"/>
                  <h5>{{actor.name}} </h5>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </center> 
    </div>
    <button @click="back()">back</button>
  </div>
</template>

<script>
export default {
    data () {
      return {
          id: this.$route.params.id,
          movie: {},
          images: {},
          genres: {},
          cast: {},
          crew: {},
          currentPage: '',
          
      }
    },
    created() {
       
        this.$http.get('https://api.themoviedb.org/3/movie/'+this.id+'?api_key=9270421e43cc32ed6056cad8de3c2c67&append_to_response=images').then(function(data){
          
          // console.log(data.body);
          this.movie = data.body;
          // console.log("image below")
          // console.log(data.body.images.backdrops);
          this.images = data.body.images.backdrops.slice(0, 4);
          this.genres = data.body.genres

          this.$http.get('https://api.themoviedb.org/3/movie/'+this.id+'/credits?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US').then(function(data){
          // console.log("cast below")
          // console.log(data.body);
          this.cast = data.body.cast.slice(0, 4);
          
        });
          
        });

        // this.$http.get('https://api.themoviedb.org/3/movie/'+this.id+'?api_key=9270421e43cc32ed6056cad8de3c2c67&append_to_response=images').then(function(data){
        //     console.log(data.body.images.backdrops[0].file_path);
        //     this.images = data.body.images.backdrops[0].file_path
        // });
    },
    methods: {
      back(){
         this.$http.get('https://api.themoviedb.org/3/movie/popular?api_key=9270421e43cc32ed6056cad8de3c2c67&language=en-US&page='+this.currentPage)
        .then(function(data) {
          console.log(data.body)
          this.movies = data.body.results
          this.poster = 'https://image.tmdb.org/t/p/w500/'+data.body.results.poster_path
        })
      }
    },
    
}

</script>

<style>
* {
  box-sizing: border-box;
}

.center {
  text-align: center;
}
.column {
  float: left;
  width: 33.33%;
  padding: 5px;
}

/* Clearfix (clear floats) */
.row::after {
  content: "";
  clear: both;
  display: table;
}
.info{
  width: 650px
}
</style>