import home from './components/home.vue'
import movieItem from './components/movieItem.vue'
export default [
    {path: '/', component: home},
    {path: '/movie/:id', component: movieItem}

]