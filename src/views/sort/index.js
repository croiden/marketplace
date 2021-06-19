import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    margin: 20px 10px 0px 20px;
`
const StyledButton = styled.button`
    margin: 0px 4px;
    border: 0;
    cursor: pointer;
    background: transparent;
    ${(props) => (props.active ? `box-shadow: 0px 2px ${props.theme.colors.secondary}` : null)};
`
export default function Sort({ sortBy, onSortBy }) {
    return (
        <Container>
            <strong>Sort By</strong>
            <StyledButton
                active={sortBy === 'productName'}
                onClick={() => {
                    onSortBy('productName')
                }}
            >
                Name
            </StyledButton>
            <StyledButton
                active={sortBy === 'productCategory'}
                onClick={() => {
                    onSortBy('productCategory')
                }}
            >
                Category
            </StyledButton>
            <StyledButton
                active={sortBy === 'priceLowToHigh'}
                onClick={() => {
                    onSortBy('priceLowToHigh')
                }}
            >
                Price -- Low to High
            </StyledButton>
            <StyledButton
                active={sortBy === 'priceHighToLow'}
                onClick={() => {
                    onSortBy('priceHighToLow')
                }}
            >
                Price -- High to Low
            </StyledButton>
        </Container>
    )
}
