// @flow
import { useEffect, useState } from 'react'

import { getProducts } from '../utils/index.js'

const PAGE_SIZE = 10
export default function useProductsSearch(query? = '', page, sortBy = '') {
    const [products, setProducts] = useState(getProducts().slice(0, PAGE_SIZE))
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const p = getProducts()
        let _products = p
        if (query) {
            const queryUp = query.toUpperCase()
            _products = _products.filter((p) => {
                return p.productName.toUpperCase().indexOf(queryUp) !== -1 || p.productCategory.toUpperCase().indexOf(queryUp) !== -1
            })
        }
        if (sortBy) {
            if (sortBy === 'priceHighToLow') {
                _products = _products.sort((a, b) => {
                    return b.salePrice - a.salePrice
                })
            } else if (sortBy === 'priceLowToHigh') {
                _products = _products.sort((a, b) => {
                    return a.salePrice - b.salePrice
                })
            } else {
                _products = _products.sort((a, b) => {
                    return a[sortBy] > b[sortBy] ? 1 : -1
                })
            }
        }
        const noOfProducts = PAGE_SIZE * page
        setProducts(_products.slice(0, noOfProducts))
        setHasMore(p.length > noOfProducts)
    }, [query, page, sortBy])

    return { products, hasMore }
}
