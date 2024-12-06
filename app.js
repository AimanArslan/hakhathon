// Import the functions you need from the SDKs you need
import { initializeApp } from "./firebase/database/app.js";
import { getAuth , signInWithEmailAndPassword , onAuthStatedChanged ,signOut } from "./firebase/auth";
import {getDatabase, set,ref,get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgCjOIllHqbQiO157HIdjf-uYd8P8fa4I",
  authDomain: "fire-blog-c2c1b.firebaseapp.com",
  projectId: "fire-blog-c2c1b",
  storageBucket: "fire-blog-c2c1b.firebasestorage.app",
  messagingSenderId: "715648645608",
  appId: "1:715648645608:web:98ff7f06b7d2e308564c5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getDatabase(app)


const my_blog = document.querySelector('.my-blog');
const login_page = document.querySelector('.login');

onAuthStatedChanged(auth,(user)=>{
  if(user){
    my_blog.classList.add('show')
    login_page.classList.add('hide')
  }else{

    my_blog.classList.remove('show')
    login_page.classList.remove('hide')

  }
})


function SignInUser(){
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    signInWithEmailAndPassword(auth,email,password).then((userCredinals)=>{
        console.log(userCredinals.user.uid)
    })
}

const Sign_btn= document.querySelector('#Sign-in')
Sign_btn.addEventListener('click' ,SignInUser)

// sign out / logout

const sign_out_btn =document.querySelector('#logout')
sign_out_btn.addEventListener('click' , ()=>{
  signOut(auth).then(()=>{

  }).catch((error)=>{
    console.log('error'+ error);
  })
}) 

// blog section code

const notifiy = document.querySelector('#.notifiy')

const add_post_btn= document.querySelector('#post_btn')

function Add_Post(){
  const title = document.querySelector('#title').value;
  const post_content = document.querySelector('#post_content').value;
  const id = Math.floor(Math.random()*100)

  set(ref(db,'post/' + id ),{
    title:title,
    post_content:post_content
  })
  notifiy.innerHTML = "data Added"
  document.querySelector('#title').value=""
  document.querySelector('#post_content').value=""
}


add_post_btn.addEventListener('click' ,Add_Post)


// get data from firebase Db
function GetPostData(){
  const user_ref = ref(db, 'post/')
   get(user_ref).then((snapshot)=>{
    const data = snapshot.val()
    console.log(data);
    

    let html= "";
    const table = document.querySelector('table')
    for(const key in data ){

      const titlepost_content= data [key]

    html+=`
    <tr>
      <td> <span class="postNumber"></snap></td>
      <td>${title}</td>
    </tr>
    `

    }

   })
}

GetPostData()