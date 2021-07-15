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
    <div class="row" v-for="day in forecast" :key="day"  style="display: inline-block; padding: 5px">
        <div class="col-sm-1">
            <div v-for="t in ts" :key="t">
                {{t.dt}}
            </div>
            <h6>{{day.dt}}</h6>
            <h6>{{day.temp.max}}</h6>
            <h6>{{day.temp.min}}</h6>
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
        city: ''
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