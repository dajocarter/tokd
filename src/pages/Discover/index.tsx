import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './index.css'

export default function Discover() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discover</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Discover</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Discover page' />
      </IonContent>
    </IonPage>
  )
}
