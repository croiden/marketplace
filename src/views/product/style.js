import styled from 'styled-components'

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
    min-width: 400px;
    label {
        margin-bottom: 8px;
        padding-right: 10px;
        color: ${(props) => props.theme.colors.darkGrey};
    }
    input,
    select {
        font-size: 18px;
        border: 1px solid ${(props) => props.theme.colors.grey};
        border-radius: 6px;
        padding: 8px;
    }
`
