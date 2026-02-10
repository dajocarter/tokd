import { useState } from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const history = useHistory()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      if (!email || !password) {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }
      await signIn(email, password)
      history.push('/tab1')
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
      setLoading(false)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {error && <div className='error-message'>{error}</div>}
        <IonItem>
          <IonLabel position='stacked'>Email</IonLabel>
          <IonInput
            type='email'
            value={email}
            onIonChange={(e: any) => setEmail(e.detail.value)}
            disabled={loading}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Password</IonLabel>
          <IonInput
            type='password'
            value={password}
            onIonChange={(e: any) => setPassword(e.detail.value)}
            disabled={loading}
          />
        </IonItem>
        <div style={{ padding: 16 }}>
          <IonButton
            color='primary'
            expand='block'
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <IonSpinner name='crescent' /> : 'Sign In'}
          </IonButton>
          <IonButton
            color='medium'
            routerLink='/'
            fill='clear'
            expand='block'
            disabled={loading}
          >
            Back
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
