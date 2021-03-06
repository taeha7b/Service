import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main/Main.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'
import Auth from '../views/Signup/Auth/Auth.vue'
import Agree from '../views/Signup/Agree/Agree.vue'
import Info from '../views/Signup/Info/Info.vue'
import Success from '../views/Signup/Success/Success.vue'
import ProductList from '../views/ProductList/Categories.vue'
import ProductDetails from '../views/ProductDetails/ProductDetails.vue'
import Order from '../views/Order/Order.vue'
import OrderResult from '../views/Order/OrderResult.vue'
import Mypage from '../views/Mypage/Mypage.vue'
import OrderInquiry from '../views/Mypage/OrderInquiry/OrderInquiry.vue'
import Coupon from '../views/Mypage/Coupon/Coupon.vue'
import QnA from '../views/Mypage/Qna/Qna.vue'
import RefundRequest from '../views/Mypage/RefundRequest/RefundRequest.vue'
import Refund from '../views/Mypage/RefundRequest/Refund/Refund.vue'
import Result from '../views/Mypage/RefundRequest/Refund/Result/Result.vue'
import MypageOrderDetail from '../views/Mypage/OrderDetail/OrderDetail.vue'
import CancelReques from '../views/Mypage/CancelReques/CancelReques.vue'
import Cancel from '../views/Mypage/CancelReques/Cancel/Cancel.vue'
import CancelResult from '../views/Mypage/CancelReques/Cancel/CancelResult/CancelResult.vue'
import Event from '../views/Event/Event.vue'
import Search from '../views/Search/Search.vue'
import GSignInButton from 'vue-google-signin-button'
import VueCookies from "vue-cookies"

Vue.use(VueRouter);
Vue.use(GSignInButton);
Vue.use(VueCookies);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: function (to, from, next) {
        if (!window.$cookies.isKey('accesstoken')) {
          next();
        } else {
          alert('이미 로그인하였습니다.');
        }
      },
    },
    {
      path: "/signup",
      component: Signup,
      children: [
        {
          path: "",
          component: Auth,
        },
        {
          path: "agree",
          component: Agree,
        },
        {
          path: "info",
          component: Info,
        },
        {
          path: "success",
          component: Success,
        },
      ],
    },
    {
      path: "/categories/:id/products",
      name: "ProductList",
      component: ProductList,
    },
    {
      path: "/products/:id",
      name: "ProductDetails",
      component: ProductDetails,
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      beforeEnter: function (to, from, next) {
        if (window.$cookies.isKey('accesstoken')) {
          next();
        } else {
          alert('로그인 후 이용해주세요.');
          next('/login');
        }
      },
    },
    {
      path: "/order/result",
      name: "OrderResult",
      component: OrderResult,
      beforeEnter: function (to, from, next) {
        if (window.$cookies.isKey('accesstoken')) {
          next();
        } else {
          alert('로그인 후 이용해주세요.');
          next('/login');
        }
      },
    },
    {
      path: "/mypage",
      component: Mypage,
      beforeEnter: function (to, from, next) {
        if (window.$cookies.isKey('accesstoken')) {
          next();
        } else {
          alert('로그인 후 이용해주세요.');
          next('/login');
        }
      },
      children: [
        {
          path: "",
          component: OrderInquiry,
        },
        {
          path: "coupon",
          component: Coupon,
        },
        {
          path: "qna",
          component: QnA,
        },
        {
          path: "refund",
          component: RefundRequest,
          children: [
            {
              path: "",
              component: Refund,
            },
            {
              path: "result",
              component: Result,
            },
          ],
        },
        {
          path: "cancel",
          component: CancelReques,
          children: [
            {
              path: "",
              component: Cancel,
            },
            {
              path: "result",
              component: CancelResult,
            },
          ],
        },
      ],
    },
    {
      path: "/order/detail",
      name: "OrderDetail",
      component: MypageOrderDetail,
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
    },
    {
      path: "/event",
      name: "Event",
      component: Event,
    },
  ],
});

router.beforeEach(function (to, from, next) {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  next();
});