import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import {useEffect, useState} from 'react';
import Display from './Display/display';

function App() {
  const messaging = firebase.messaging();
  let token = '';
  const onSubscribe = () => {
    Notification.requestPermission().then( async (permission) => {
      if(permission === 'granted') {
        token = await messaging.getToken({vapidKey: "BHlRjqhkM1vSlVXMdvHz7we_TqHkKkxgyOM4xDyVO7ZN84Mi_13wNDQ5ZGS6ci3TVUQixxAfM9qcg5PZ6jI19ks"});
        const tokenref = firebase.database().ref('tokens');
        const userToken = {
          value: token
        }
        
        tokenref.on('value', snapshot => {
          const tokenStore = snapshot.val();
          
              let flag = false;
              for (let id in tokenStore){
                if(tokenStore[id].value === userToken.value){
                  flag = true;
                }
                
              }
              if(flag === false) {
                tokenref.push(userToken);
                console.log('Data Saved Successfully');
              }else{
                console.log("User token already added!");
              }
          
          
        })
        // tokenref.push(userToken)

      }
    }).catch(err => console.log(err));
    
    
  }


  
  
  const sendNotification = async () => {
    setShow(true);
   
    const tokenref = firebase.database().ref("tokens");
    tokenref.on('value', (snapshot) => {
        const userToken = snapshot.val();
        for( let id in userToken) {

          let body = {
            to:  userToken[id].value,
            notification : {
              title: 'This is a test notification',
              body: 'this is a test message'
            }
          }
          let options = {
            method: "POST",
            headers : new Headers({
              "Authorization": "key=AAAAMJMO3lo:APA91bEQJUMuF_549YzoAxDOhdBb891wdBwzCxgrfqj1xucimA2uQ9-w5sU5x3q-BIG2wC_pkoqmYIvL_Yx7OBCAVxGxSJ7h_MFu6X8sR3JNJDChpNT4765CTGKhlWUP-W8XEq_Ac7bN",
              "Content-Type" : "application/json"
            }),
            body: JSON.stringify(body)
          }
           fetch('https://fcm.googleapis.com/fcm/send', options).then( res=> {console.log("SENT")}).catch(err => console.log(err));
         
        }
    })
    
    
  }
  
  const [title,setTitle] = useState('');
  const [message,setMessage] = useState('');
  // messaging.onMessage( res => {
  //   console.log(res);
  //   setTitle(res.notification.title);
  //   setMessage(res.notification.message);
  // })
  const [show,setShow] = useState(false);
  


  return (
    <div className="App">
      <button type="button" onClick = {onSubscribe}>Subscribe</button>
      <button type="button" onClick = {sendNotification}> Send Notification </button>
      <Display title={title} message={message}/>
    </div>
  );
}

export default App;
