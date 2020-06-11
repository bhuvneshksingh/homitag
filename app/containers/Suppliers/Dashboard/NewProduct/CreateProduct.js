import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { createPost, addProductPhotos, createProduct } from './api'
import Steps from './Steps'
import NewItemForm from './StepsScreens/NewItemForm'
import ProductInformation from './StepsScreens/ProductInformation'
import PriceQuantity from './StepsScreens/PriceQuantity'
import ProductPreview from './StepsScreens/ProductPreview'
import DeliveryMethod from './StepsScreens/DeliveryMethod'
import { getProductDetail } from '../Inventory/api'
import Loading from '../../../../components/Common/Loading'
import NewProductConfirm from '../../../../components/Suppliers/Dashboard/Modals/NewProductConfirm'

const CreateProductWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
`
const cookies = new Cookies()
const CreateProduct = ({ match }) => {
  const { id: productId } = match.params
  const userId = cookies.get('userId')
  const userData = cookies.get('userData')
  const [productCategory, setProductCategory] = useState({})
  const [productSubcategory, setProductSubcategory] = useState({})
  const [productFurtherSubcategory, setProductFurtherSubcategory] = useState()
  // If there is an id we should start from the second screen
  const [index, setIndex] = useState(productId ? 2 : 0)
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [product, setProduct] = useState({
    userId,
    isNegotiable: false, // always false
    location: userData && userData.location,
    Location: userData && userData.location,
    PostStatus: {
      id: '3c50efb7-419a-4446-8cb8-c8f45e1bcb8c', // default
      name: 'Active', // default
    },
    ItemCondition: {
      id: 'e86c9f39-f8a9-481a-b622-5beb4afa6956', // default
      name: 'New', // default ?? new o New
    },
    DeliveryMethods: [],
    PaymentMethods: [],
    Product: {
      userId,
      customProperties: {
        category: {},
        listingType: {},
      },
      productStatus: 'bafb5ca5-341e-4f35-b6a1-a9ec6fe89cd3',
      Category: {},
      ProductImages: [],
    },
  })

  function getProduct(id) {
    setLoading(true)
    getProductDetail(id)
      .then(res => {
        const {
          DeliveryMethods,
          initialPrice,
          quantityForSale,
          ...fetchedProduct
        } = res.data.data
        setProduct(fetchedProduct)
        setProductImages(fetchedProduct.Product.ProductImages)
        setProductCategory(
          fetchedProduct.Product.customProperties.category)
      })
      .catch(e => {
        console.log(`Error + ${e.response.data.error}`)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (productId) {
      getProduct(productId)
    }
  }, [])


  const [productImages, setProductImages] = useState([])
  // Product Information Values
  const componentsToRender = [
    <NewItemForm
      onSubmit={handleNewItemFormSubmit}
      images={productImages}
      selectedCategory={productCategory}
      selectedSubcategory={productSubcategory}
      selectedFurtherSubcategory={productFurtherSubcategory}
    />,
    <ProductInformation
      handleGoBack={handleGoBack}
      onSubmit={handleProductInformationSubmit}
      product={product.Product}
    />,
    <PriceQuantity
      productName={product.Product.title}
      productId={product && product.Product && product.Product.id}
      productImages={productImages}
      initialPrice={product && product.initialPrice}
      handleGoBack={handleGoBack}
      onSubmit={handlePriceQuantitySubmit}
      quantityForSale={product && product.quantityForSale}
      taxExempt={product && product.taxExempt}
    />,
    <DeliveryMethod
      product={product}
      productCategory={productCategory}
      handleGoBack={handleGoBack}
      productTitle={product.Product.title}
      productImages={productImages}
      onSubmit={handleDeliveryMethodSubmit}
    />,
    <ProductPreview
      productImages={productImages}
      handleGoBack={handleGoBack}
      handleSubmit={handleProductSubmit}
      product={product}
    />,
  ]

  function uploadImages(_productId, images) {
    const uploadImagesPromises = []
    images.forEach(image => {
      const formData = new FormData()
      formData.append('productImage', image)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      uploadImagesPromises.push(addProductPhotos(_productId, formData, config))
    })
    return Promise.all(uploadImagesPromises)
  }

  async function handleProductSubmit() {
    setLoading(true)
    if (productId) {
      const {
        Product,
        id,
        PostStatus,
        DeliveryMethods,
        PaymentMethods,
        ItemCondition,
        ...postData
      } = product
      const createPostResponse = await createPost({
        ...postData,
        product: product.Product.id,
        deliveryMethods: product.DeliveryMethods,
        paymentMethods: product.PaymentMethods,
        itemCondition: product.ItemCondition.id,
        postStatus: product.PostStatus.id,
      })
        .catch(console.log)
        .finally(() => {
          setLoading(false)
        })
      if (createPostResponse) {
        setShowConfirmModal(true)
      }
    } else {
      const productToCreate = {
        ...product.Product,
        category: product.Product.Category.id,
        userId,
      }
      const { handledTime } = productToCreate.customProperties
      productToCreate.customProperties.handledTime = handledTime || 3
      const createProductResponse = await createProduct(productToCreate).catch(
        () => {
          setLoading(false)
        }
      )
      if (createProductResponse) {
        const createdProductId = createProductResponse.data.data.id
        if (productImages && productImages.length > 0) {
          await uploadImages(createdProductId, productImages).catch(() =>
            setLoading(false)
          )
        }
        const { Product, ...postData } = product
        const createPostResponse = await createPost({
          ...postData,
          product: createdProductId,
          itemCondition: product.ItemCondition.id,
          postStatus: product.PostStatus.id,
          deliveryMethods: postData.DeliveryMethods,
          paymentMethods: postData.PaymentMethods,
        })
          .catch(console.log)
          .finally(() => {
            setLoading(false)
          })

        if (createPostResponse) {
          setShowConfirmModal(true)
        }
      }
    }
  }

  function nextStep() {
    setIndex(i => (i + 1) % componentsToRender.length)
  }

  function handleGoBack() {
    setIndex(i => (i === 0 ? componentsToRender.length - 1 : i - 1))
  }

  function handlePriceQuantitySubmit({
    initialPrice,
    quantityForSale,
    taxExempt,
  }) {
    setProduct(currentProduct => {
      const productCopy = { ...currentProduct }
      productCopy.initialPrice = initialPrice
      productCopy.availableQuantity = quantityForSale
      productCopy.quantityForSale = quantityForSale
      productCopy.taxExempt = taxExempt
      return productCopy
    })
    nextStep()
  }

  function handleDeliveryMethodSubmit(deliveryMethod) {
    setProduct(currentProduct => {
      const productCopy = { ...currentProduct }
      productCopy.DeliveryMethods = [deliveryMethod]
      return productCopy
    })
    nextStep()
  }

  function handleProductInformationSubmit({
    name,
    description,
    weight,
    volume,
    handledTime,
    length,
    width,
    height,
  }) {
    setProduct(currentProduct => {
      const productCopy = { ...currentProduct }
      productCopy.Product.title = name
      productCopy.Product.description = description
      productCopy.Product.customProperties.weight = weight
      productCopy.Product.customProperties.length = length
      productCopy.Product.customProperties.width = width
      productCopy.Product.customProperties.height = height
      productCopy.Product.customProperties.handledTime = handledTime
      productCopy.Product.customProperties.volume = volume
      return productCopy
    })
    nextStep()
  }

  function handleNewItemFormSubmit({
    category,
    subcategory,
    furtherSubcategory,
    images,
  }) {
    setProductImages(images)
    setProductCategory(category)
    setProductSubcategory(subcategory)
    setProductFurtherSubcategory(furtherSubcategory)
    setProduct(currentProduct => {
      const productCopy = { ...currentProduct }
      productCopy.Product.customProperties.category = category
      productCopy.Product.furtherSubcategory = furtherSubcategory
      productCopy.Product.Category =
        furtherSubcategory || subcategory || category
      productCopy.Product.category =
        (furtherSubcategory && furtherSubcategory.id) ||
        (subcategory && subcategory.id)
      return productCopy
    })
    nextStep()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <CreateProductWrapper>
      <Steps index={index} components={componentsToRender} />
      <NewProductConfirm
        isOpen={showConfirmModal}
        productName={product.Product.title}
      />
    </CreateProductWrapper>
  )
}

CreateProduct.propTypes = {
  match: PropTypes.object,
}

export default CreateProduct
