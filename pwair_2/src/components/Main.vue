<template>
    <div id="main" :class="bgColorCls">
        
    </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
        crtPosition : '',
        bgColorCls : 'good',
        latitude : '',
        longitude : '',
    }
  },
  created () {
    const crtPosition = navigator.geolocation.getCurrentPosition(function(e){
        let latitude = e.coords.latitude;
        let longitude = e.coords.longitude;

        naver.maps.Service.reverseGeocode({
            location: new naver.maps.LatLng(latitude, longitude),
        }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }

            var result = response.result, // 검색 결과의 컨테이너
                items = result.items; // 검색 결과의 배열
                console.log(result, items);

        })
    });
  },
  methods : {
      
  }
  
}
</script>

<style scoped>
    #main {
        height:100%;
    }
    #main.good {
        background-color:#53dcbf;
    }
    #main.normal {
        background-color:#fe9f1f;
    }
    #main.bad {
        background-color:#fa4659;
    }
</style>
