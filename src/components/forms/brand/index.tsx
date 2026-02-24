import { useState } from 'react'
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react'

export type Brand = {
  id: string
  name: string
  description?: string
  website?: string
  logoUrl?: string
  profileUrl?: string
  createdAt: number
}

type Props = {
  onCancel: () => void
  onCreate: (
    name: string,
    desc?: string,
    logoUrl?: string,
    profileUrl?: string,
    website?: string,
  ) => void
}

export default function BrandForm({ onCancel, onCreate }: Props) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [website, setWebsite] = useState('')
  const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined)
  const [profilePreview, setProfilePreview] = useState<string | undefined>(
    undefined,
  )

  const readFile = (file: File | null, cb: (dataUrl: string) => void) => {
    if (!file) return
    const fr = new FileReader()
    fr.onload = () => cb(String(fr.result))
    fr.readAsDataURL(file)
  }

  return (
    <div className='form-sheet'>
      <h3>Create Brand</h3>
      <IonList>
        <IonItem>
          <IonLabel position='stacked'>Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e: any) => setName(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Description</IonLabel>
          <IonTextarea
            value={desc}
            onIonChange={(e: any) => setDesc(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Website</IonLabel>
          <IonInput
            value={website}
            onIonChange={(e: any) => setWebsite(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Logo image</IonLabel>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const f = (e.target as HTMLInputElement).files?.[0] ?? null
              readFile(f, (dataUrl) => setLogoPreview(dataUrl))
            }}
          />
        </IonItem>
        {logoPreview && (
          <div style={{ padding: 12 }}>
            <img
              src={logoPreview}
              alt='logo preview'
              style={{ maxWidth: 120, borderRadius: 6 }}
            />
          </div>
        )}
        <IonItem>
          <IonLabel position='stacked'>Profile image</IonLabel>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const f = (e.target as HTMLInputElement).files?.[0] ?? null
              readFile(f, (dataUrl) => setProfilePreview(dataUrl))
            }}
          />
        </IonItem>
        {profilePreview && (
          <div style={{ padding: 12 }}>
            <img
              src={profilePreview}
              alt='profile preview'
              style={{ maxWidth: 120, borderRadius: 6 }}
            />
          </div>
        )}
      </IonList>
      <div className='form-actions'>
        <IonButton color='medium' onClick={onCancel} fill='outline'>
          Cancel
        </IonButton>
        <IonButton
          onClick={() =>
            onCreate(
              name.trim(),
              desc.trim(),
              logoPreview,
              profilePreview,
              website.trim(),
            )
          }
          disabled={!name.trim()}
        >
          Create
        </IonButton>
      </div>
    </div>
  )
}
