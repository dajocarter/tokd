import React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'

export default function Signup() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <p>Placeholder signup page. Implement registration flow here.</p>
        <IonButton routerLink='/' expand='block'>
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
