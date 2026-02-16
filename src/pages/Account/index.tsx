import {
  IonContent,
  IonHeader,
  IonPage,
  IonFooter,
  IonTitle,
  IonButton,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import { useAuth } from '../../context/AuthContext'
import './index.css'

export default function Account() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }
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
      <IonFooter>
        <IonToolbar>
          <IonButton color='danger' expand='block' onClick={handleLogout}>
            Logout
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}
