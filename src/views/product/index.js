import React from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'

import { getProducts, updateProduct, getById } from '../../utils/index'

import InputField from './input-field'
import SelectField from './select-field'

import Photo from '../item/photo'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const StyledForm = styled.form`
    position: relative;
    padding: 20px;
    margin: 20px;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 20px;
    box-shadow: rgb(43 46 207 / 50%) 0px 5px 19px;
`

const StyledButton = styled.input`
    cursor: pointer;
    margin: 30px;
    font-size: 20px;
    padding: 10px;
    width: calc(100% - 60px);
    border: 1px solid ${(props) => props.theme.colors.grey};
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
`
const FloatingPhoto = styled.div`
    position: absolute;
    top: -50px;
    left: calc(50% - 50px);
    img {
        box-shadow: rgb(43 46 207 / 50%) 0px 5px 19px;
    }
`

const StyledP = styled.p`
    margin: 0 30px;
    height: 18px;
    color: ${(props) => props.theme.colors.darkGrey};
`

const CATEGORY_OPTIONS = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']

function Product() {
    const { productId, mode } = useParams()
    const [product, setProduct] = React.useState()
    const [saved, setSaved] = React.useState(false)
    const READ_ONLY = mode === 'edit' ? false : true

    const history = useHistory()

    React.useEffect(() => {
        if (saved) {
            setTimeout(() => {
                setSaved(false)
            }, 2000)
        }
    }, [saved])

    React.useEffect(() => {
        const prod = getById(getProducts(), Number(productId))[0]
        setProduct(prod)
        document.title = `${mode === 'edit' ? 'Edit' : 'View'}: ${prod.productName}`
    }, [productId, mode])

    const handleEditClick = () => {
        history.push(`/edit/${product.productId}`)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const fieldValues = Object.fromEntries(formData.entries())
        updateProduct(product.productId, {
            ...fieldValues,
            productPrice: Number(fieldValues.productPrice),
            salePrice: Number(fieldValues.salePrice),
        })
        setSaved(true)
    }
    return product ? (
        <Container>
            <StyledForm readOnly={READ_ONLY} onSubmit={handleSubmit}>
                <FloatingPhoto>
                    <Photo productName={product.productName} source={product.productImage} />
                </FloatingPhoto>
                <InputField
                    name={'productName'}
                    label={'Product Name'}
                    inputProps={{
                        id: 'productName',
                        name: 'productName',
                        type: 'text',
                        defaultValue: product.productName,
                        required: true,
                        readOnly: READ_ONLY,
                    }}
                />
                <SelectField
                    name={'productCategory'}
                    label={'Product Category'}
                    options={CATEGORY_OPTIONS}
                    selectProps={{
                        id: 'productCategory',
                        name: 'productCategory',
                        defaultValue: product.productCategory,
                        required: true,
                        readOnly: READ_ONLY,
                    }}
                />
                <InputField
                    name={'productPrice'}
                    label={'Product Price'}
                    inputProps={{
                        id: 'productPrice',
                        name: 'productPrice',
                        step: 'any',
                        type: 'number',
                        defaultValue: product.productPrice,
                        required: true,
                        readOnly: READ_ONLY,
                    }}
                />
                <InputField
                    name={'salePrice'}
                    label={'Sale Price'}
                    inputProps={{
                        id: 'salePrice',
                        name: 'salePrice',
                        step: 'any',
                        type: 'number',
                        defaultValue: product.salePrice,
                        required: true,
                        readOnly: READ_ONLY,
                    }}
                />
                {READ_ONLY ? <StyledButton type="button" value="Edit" onClick={handleEditClick} /> : <StyledButton type="submit" value="Save" />}
                <StyledP>{saved ? 'Saved Successfully...' : null}</StyledP>
            </StyledForm>
        </Container>
    ) : null
}

export default Product
