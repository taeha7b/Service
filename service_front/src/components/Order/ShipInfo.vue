<template>
  <div class="ship-info-wrap">
    <div v-if="$store.state.showModal" @close="$store.state.showModal = false">
      <address-modal></address-modal>
    </div>
    <div class="ship-info-title-warp">
      <span class="ship-info-title">배송지 정보</span>
      <span class="same-as-orderer">
        <span
          class="checked-false"
          v-if="this.checked === false"
          @click="toggleCheck"
        />
        <span class="checked-true" v-else @click="toggleCheck" />
        &nbsp; 주문자 정보와 동일
        <div class="address-modal" id="show-modal" @click="$store.state.showModal = true">
          입력하기
        </div>
      </span>
    </div>
    <span class="ship-info-table">
      <div class="name-row">
        <span class="name">수령인</span>
        <span class="name-input"
          ><input v-model="$store.state.shipList.name" type="text" placeholder="이름"
        /></span>
      </div>
      <div class="phone-row">
        <span class="phone">휴대폰</span>
        <span class="phone-input"
          ><div class="phone-wrap">
            <input v-model="$store.state.shipList.phone1" type="number" />&nbsp;-&nbsp;<input
              v-model="$store.state.shipList.phone2"
              type="number"
            />&nbsp;-&nbsp;<input
              v-model="$store.state.shipList.phone3"
              type="number"
            />&nbsp;&nbsp;
          </div></span
        >
      </div>
      <div class="address-row">
        <span class="address">배송주소</span>
        <span class="address-input">
          <div class="address-wrap-top">
            <input
              disabled
              v-model="$store.state.shipList.address.zonecode"
              class="postal-code"
              type="text"
            />&nbsp;&nbsp;<button
              @click="switchDaumAddress"
              class="find-postcode"
              type="button"
            >
              우편번호 찾기
            </button>
          </div>
          <div class="address-wrap-mid">
            <vue-daum-postcode
              v-if="this.showDaumAddress === true"
              @complete="$store.state.shipList.address = $event"
            />
            <button
              @click="switchDaumAddress"
              class="close-btn"
              type="button"
            />
          </div>
          <div class="address-wrap-bottom">
            <input
              disabled
              v-model="$store.state.shipList.address.address"
              class="address-city"
              type="text"
            />
            <input
              v-model="$store.state.shipList.address_detail"
              class="address-detail"
              type="text"
            />
          </div>
          <div class="attention">
            * 제주도, 도서 산간 지역 등은 배송이 하루 이상 추가 소요될 수
            있습니다
          </div>
        </span>
      </div>
      <div class="delivery-row">
        <span class="delivery">배송메모</span>
        <span class="delivery-input">
          <select v-model="$store.state.selected" class="delivery-note">
            <option
              v-for="option in options"
              v-bind:value="option.value"
              :key="option.value"
            >
              {{ option.text }}
            </option>
          </select>
          <input
            v-if="$store.state.selected == 5"
            v-model="memo"
            type="text"
            class="direct-input"
            name="input-from-select"
            placeholder="50자 이내로 작성해주세요"
            maxlength="50"
          />
        </span>
      </div>
    </span>
  </div>
</template>

<script>
import VueDaumPostcode from "vue-daum-postcode";
import AddressModal from "../../components/Order/AddressModal.vue";

export default {
  components: {
    AddressModal,
  },
  data: () => ({
    memo: "",
    options: [
      { text: "배송시 요청사항을 선택해주세요", value: "0" },
      { text: "문 앞에 놓아주세요", value: "1" },
      { text: "경비(관리)실에 맡겨주세요", value: "2" },
      { text: "택배함에 넣어주세요", value: "3" },
      { text: "직접 받겠습니다", value: "4" },
      { text: "직접 입력", value: "5" },
    ],
    checked: false,
    showDaumAddress: false,
  }),
  props: ["ordererlist"],
  updated() {
    if (this.$store.state.selected == 0) {
      this.$store.state.shipList.memo = "";
      this.memo = "";
    } else if (this.$store.state.selected == 1) {
      this.$store.state.shipList.memo = "문 앞에 놓아주세요";
      this.memo = "";
    } else if (this.$store.state.selected == 2) {
      this.$store.state.shipList.memo = "경비(관리)실에 맡겨주세요";
      this.memo = "";
    } else if (this.$store.state.selected == 3) {
      this.$store.state.shipList.memo = "택배함에 넣어주세요";
      this.memo = "";
    } else if (this.$store.state.selected == 4) {
      this.$store.state.shipList.memo = "직접 받겠습니다";
      this.memo = "";
    } else if (this.$store.state.selected == 5) {
      this.$store.state.shipList.memo = this.memo;
    }
  },
  methods: {
    toggleCheck(e) {
      e.preventDefault();
      if (this.ordererlist.name.length < 1) {
        alert("이름을 입력해주세요.");
        this.checked = false;
      } else if (
        this.ordererlist.phone1.length < 1 ||
        this.ordererlist.phone2.length < 1 ||
        this.ordererlist.phone3.length < 1
      ) {
        alert("전화번호를 입력해주세요.");
        this.checked = false;
      } else if (this.checked === true) {
        this.$store.state.shipList.name = "";
        this.$store.state.shipList.phone1 = "";
        this.$store.state.shipList.phone2 = "";
        this.$store.state.shipList.phone3 = "";
        this.checked = false;
      } else {
        this.$store.state.shipList.name = this.ordererlist.name;
        this.$store.state.shipList.phone1 = this.ordererlist.phone1;
        this.$store.state.shipList.phone2 = this.ordererlist.phone2;
        this.$store.state.shipList.phone3 = this.ordererlist.phone3;
        this.checked = true;
      }
    },
    switchDaumAddress() {
      if (!this.showDaumAddress) {
        this.showDaumAddress = true;
      } else {
        this.showDaumAddress = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ship-info-wrap {
  input {
    padding: 13px;
    color: #8d8d8d;
    background-color: #f5f5f5;
    &::placeholder {
      font-size: 0.9em;
    }
  }
  .ship-info-title-warp {
    display: flex;
    justify-content: space-between;
    margin-top: 90px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    span {
      margin: auto 0;
    }
    .ship-info-title {
      font-size: 1.8em;
    }
    .same-as-orderer {
      display: flex;
      justify-content: space-between;
      font-size: 1.5em;
      span {
        margin: auto 0;
        width: 25px;
        height: 25px;
        background-size: 25px;
        cursor: pointer;
      }
      .checked-false {
        background-image: url("https://web-staging.brandi.co.kr/static/2020.7.3/images/checkbox_n.png");
      }
      .checked-true {
        background-image: url("https://web-staging.brandi.co.kr/static/2020.7.3/images/checkbox_s.png");
      }
      div {
        margin-left: 20px;
        font-weight: bold;
        color: #1e88e5;
        cursor: pointer;
      }
    }
  }
  .ship-info-table {
    border-bottom: 1px solid black;
    span {
      margin: auto 0;
      padding: 15px;
    }
    .name-row,
    .phone-row {
      display: flex;
      justify-content: end;
      border-bottom: 1px solid #bdbdbd;
      .name {
        width: 221px;
        font-weight: bold;
      }
      .name-input {
        width: 968px;
        input {
          width: 105%;
          height: 42px;
        }
      }
      .phone {
        width: 221px;
        font-weight: bold;
      }
      .phone-input {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 968px;
        input {
          width: 80px;
          height: 42px;
          text-align: center;
        }
      }
    }
    .attention {
      font-size: 0.85em;
      color: #8d8d8d;
    }
    .address-row {
      display: flex;
      justify-content: end;
      height: inherit;
      border-bottom: 1px solid #bdbdbd;
      .address {
        width: 221px;
        font-weight: bold;
      }
      .vue-daum-postcode {
        margin: 6px 0;
        border: 1px solid black;
        z-index: 9999;
        .close-btn {
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          background-color: red;
        }
      }
      .address-input {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 968px;
        input {
          width: 330px;
          height: 42px;
          margin: 4px 0;
        }
        .find-postcode {
          width: 94px;
          height: 42px;
          color: white;
          background-color: #4c4c4c;
          font-size: 0.8em;
          font-weight: bold;
        }
      }
    }
    .delivery-row {
      display: flex;
      justify-content: end;
      border-bottom: 1px solid #bdbdbd;
      .delivery {
        width: 221px;
        font-weight: bold;
      }
      .delivery-input {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 968px;
        input,
        select {
          margin: 5px 0;
        }
        .delivery-note {
          width: 105%;
          height: 46px;
          padding: 13px;
          font-size: 0.9em;
          color: #8d8d8d;
          background-image: url("https://web-staging.brandi.co.kr/static/2020.7.3/images/ic-arrow-bl-down@3x.png");
          background-size: 13px;
          background-position: 98% 50%;
          background-color: #f5f5f5;
        }
        input {
          width: 105%;
          height: 42px;
        }
      }
    }
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
