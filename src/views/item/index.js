// @flow
import * as React from 'react'
import styled from 'styled-components'

import Photo from './photo'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
    width: 100%;
    min-height: 100px;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        width: calc(100vw - 20px);
    }
`
const Title = styled.div`
    font-size: 24px;
    line-height: 29px;
    text-align: Left;
    margin: 10px 20px;
    word-break: break-all;
`
const Category = styled.div`
    margin-left: 20px;
    color: ${(props) => props.theme.colors.darkGrey};
`

const ProductStock = styled.span`
    margin: 0px 10px;
    font-size: 16px;
    color: ${(props) => props.theme.colors.grey};
`

const Left = styled.div`
    display: flex;
`
const Right = styled.div``
const ProductPrice = styled.div`
    margin: 10px 20px;
    text-align: right;
    color: ${(props) => props.theme.colors.darkGrey};
`
const SalePrice = styled.div`
    margin: 20px;
    font-size: 30px;
    text-align: right;
    color: ${(props) => props.theme.colors.secondary};
`
const Item = React.forwardRef(({ productId, productName, productCategory, productImage, productStock, productPrice, salePrice }, ref) => {
    return (
        <Container ref={ref}>
            <Left>
                <Photo productName={productName} source={productImage} />
                <div>
                    <Title>
                        <a href={`/view/${productId}`} target="_blank" rel="noopener noreferrer">
                            {productName}
                        </a>
                        <ProductStock>({productStock ? 'Available' : 'Not Available'})</ProductStock>
                    </Title>
                    <Category>{productCategory}</Category>
                </div>
            </Left>
            <Right>
                <ProductPrice>Actual Price: $ {productPrice.toFixed(2)}</ProductPrice>
                <SalePrice>$ {salePrice.toFixed(2)}</SalePrice>
            </Right>
        </Container>
    )
})
export default Item
