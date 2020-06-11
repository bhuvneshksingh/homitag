import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LightText } from 'components/Suppliers/Dashboard/LightText'
import { OutlinePrimaryButton, PrimaryButton } from 'components/Common/Button'
import closeCircle from '../../../../../assets/images/icons/closeCircle.svg'
import { PageHeader } from '../../../../../components/Suppliers/Dashboard/Page'
import { getCatalogCategoriesApi } from '../api'
import CategorySelector from '../CategorySelector'
import UploadImages from '../UploadImages'

const Instruction = styled.div`
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  width: 60%;
`

const Separator = styled.div`
  margin: 8px 0;
`

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const CloseButton = styled.div`
  margin-right: 50px;
  &:hover {
    cursor: pointer;
  }
`

const Subtitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #969696;
`

const ErrorMessage = styled.span`
  color: red;
`
const NewItemForm = ({ onSubmit, ...props }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    props.selectedSubcategory
  )
  const [selectedFurtherSubcategory, setSelectedFurtherSubcategory] = useState(
    props.selectedFurtherSubcategory
  )
  const [loading, setLoading] = useState(false)
  const [imageValidationError, setImageValidationError] = useState()
  const [images, setImages] = useState(props.images || [])

  function onSelectImage(image) {
    setImages([...images, ...image])
    // target.value = null
  }

  function isObjectEmpty(obj) {
    if (!obj) return true
    return Object.keys(obj).length === 0
  }

  function onDeleteImage(image) {
    const editedImages = images.filter(img => img.urlImage !== image.urlImage)
    setImages(editedImages)
  }

  useEffect(() => {
    if (images.length === 0) {
      setImageValidationError('You need to add at least an image.')
    } else {
      setImageValidationError()
    }
  }, [images])

  function getCategories() {
    getCatalogCategoriesApi({
      showChilds: true,
    })
      .then(res => {
        const vehicleCategory = '03aa8da2-bf5a-4a51-8081-7480251f4139'
        const filteredCategories = res.data.data.filter(
          c => c.listingTypeId !== vehicleCategory
        )
        setCategories(filteredCategories)
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  function handleNext() {
    onSubmit({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      furtherSubcategory: selectedFurtherSubcategory,
      images,
    })
  }

  /**
   * Check if a category has a children.
   * @param {Object} category Category Object
   * @returns {boolean} Returns true if the category has children
   */
  function hasChildrenCategories(category) {
    const isThereAtLeastAChild =
    category.childCategory &&
    Array.isArray(category.childCategory) &&
    category.childCategory[0]
    return !!isThereAtLeastAChild
  }

  function getIsFormValid() {
    if (images.length === 0) return false
    if (isObjectEmpty(selectedCategory)) return false
    if (!hasChildrenCategories(selectedCategory)) return true
    if (isObjectEmpty(selectedSubcategory)) return false
    if (!hasChildrenCategories(selectedSubcategory)) return true
    if (isObjectEmpty(selectedFurtherSubcategory)) return false
    if (!hasChildrenCategories(selectedFurtherSubcategory)) return true
    return true
  }

  return (
    <>
      <CloseButtonContainer>
        <Link to="/suppliers/new-product">
          <CloseButton>
            <img style={{ margin: 'auto' }} src={closeCircle} alt="" />
          </CloseButton>
        </Link>
      </CloseButtonContainer>
      <PageHeader pageTitle="List new item" />
      <Instruction>
        <LightText
          text="
        Looks like we can't find your listing in our marketplace. Feel
        free to create the first one!"
        />
        <Subtitle>Add Pictures</Subtitle>
      </Instruction>
      <UploadImages
        images={images}
        onSelectImage={onSelectImage}
        onDeleteImage={onDeleteImage}
      />
      <Separator />
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategorySelector
          title={
            (selectedCategory && selectedCategory.name) || 'Select a category'
          }
          noDataText="No categories"
          onSelect={category => {
            setSelectedCategory(category)
            /* clear selected category */
            setSelectedSubcategory()
          }}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      )}
      <Separator />
      {!!selectedCategory && hasChildrenCategories(selectedCategory) && (
        <CategorySelector
          title={
            (selectedSubcategory && selectedSubcategory.name) ||
            'Select a subcategory'
          }
          noDataText="No subcategories"
          categories={
            (selectedCategory && selectedCategory.childCategory) || []
          }
          selectedCategory={selectedSubcategory}
          onSelect={category => {
            setSelectedSubcategory(category)
            setSelectedFurtherSubcategory()
          }}
        />
      )}
      <Separator />
      {!!selectedSubcategory && hasChildrenCategories(selectedSubcategory) && (
        <CategorySelector
          title={
            (selectedFurtherSubcategory && selectedFurtherSubcategory.name) ||
            'Select a further subcategory'
          }
          noDataText="No further subcategory"
          categories={
            (selectedSubcategory && selectedSubcategory.childCategory) || []
          }
          selectedCategory={selectedFurtherSubcategory}
          onSelect={category => {
            setSelectedFurtherSubcategory(category)
          }}
        />
      )}
      {getIsFormValid() ? (
        <PrimaryButton onClick={handleNext} subtitle="Product Details">
          Next
        </PrimaryButton>
      ) : (
        <OutlinePrimaryButton disabled subtitle="Product Details">
          Next
        </OutlinePrimaryButton>
      )}
      <div style={{ textAlign: 'center' }}>
        <ErrorMessage>
          {imageValidationError}
        </ErrorMessage>
      </div>
    </>
  )
}

NewItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  selectedCategory: PropTypes.object,
  selectedSubcategory: PropTypes.object,
  selectedFurtherSubcategory: PropTypes.object,
}

export default NewItemForm
