<template>
  <div class="refund-wrap">
    <div class="refund-title">
      <h1>환불요청</h1>
    </div>
    <div class="refund-box">
      <h2>{{ refundDate }} <span></span>{{ refundData.order_detail_number }} <a class="btn-order">주문상세보기<img src="https://web-staging.brandi.co.kr/static/2020.7.3/images/ic-titleic-detailpage-moreaction@3x.png" /></a></h2>
      <div class="order-item">
        <dl>
          <dt><a>{{ refundData.seller_name }}</a></dt>
          <dt></dt>
          <dt>주문금액</dt>
          <dt>진행상황</dt>
        </dl>
        <dl class="order-info">
          <dd>
            <img :src="refundData.images" />
          </dd>
          <dd>
            <span class="item-title">{{ refundData.product_name }}</span>
            <span>{{ refundData.color }}/{{ refundData.size }}</span>
            <span>{{ refundData.quantity }} 개</span>
          </dd>
          <dd>
            <strong>{{ Number(refundData.final_price).toLocaleString() }} 원</strong>
          </dd>
          <dd>
            <strong v-if="refundData.order_detail_statuses_id === 1">결제완료</strong>
            <strong v-else-if="refundData.order_detail_statuses_id=== 2">상품준비중</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 3">배송중</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 4">배송완료</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 5">구매확정</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 6">주문취소완료</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 7">환불요청</strong>
            <strong v-else-if="refundData.order_detail_statuses_id === 8">환불완료</strong>
          </dd>
        </dl>
      </div>
    </div>
    <div class="order-refund">
      <h2>환불사유</h2>
      <div class="refund-select">
        <dl>
          <dt>사유</dt>
          <dd>
            <select v-model="selected" class="bank-select">
              <option v-for="option in options" v-bind:key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>환불사유</dt>
          <dd>
            <textarea v-model="reason" placeholder="(선택) 세부 내용을 입력하세요." />
          </dd>
        </dl>
      </div>
    <h2>환불정보</h2>
      <dl class="order-totalpay">
        <dd class="order-totalpay-title">총 환불예정금액</dd>
        <dd class="order-totalpay-title red order-rigth">{{ Number(refundData.final_price).toLocaleString() }} 원</dd>
      </dl>
    </div>
    <div class="btn-wrap">
      <button @click="refundBtn">환불요청하기</button>
    </div>
    </div>
</template>

<script>
import { axios } from '../../../../plugins/axios';
import {config} from "../../../../api/apiConfig"

export default {
  data:() => ({
    selected: '0',
    reason:'',
    options: [
      { text: '사유를 선택하세요.', value: '0' },
      { text: '단순변심', value: '1' },
      { text: '상품불량', value: '2' },
      { text: '오배송', value: '3' },
      { text: '교환요청', value: '4' },
      { text: '일부상품누락', value: '5' },
      { text: '기타', value: '6' },
    ],
    refundData:[],
    refundDate:''
  }),
  methods:{
    refundBtn(){
      if(this.selected == 0){
        alert('환불사유를 선택해주세요.');
      }else{
        let confirmResult = confirm('해당 상품을 환불요청하시겠습니까?');
        if(confirmResult){
          this.$store.state.resultSelected = this.selected;
          this.$store.state.resultTotal = this.refundData.final_price;
          axios({
            url: `${config.API}refund`,
            method: 'PUT',
            data: {
              order_detail_number: this.refundData.order_detail_number,
              order_refund_reason_id: this.selected,
              order_refund_reason_description: this.reason,
              order_detail_id: this.refundData.order_detail_id
            },
            headers: { 
                'Authorization': this.$cookies.get('accesstoken')
            }
            })
            .then((response) => {
              localStorage.removeItem("refundData");
              this.$router.push({path: '/mypage/refund/result'});
            })
            .catch((error) => {
              console.log(error.response);
          })
        }
      }
    }
  },
  mounted: function () {
    this.$store.state.myPageShow = false;
    this.refundData = JSON.parse(localStorage.getItem('refundData'));
    this.refundDate = JSON.parse(localStorage.getItem('date'));
  }
}
</script>

<style lang="scss" scoped>
.refund-wrap{
  padding: 0px 20px;

  .refund-title{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 0px 20px 0px;
    margin-bottom: 30px;

    h1{
      font-size: 28px;
      text-align: center;
      margin-bottom: 15px;
    }
  }

  .refund-box{
    h2{
    font-size: 26px;
    padding-bottom: 16px;
    margin-top: 50px;

    span{
      border-right: solid 2px #000;
      margin: 0 10px;
      padding-top: 19px;
      font-size: 0;
      line-height: 0;
    }

    a{
      font-weight: bold;
    }
  }

  .btn-order{
      font-size: 24px;
      float: right;
      margin-top: 3px;

      img{
        width: 10px;
        height: 27px;
        max-height: 20px;
        vertical-align: text-bottom;
        margin-left: 4px;
        margin-bottom: 4px;
      }
    } 
  }

  .order-item{
    width: 100%;
    display: table;

    dl{
      width: 100%;
      display: table-row;

      dt{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        font-weight: 400;
        border-top: 1px solid #1e1e1e;
        padding: 10px;

        &:first-child{
          text-align: left;
          padding: 19px 10px;
          a{
            font-weight: bold;
          }
        }
      }

      dd{
        display: table-cell;
        text-align: center;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #1e1e1e;
        vertical-align: middle;

        &:first-child{
          width: 10%;
          padding: 15px 10px;

          img{
            width: 95px;
            height: 95px;
            display: block;
          }
        }

        &:nth-child(2){
          text-align: left;
        }

        .item-title{
          font-weight: 400;
          font-size: 16px;
          color:#000;
          display: block;
          margin-bottom: 4px;
        }

        span{
          font-size: 16px;
          font-weight: 300;
          color: #9e9e9e;
          display: block;
        }

        strong{
          font-size: 19px;
          color: #1e1e1e;
        }
      }
    }
  }

  .order-refund{
    h2{
      font-size: 26px;
      font-weight: 400;
      border-bottom: 1px solid #000;
      margin-top: 50px;
      padding-bottom: 15px;
    } 

    .refund-select{
      width: 100%;
      font-size: 1.2em;
      display: table;
      overflow: hidden;
      border-bottom: 1px solid #000;
      margin-bottom: 50px;

      dl{
        display: table-row;

        dt{
          width: 20%;
          font-weight: 700;
          display: table-cell;
          vertical-align: middle;
          padding: 10px 15px;
          border-bottom: 1px solid #bdbdbd;
        }

        dd{
          width: 80%;
          font-size: 15px;
          line-height: 48px;
          display: table-cell;
          border-bottom: 1px solid #bdbdbd;
          padding: 10px 15px;

          .bank-select{
            width: 150px;
            height: 43px;
            color: #8d8d8d;
            background: #f5f5f5;
            border: none;
            font-size: 14px;
            line-height: 22.5px;
            padding: 13px;
            margin: 3px 0px;
          }

          textarea{
            width: 100%;
            height: 100px;
            font-size: 14px;
            line-height: normal;
            color: #8d8d8d;
            border: none;
            background: #f5f5f5;
            margin: 3px 0px;
            padding: 13px;
          }
        }
      }
    }

    .order-totalpay{
      font-size: 15px;
      overflow: hidden;
      border-bottom: 1px solid #000;
      margin-bottom: 50px;
      padding: 20px 0;

      dd{
        width: 50%;
        text-align: left;
        float: left;
        padding: 10px 20px;
      }

      .order-totalpay-title{
        font-size: 26px;
        font-weight: bold;
      }

      .red{
        color: #FF204B;
      }

      .order-rigth{
        text-align: right;
      }
    }
  }
  
  .btn-wrap{
    display: flex;
    justify-content: center;
    align-items: center;

    button{
      width: 170px;
      height: 50px;
      font-size: 17px;
      text-align: center;
      line-height: 46px;
      color: #ffffff;
      display: block;
      background: #000000;
      border: 1px solid #000000;
      border-radius: 4px;
      padding: 0;

      &:focus{
        outline: none;
      }
    }
  }
}

@media screen and (min-width: 769px){
  .refund-wrap{
    max-width: 1300px;
    margin: 0 auto;
  }
}
</style>