<template>
    <div id="main" :class="appStyle">
      <!--
        <div v-for="(value, key) in AirInfo" v-bind:key="key">
          {{ key }}: {{ value }}
        </div>
        -->
      <div class="tbCont">
        <div class="clCon">
          <h1>{{AirInfo.IDEX_MVL}}</h1>
          <h2>{{AirInfo.MSRSTE_NM}}의 대기는 지금 {{AirInfo.IDEX_NM}}</h2>
          <p class="date">기준 : {{AirInfo.MSRDT}}</p>
        </div>
      </div>
      <ul>
        <li><p>미세먼지</p>{{AirInfo.PM10}}</li>
        <li><p>오존</p>{{AirInfo.O3}}</li>
        <li><p>초미세먼지</p>{{AirInfo.PM25}}</li>
      </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      crtPosition: "",
      bgColorCls: "good",
      latitude: "",
      longitude: "",
      AirInfo: {},
      appStyle: ""
    };
  },
  created() {
    this.fetchData();
    // const crtPosition = navigator.geolocation.getCurrentPosition(function(e){
    //     let latitude = e.coords.latitude;
    //     let longitude = e.coords.longitude;
    //     let self = this;

    //     naver.maps.Service.reverseGeocode({
    //         location: new naver.maps.LatLng(latitude, longitude),
    //     }, function(status, response) {
    //         if (status !== naver.maps.Service.Status.OK) {
    //             return alert('Something wrong!');
    //         }

    //         var result = response.result, // 검색 결과의 컨테이너
    //             items = result.items; // 검색 결과의 배열
    //             console.log(result, items);

    //         var url = "http://openapi.seoul.go.kr:8088/4d496d757a6f6b7738326d636e6468/json/RealtimeCityAir/1/100"

    //         return this.$http.get(url).then(function (result) {
    //           if (result.body.RealtimeCityAir.RESULT.CODE == "INFO-000") {
    //             var airData = result.body.RealtimeCityAir.row[21];
    //             console.log("the data was well received");
    //             // console.log(airData);
    //             self.setAirStatus(airData);
    //             self.updateAppColor(airData.IDEX_NM);
    //           }
    //         }, function (error) {
    //           console.log("Failed at calling OPEN API", error);
    //         });
    //     })
    // });
  },
  methods: {
    fetchData(districtName) {
      var self = this;
      // 한글 URL 로 HTTP GET 요청시 발생하는 인코딩 문제 해결 필요
      var decodedURL = districtName;
      var url =
        "http://openapi.seoul.go.kr:8088/4d496d757a6f6b7738326d636e6468/json/RealtimeCityAir/1/100";
      // 권역 선택 + 자치구 선택
      // http://openAPI.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/5/동북권/성북구
      console.log(url);
      return axios.get(url).then(
        function(result) {
          if (result.data.RealtimeCityAir.RESULT.CODE == "INFO-000") {
            var airData = result.data.RealtimeCityAir.row[21];
            console.log("the data was well received");
            // console.log(airData);
            self.setAirStatus(airData);
            self.updateAppColor(airData.IDEX_NM);
          }
        },
        function(error) {
          console.log("Failed at calling OPEN API", error);
        }
      );
    },
    setAirStatus(airData) {
      this.AirInfo.MSRDT = airData.MSRDT;
      this.AirInfo.IDEX_NM = airData.IDEX_NM;
      this.AirInfo.PM10 = airData.PM10;
      this.AirInfo.PM25 = airData.PM25;
      this.AirInfo.O3 = airData.O3;
      this.AirInfo.MSRSTE_NM = airData.MSRSTE_NM;
      this.AirInfo.IDEX_MVL = airData.IDEX_MVL;
    },
    updateAppColor(status) {
      switch (status) {
        case "나쁨":
          this.appStyle = "bad";
          break;
        case "보통":
          this.appStyle = "normal";
          break;
        case "좋음":
          this.appStyle = "good";
          break;
        default:
      }
    }
  }
};
</script>

<style scoped>
#main {
  height: 100%;
  color:#fff;
}
#main.good {
  background-color: #53dcbf;
}
#main.normal {
  background-color: #fe9f1f;
}
#main.bad {
  background-color: #fa4659;
}
#main ul {
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
  list-style:none;
  overflow:hidden;
  background:rgba(255,255,255,0.2);
}
#main ul li {
  float:left;
  width:33.33%;
  padding:30px 0;
  text-align:center;
}
#main li p {
  padding-bottom:15px;
}
.tbCont {
  display:table;
  width:100%;
  height:100%;
  box-sizing:border-box;
  padding-bottom:113px;
}
.clCon {
  display:table-cell;
  vertical-align:middle;
}
</style>
