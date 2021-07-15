import home from './components/homeView.vue'
import movieItem from './components/movieItem.vue'
export default [
    {path: '/', component: home},
    {path: '/movie/:id', component: movieItem}

]