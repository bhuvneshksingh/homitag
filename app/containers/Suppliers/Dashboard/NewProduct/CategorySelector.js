import PropTypes from "prop-types";
import React, { useState } from 'react'
import Icon from 'components/Common/Icon/index'
import styled from 'styled-components'

const CategoriesWrapper = styled.div`
  padding: 15px;
  width: 95%;
  margin: auto;
  background-color: #f5f5f5;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
  }
`
const BoldText = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-top: 5px;
`
const ColumnDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 160px);
  grid-row-gap: 17px;
  margin-left: 20px;
  margin-top: 10px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 10px;
  width: 140px;
  height: 100px;
  padding: 16px;
  text-align: center;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgba(0, 0, 0, 0.04);
  }
`
const CategoryIcon = styled.img`
  margin: auto;
  height: 42px;
  object-fit: cover;
`

const SmallCategoryIcon = styled(CategoryIcon)`
  margin-right: 10px;
  width: 60px;
  object-fit: contain;
  height: 25px;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
const CategoryWrapper = styled.div`
  display: flex;
`

const CardText = styled.span`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ArrowUp = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(90deg)' }} />
  </div>
)

const ArrowDown = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(-90deg)' }} />
  </div>
)

const CategorySelector = ({
  categories,
  onSelect,
  selectedCategory,
  title,
  noDataText
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <CategoriesWrapper>
      <SpaceBetween onClick={() => setIsOpen(val => !val)}>
        <CategoryWrapper>
          {selectedCategory && selectedCategory.name &&
            <SmallCategoryIcon
              src={selectedCategory.iconActiveUrl}/>
          }
          <BoldText>{title}</BoldText>
        </CategoryWrapper>
        {isOpen ? <ArrowDown /> : <ArrowUp />}
      </SpaceBetween>
      {isOpen && (
        <ColumnDisplay>
          {categories.length > 0 ? (
            categories.map(category => (
              <CardContainer
                selected={
                  category.id === (selectedCategory && selectedCategory.id)
                }
                key={category.id}
                onClick={() => {
                  onSelect(category)
                  setIsOpen(false)
                }}
              >
                <CategoryIcon
                  src={category.id === (selectedCategory && selectedCategory.id) ? category.iconActiveUrl : category.iconUrl}/>
                <CardText>{category.name}</CardText>
              </CardContainer>
            ))
          ) : (
            <p>{noDataText}</p>
          )}
        </ColumnDisplay>
      )}
    </CategoriesWrapper>
  )
}

CategorySelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  categories: PropTypes.array,
  selectedCategory: PropTypes.object,
  title: PropTypes.string,
  noDataText: PropTypes.string
}

export default CategorySelector
