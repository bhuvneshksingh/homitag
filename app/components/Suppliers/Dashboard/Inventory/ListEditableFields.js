import React, { useEffect, useState} from 'react';
import { string, func } from 'prop-types'
import styled from 'styled-components'
import { Input } from '@material-ui/core'
import { useDebounce } from 'use-debounce';
import Loading from '../../../Common/Loading';
import { editPricePost, editPostQuantity } from '../../../../containers/Suppliers/Dashboard/Inventory/api'
import InputNumber from "../../../Common/Form/Input/InputNumber"
import PriceInput from '../PriceInput'

// eslint-disable-next-line no-unused-vars
const StyledInput = styled(Input)`
  box-sizing: border-box;
  width: 80%;
  color: white;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  && {
    height: ${props =>props.height};
    font-weight: 500;
    font-size: 13px;
    line-height: 14px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${({ theme }) => theme.colors.homiWhite};
    margin-bottom: 10px;
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
  .Mui-disabled{
  color: white
  }
`

const ListEditableFields = ({value, type, id, onSoldout, onNotify, onSuccess}) =>{
  const [inputValue, setInputValue] = useState(value)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) =>{
    setInputValue(e.target.value)
  }
  const [val] = useDebounce(inputValue, 1000)

  const editPost = () => {
    if(parseInt(inputValue, 10) >= 0 ){
      setLoading(true)
      if(type === 'price'){
        editPricePost(id, inputValue)
          .then(res => {
            console.log(res)
            onSuccess()
          }).catch((e) =>{
            console.log(`Error + ${e.response.data.error}`)
          })
          .finally(() => setLoading(false))
      }else if(type === 'quantity'){
        editPostQuantity(id, inputValue)
          .then(res => {
            console.log(res)
            onSuccess()
          }).catch((e) =>{
            console.log(`Error + ${e.response.data.error}`)
          })
          .finally(() => setLoading(false))

        if(inputValue === '0'){
          console.log('soldout')
          onSoldout()
        }
        if(value === 0){
          console.log('soldout')
          onSoldout()
        }
      }
    }else if(parseInt(inputValue,10) < 0){
      onNotify()
      setInputValue(value)
    }
  }

  useEffect(() => {
    if(value !== inputValue){
      editPost()
    }
  }, [val])


  if(loading) return <Loading/>

  return (
    <>
      {type === 'price' &&
        <PriceInput
          isWhite
          id="initialPrice"
          value={inputValue}
          onChange={e =>handleChange(e)}
          placeholder="$45"
        />
      }
      {type === 'quantity' &&
        <InputNumber
          isWhite
          id="quantityForSale"
          name="quantityForSale"
          value={inputValue}
          onChange={e =>handleChange(e)}
        />
      }
    </>
  )
}


ListEditableFields.propTypes = {
  value: string,
  type: string,
  id: string,
  onSoldout: func,
  onNotify: func,
  onSuccess: func
}


export default ListEditableFields
