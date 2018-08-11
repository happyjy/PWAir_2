<template>
  <div id="login">
      <div class="inner">
        <p class="logo"><i class="fab fa-soundcloud"></i></p>
        <h1>PWAir</h1>
        <form class="loginForm">
            <p>
                <i class="far fa-envelope"></i>
                <input type="text" placeholder="E-mail" id="email"/>
            </p>
            <p>
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" id="password"/>
            </p>
            <div class="btnWrap">
                <button id="Login" @click="gLogin">LOGIN</button>
                <button id="googleLogin" @click="googleLogin">GOOGLE LOGIN</button>
                <!-- <button id="emailLogin" @click="facebookLogin">FACEBOOK LOGIN</button> -->
            </div>
        </form>
      </div>
  </div>
</template>

<script>
// require('../js/auth.js');
export default {
  name: 'Login',
  data () {
    return {
      hi: 3
    }
  },
  created () {

  },
  methods : {
    gLogin(event){
        event.preventDefault();
        let me = this;
        if (this.exceptionHandler()) return true;
        firebase.auth().signInWithEmailAndPassword(this.getEmail(), this.getPassword()).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
        }).then(function (user) {
            console.log(user);
            me.$router.push('Main');
        });
    },
    googleLogin () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(result);
            console.log("token : ", token);
            console.log("user : ", user);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log("errorCode: " + errorCode + ". errorMessage : " + errorMessage + ". email : " + email);
        });
    },
    exceptionHandler() {
        if ( this.getEmail() === "" || this.getPassword() === "") {
            alert("enter the email and password");
            return true;
        }
        return false;
    },
    getEmail () {
        return document.getElementById('email').value;
        console.log(email);
    },

    getPassword () {
    return document.getElementById('password').value;
        console.log(pass);
    },

  }
}
</script>

<style scoped>
    #login {
        display:table;
        height:100%;
        width:100%;
        box-sizing:border-box;
        padding:10px 40px;
        background-color:#33435d;
        color:#fff;
    }
    #login .inner {
        display:table-cell;
        vertical-align:middle;
    }
    #login .logo {
        font-size:100px;
        color:#3dc7cb;
    }
    #login h1 {
        font-size:26px;
        font-weight:100;
        margin-top:-27px;
        color:rgba(255,255,255,0.9);
    }
    .loginForm {
        margin-top:80px;
    }
    .loginForm p {
        position:relative;
        margin-top:25px;
    }
    .loginForm input {
        display:block;
        width:100%;
        height:40px;
        box-sizing:border-box;
        padding:0 10px 0 40px;
        border:none;
        border-bottom:1px solid rgba(255,255,255,0.2);
        background:none;
        font-size:1em;
        letter-spacing:1px;
        color:#fff;
    }
    .loginForm input:focus, .btnWrap button:focus {
        outline:none;
        background:none;
    }
    ::placeholder {
        color:#fff;
        opacity:1;
    }
    :-ms-input-placeholder {
        color:#fff;
    }
    ::-ms-input-placeholder {
        color:#fff;
    }
    .loginForm i {
        position:absolute;
        top:9px;
        left:3px;
        font-size:18px;
    }
    .btnWrap {
        margin-top:50px;
    }
    .btnWrap button {
        width:100%;
        height:55px;
        color:#fff;
        border-radius:5px;
        border:none;
        font-size:1.2em;
        margin-top:10px;
        background: #3fbeaf;
        background: -moz-linear-gradient(left, #3fbeaf 0%, #02b6d1 100%);
        background: -webkit-linear-gradient(left, #3fbeaf 0%,#02b6d1 100%);
        background: linear-gradient(to right, #3fbeaf 0%,#02b6d1 100%);
    }

</style>
