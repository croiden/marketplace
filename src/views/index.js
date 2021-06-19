// @flow
import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import ListContainer from './infinitelist'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
`
const StyledForm = styled.form`
    display: flex;
    width: 480px;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        margin-top: 10px;
        width: calc(100vw - 20px);
    }
`
const StyledInput = styled.input`
    width: 100%;
    height: 60px;
    border: 3px solid ${(props) => props.theme.colors.primary};
    border-right: none;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: ${(props) => props.theme.colors.darkGrey};
    font-size: 20px;
    padding: 5px 20px;
    &:focus {
        color: ${(props) => props.theme.colors.primary};
    }
`
const SearchButton = styled.button`
    height: 60px;
    border: 1px solid ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    border-radius: 0 5px 5px 0;
    padding: 10px 20px;
    cursor: pointer;
    svg {
        margin: 0px;
    }
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 20px;
`
const Main = () => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const SearchInputRef = React.useRef()

    const handleChange = (event) => {
        const value = event.target.value.trim()
        if (!value) {
            setSearchQuery('')
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const value = SearchInputRef.current.value.trim()
        setSearchQuery(value)
    }

    return (
        <Container>
            <SearchContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput ref={SearchInputRef} type="search" name="search" placeholder="search products by name or category" onChange={handleChange} required autocomplete="off" />
                    <SearchButton type="submit" aria-label="search button">
                        <StyledFontAwesomeIcon icon={faSearch} size="lg" />
                    </SearchButton>
                </StyledForm>
            </SearchContainer>
            <ListContainer searchQuery={searchQuery} />
        </Container>
    )
}
export default Main
