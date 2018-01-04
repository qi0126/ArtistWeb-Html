import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Login from '@/pages/login/login'
import Production from '@/pages/productionManager/production'
import AddProduction from '@/pages/productionManager/addProduction'
import CustomerManager from '@/pages/customerManager/customerManager'
import ContactWe from '@/pages/companyManager/contactWe'
import CompanySetting from '@/pages/companyManager/companySetting'
import AboutWe from '@/pages/companyManager/aboutWe'
import PositionSetting from '@/pages/companyManager/positionSetting'

import promotion from '@/pages/promotion/promotion'
import sale from '@/pages/sale/sale'
import saleteam from '@/pages/sale/saleteam'
import textPromo from '@/pages/promoColumn/textPromo'
import speedPromo from '@/pages/promoColumn/speedPromo'
import promoDisplay from '@/pages/promoColumn/promoDisplay'
import carouselSetting from '@/pages/promoColumn/carouselSetting'
import findContent from '@/pages/promoColumn/findContent'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [{
          path: '/',
          redirect: '/index/production'
        },
        {
          path: 'production',
          component: Production
        },
        {
          path: 'addProduction',
          component: AddProduction
        },
        {
          path: 'customerManager',
          component: CustomerManager
        },
        {
          path: 'contactWe',
          component: ContactWe
        },
        {
          path: 'companySetting',
          component: CompanySetting
        },
        {
          path: 'positionSetting',
          component: PositionSetting
        },
        {
          path: 'aboutWe',
          component: AboutWe
        },
        {
          path: 'sale',
          component: sale
        },
        {
          path: 'saleteam',
          component: saleteam
        },
        {
          path: 'promotion',
          component: promotion
        },
        {
          path: 'textPromo',
          component: textPromo
        },
        {
          path: 'speedPromo',
          component: speedPromo
        },
        {
          path: 'promoDisplay',
          component: promoDisplay
        },
        {
          path: 'carouselSetting',
          component: carouselSetting
        },
        {
          path: 'findContent',
          component: findContent
        },
      ],
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
