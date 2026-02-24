import { useEffect, useState } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonToast,
  IonFooter,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './index.css'
import BrandForm, { Brand } from '../../components/forms/brand'
import ProductForm, { Product } from '../../components/forms/product'
import SeshForm, { SeshIn } from '../../components/forms/seshin'

const LS_BRANDS = 'tokd_brands'
const LS_PRODUCTS = 'tokd_products'
const LS_SESHINS = 'tokd_seshins'

function id() {
  return Math.random().toString(36).slice(2, 9)
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function write<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items))
}

export default function Discover() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [seshins, setSeshins] = useState<SeshIn[]>([])

  const [showBrandModal, setShowBrandModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showSeshModal, setShowSeshModal] = useState(false)

  const [toast, setToast] = useState<{ show: boolean; msg?: string }>({
    show: false,
  })

  useEffect(() => {
    setBrands(read<Brand>(LS_BRANDS))
    setProducts(read<Product>(LS_PRODUCTS))
    setSeshins(read<SeshIn>(LS_SESHINS))
  }, [])

  const createBrand = (
    name: string,
    desc?: string,
    logoUrl?: string,
    profileUrl?: string,
    website?: string,
  ) => {
    const next: Brand = {
      id: id(),
      name,
      description: desc || '',
      website: website || '',
      logoUrl: logoUrl || '',
      profileUrl: profileUrl || '',
      createdAt: Date.now(),
    }
    const current = read<Brand>(LS_BRANDS)
    const updated = [next, ...current]
    write(LS_BRANDS, updated)
    setBrands(updated)
    setToast({ show: true, msg: `Created ${name}` })
  }

  const createProduct = (
    name: string,
    brandId?: string,
    description?: string,
  ) => {
    const p: Product = { id: id(), name, brandId, description }
    const next = [p, ...products]
    setProducts(next)
    write(LS_PRODUCTS, next)
    setToast({ show: true, msg: 'Product created' })
  }

  const createSesh = (productId?: string, rating = 0, notes?: string) => {
    const s: SeshIn = { id: id(), productId, rating, notes }
    const next = [s, ...seshins]
    setSeshins(next)
    write(LS_SESHINS, next)
    setToast({ show: true, msg: 'Sesh-in created' })
  }

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

        {/* Brand modal */}
        <IonModal
          isOpen={showBrandModal}
          onDidDismiss={() => setShowBrandModal(false)}
        >
          <BrandForm
            onCancel={() => setShowBrandModal(false)}
            onCreate={(name, desc, logoUrl, profileUrl, website) => {
              createBrand(name, desc, logoUrl, profileUrl, website)
              setShowBrandModal(false)
            }}
          />
        </IonModal>

        {/* Product modal */}
        <IonModal
          isOpen={showProductModal}
          onDidDismiss={() => setShowProductModal(false)}
        >
          <ProductForm
            brands={brands}
            onCancel={() => setShowProductModal(false)}
            onCreate={(name, brandId, desc) => {
              createProduct(name, brandId, desc)
              setShowProductModal(false)
            }}
          />
        </IonModal>

        {/* Sesh modal */}
        <IonModal
          isOpen={showSeshModal}
          onDidDismiss={() => setShowSeshModal(false)}
        >
          <SeshForm
            products={products}
            onCancel={() => setShowSeshModal(false)}
            onCreate={(productId, rating, notes) => {
              createSesh(productId, rating, notes)
              setShowSeshModal(false)
            }}
          />
        </IonModal>

        <IonToast
          isOpen={toast.show}
          message={toast.msg}
          duration={1500}
          onDidDismiss={() => setToast({ show: false })}
        />
      </IonContent>
      <IonFooter>
        <div className='discover-actions'>
          <IonButton onClick={() => setShowBrandModal(true)} expand='block'>
            Create Brand
          </IonButton>
          <IonButton onClick={() => setShowProductModal(true)} expand='block'>
            Create Product
          </IonButton>
          <IonButton onClick={() => setShowSeshModal(true)} expand='block'>
            Create Sesh-in
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  )
}
