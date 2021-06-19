// @flow
import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
`

const Photo = ({ productName, source }) => {
    return <Image alt={productName} src={source} />
}
export default Photo
