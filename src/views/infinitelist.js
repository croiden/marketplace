// @flow
import * as React from 'react'
import styled from 'styled-components'

import Sort from './sort/'
import Item from './item'

//hooks
import useProductsSearch from '../hooks/useProductsSearch'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: calc(100vh - 180px);
    margin: 20px 0px;
    justify-content: center;
`
const EmptyMessage = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    font-style: italic;
    color: ${(props) => props.theme.colors.darkGrey};
    font-size: 20px;
`

export default function InfiniteList({ searchQuery }) {
    const [page, setPage] = React.useState(1)
    const [sortBy, setSortBy] = React.useState('')

    const { products, hasMore } = useProductsSearch(searchQuery, page, sortBy)

    const observer = React.useRef()
    const lastGistElementRef = React.useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((page) => page + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [hasMore]
    )

    React.useEffect(() => {
        setPage(1)
    }, [searchQuery])

    const handleSortBy = (by) => {
        setPage(1)
        setSortBy(by)
    }

    return (
        <>
            {products.length ? (
                <>
                    <Sort sortBy={sortBy} onSortBy={handleSortBy} />
                    <Container>
                        {products.map((p, index) => {
                            let refProp = {}
                            if (products.length === index + 1) {
                                refProp = { ref: lastGistElementRef }
                            }
                            return <Item {...refProp} key={p.productId} {...p} />
                        })}
                    </Container>
                </>
            ) : (
                <EmptyMessage>{'No products found'}</EmptyMessage>
            )}
        </>
    )
}
