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
import { Brand } from '../brand'

export type Product = {
  id: string
  name: string
  brandId: string
  description?: string
  productUrl?: string
  strain?: string
  type?: {
    name: string
    weightMeasurement: string
    cannabinoidMeasurement: string
  }
  subtype?: string
  cannabinoids?: { name: string; amount: number }[]
  weight?: number
  effects?: string[]
  rating?: number
  createdAt: number
}

export default function ProductForm({
  brands,
  onCancel,
  onCreate,
}: {
  brands: Brand[]
  onCancel: () => void
  // kept as positional args for backwards-compatibility: name, brandId, desc,
  // strain, type, subtype, cannabinoids, weight
  onCreate: (
    name: string,
    brandId?: string,
    desc?: string,
    strain?: string,
    type?: {
      name: string
      weightMeasurement: string
      cannabinoidMeasurement: string
    },
    subtype?: string,
    cannabinoids?: { name: string; amount: number }[],
    weight?: number,
  ) => void
}) {
  const [name, setName] = useState('')
  const [brandId, setBrandId] = useState<string | undefined>(brands[0]?.id)
  const [desc, setDesc] = useState('')
  const [strain, setStrain] = useState<string | undefined>(undefined)

  const types = [
    {
      name: 'Flower',
      weightMeasurement: 'g',
      cannabinoidMeasurement: 'mg/g',
      subtypes: ['Bud', 'Pre-roll', 'Whole-plant'],
    },
    {
      name: 'Concentrate',
      weightMeasurement: 'g',
      cannabinoidMeasurement: 'mg/g',
      subtypes: ['Shatter', 'Wax', 'Live Resin'],
    },
    {
      name: 'Edible',
      weightMeasurement: 'mg',
      cannabinoidMeasurement: 'mg',
      subtypes: ['Gummies', 'Baked', 'Beverage'],
    },
    {
      name: 'Topical',
      weightMeasurement: 'mg',
      cannabinoidMeasurement: 'mg',
      subtypes: ['Cream', 'Patch'],
    },
  ]

  const [typeName, setTypeName] = useState<string | undefined>(types[0].name)
  const selectedType = types.find((t) => t.name === typeName) ?? types[0]
  const [subtype, setSubtype] = useState<string | undefined>(
    selectedType.subtypes[0],
  )

  const [cannabinoids, setCannabinoids] = useState<
    { name: string; amount: number }[]
  >([])
  const [weight, setWeight] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (!brandId && brands[0]) setBrandId(brands[0].id)
  }, [brands])

  useEffect(() => {
    // keep subtype in sync when type changes
    setSubtype(selectedType.subtypes[0])
  }, [typeName])

  const addCannabinoid = () =>
    setCannabinoids((c) => [...c, { name: '', amount: 0 }])
  const updateCannName = (idx: number, name: string) =>
    setCannabinoids((c) => c.map((it, i) => (i === idx ? { ...it, name } : it)))
  const updateCannAmount = (idx: number, amount: number) =>
    setCannabinoids((c) =>
      c.map((it, i) => (i === idx ? { ...it, amount } : it)),
    )
  const removeCann = (idx: number) =>
    setCannabinoids((c) => c.filter((_, i) => i !== idx))
  return (
    <div className='form-sheet'>
      <h3>Create Product</h3>
      <IonList>
        <IonItem>
          <IonLabel position='stacked'>Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e: any) => setName(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Brand</IonLabel>
          <IonSelect
            value={brandId}
            onIonChange={(e: any) => setBrandId(e.detail.value)}
          >
            {brands.map((b) => (
              <IonSelectOption key={b.id} value={b.id}>
                {b.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Strain</IonLabel>
          <IonSelect
            value={strain}
            onIonChange={(e: any) => setStrain(e.detail.value)}
          >
            <IonSelectOption value={'Sativa'}>Sativa</IonSelectOption>
            <IonSelectOption value={'Indica'}>Indica</IonSelectOption>
            <IonSelectOption value={'Hybrid'}>Hybrid</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Type</IonLabel>
          <IonSelect
            value={typeName}
            onIonChange={(e: any) => setTypeName(e.detail.value)}
          >
            {types.map((t) => (
              <IonSelectOption key={t.name} value={t.name}>
                {t.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Subtype</IonLabel>
          <IonSelect
            value={subtype}
            onIonChange={(e: any) => setSubtype(e.detail.value)}
          >
            {selectedType.subtypes.map((s) => (
              <IonSelectOption key={s} value={s}>
                {s}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>Description</IonLabel>
          <IonTextarea
            value={desc}
            onIonChange={(e: any) => setDesc(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position='stacked'>
            Weight ({selectedType.weightMeasurement})
          </IonLabel>
          <IonInput
            type='number'
            value={weight ?? ''}
            onIonChange={(e: any) =>
              setWeight(Number(e.detail.value) || undefined)
            }
          />
        </IonItem>
        <div style={{ padding: 8 }}>
          <strong>Cannabinoids</strong>
          {cannabinoids.map((c, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <IonInput
                placeholder='Name'
                value={c.name}
                onIonChange={(e: any) => updateCannName(idx, e.detail.value)}
              />
              <IonInput
                placeholder={`Amount (${selectedType.cannabinoidMeasurement})`}
                type='number'
                value={String(c.amount)}
                onIonChange={(e: any) =>
                  updateCannAmount(idx, Number(e.detail.value) || 0)
                }
              />
              <IonButton color='danger' onClick={() => removeCann(idx)}>
                Remove
              </IonButton>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <IonButton onClick={addCannabinoid}>Add Cannabinoid</IonButton>
          </div>
        </div>
      </IonList>
      <div className='form-actions'>
        <IonButton color='medium' onClick={onCancel} fill='outline'>
          Cancel
        </IonButton>
        <IonButton
          onClick={() =>
            onCreate(
              name.trim(),
              brandId,
              desc.trim(),
              strain,
              {
                name: selectedType.name,
                weightMeasurement: selectedType.weightMeasurement,
                cannabinoidMeasurement: selectedType.cannabinoidMeasurement,
              },
              subtype,
              cannabinoids,
              weight,
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
