import Vue from 'vue'
import Router from 'vue-router'
import Film from '@/views/Film'
import Nowplaying from '@/views/Film/Nowplaying'
import Comingsoon from '@/views/Film/Comingsoon'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import City from '@/views/City'

Vue.use(Router)

// const auth = {
//   isLogin(){
//     return false;
//   }
// }

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/film',
      component: Film,
      children: [
        {
          path: 'nowplaying',
          component: Nowplaying
        },
        {
          path: 'comingsoon',
          component: Comingsoon
        },
        {
          path: '',
          redirect: '/film/nowplaying'
        }
      ]
    },
    {
      path: '/center',
      component: Center
    },
    {
      path: '/cinema',
      component: Cinema
    },
    {
      path: '/detail/:id', //  /detail/aa 动态路由
      name: 'detail',
      component: Detail
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '*',
      redirect: '/film'
    }
  ]
})

// //全局守卫,任何路由跳转都会进到这个回调函数中
// router.beforeEach((to,from,next) => {
//   // console.log(to);
//   if(to.path == '/center'){
//     // console.log('盘查');

//     if(auth.isLogin()){
//       next();
//     }else{
//       next("/login");
//     }
//   }else{
//     // console.log('放行');
//     next();
//   }
// })

export default router
