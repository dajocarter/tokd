import React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'
import './Splash.css'

export default function Splash() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Tok'd</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='splash-content' fullscreen>
        <div className='splash-center'>
          <h2>Discover and log your sesh-ins</h2>
          <p>Sign up or log in to get started.</p>
          <div className='splash-actions'>
            <IonButton routerLink='/signup' expand='block'>
              Sign Up
            </IonButton>
            <IonButton routerLink='/login' fill='outline' expand='block'>
              Log In
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
