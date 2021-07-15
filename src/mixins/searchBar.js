export default {
    computed: {
        filteredMovies: function() {
               return this.movies.filter((movie) => {
                 return movie.original_title.toLowerCase().match(this.search)
               })
             }
    }
}