import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './index.css'

export default function Account() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Account page' />
      </IonContent>
    </IonPage>
  )
}
