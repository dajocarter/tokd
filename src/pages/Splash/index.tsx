import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'
import './index.css'

export default function Splash() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='splash-toolbar'>
          <IonTitle className='splash-title'>Welcome to Tok'd</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='splash-content' fullscreen>
        <div className='splash-center'>
          <div className='splash-description'>
            <h2>forgetful are potheads</h2>
            <img
              src='/high-yoda.png'
              srcSet='/high-yoda.png 400w, /high-yoda@2x.png 800w'
              sizes='(max-width: 480px) 180px, (max-width: 768px) 280px, 360px'
              alt='forgetful pothead'
              loading='lazy'
              decoding='async'
              width={360}
              height={270}
            />
            <p>
              Remember what products you've used and how they made you feel.
            </p>
          </div>
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
