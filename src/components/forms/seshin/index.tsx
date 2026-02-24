import { useEffect, useState } from 'react'
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'
import { Product } from '../product'

export type SeshIn = {
  id: string
  productId?: string
  rating: number
  notes?: string
}

export default function SeshForm({
  products,
  onCancel,
  onCreate,
}: {
  products: Product[]
  onCancel: () => void
  onCreate: (productId?: string, rating?: number, notes?: string) => void
}) {
  const [productId, setProductId] = useState<string | undefined>(
    products[0]?.id,
  )
  const [rating, setRating] = useState<number>(3)
  const [notes, setNotes] = useState('')
  useEffect(() => {
    if (!productId && products[0]) setProductId(products[0].id)
  }, [products])
  return (
    <div className='form-sheet'>
      <h3>Create Sesh-in</h3>
      <IonList>
        <IonItem>
          <IonLabel position='stacked'>Product</IonLabel>
          <IonSelect
            value={productId}
            onIonChange={(e: any) => setProductId(e.detail.value)}
          >
            <IonSelectOption value={undefined}>(none)</IonSelectOption>
            {products.map((p) => (
              <IonSelectOption key={p.id} value={p.id}>
                {p.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Rating (0-5)</IonLabel>
          <IonInput
            type='number'
            value={String(rating)}
            onIonChange={(e: any) => setRating(Number(e.detail.value) || 0)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Notes</IonLabel>
          <IonTextarea
            value={notes}
            onIonChange={(e: any) => setNotes(e.detail.value)}
          />
        </IonItem>
      </IonList>
      <div className='form-actions'>
        <IonButton color='medium' onClick={onCancel} fill='outline'>
          Cancel
        </IonButton>
        <IonButton onClick={() => onCreate(productId, rating, notes.trim())}>
          Create
        </IonButton>
      </div>
    </div>
  )
}
