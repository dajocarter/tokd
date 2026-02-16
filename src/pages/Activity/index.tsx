import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './index.css'

export default function Activity() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Activity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Activity</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Activity page' />
      </IonContent>
    </IonPage>
  )
}
