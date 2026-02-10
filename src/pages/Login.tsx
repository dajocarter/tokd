import React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'

export default function Login() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <p>Placeholder login page. Implement auth flow here.</p>
        <IonButton routerLink='/' expand='block'>
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
