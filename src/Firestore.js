import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgVXWqE04axUuwyKcEdr5PoVv-4KD8lCU",
  authDomain: "testproject-e1d8b.firebaseapp.com",
  projectId: "testproject-e1d8b",
  storageBucket: "testproject-e1d8b.appspot.com",
  messagingSenderId: "285480043942",
  appId: "1:285480043942:web:673629db8b2d6e76047b67",
  measurementId: "G-H2DG9SC7NF",
};
// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
