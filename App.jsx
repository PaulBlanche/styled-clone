import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { styled, css } from './styled'
import * as fs from 'fs'

const MyColorSpanBase = styled('span')`
    color: 'red';

`
const MyColorSpan = styled(MyColorSpanBase)`
    background-color: ${({ $color = 'green'}) => $color};
`

const MyWrapperBase = styled('div')`
    color: 'blue';
    ${MyColorSpan} {
        background-color: 'yellow';
    }
`

const MyWrapper = styled(MyWrapperBase)`
    ${MyColorSpan} {
        ${({ $color = 'blue'}) => {
            return css`
                color: ${$color};
            `
        }}
    }
`

function App() {
    return <>
        <MyWrapper>
            <MyColorSpan $color="red">coucou</MyColorSpan>
            <MyColorSpan>coucou</MyColorSpan>
        </MyWrapper>
        <MyColorSpan $color="red">coucou</MyColorSpan>
        <MyColorSpan>coucou</MyColorSpan>
    </>
}

fs.writeFileSync('./index.html', ReactDOM.renderToStaticMarkup(<App />), { encoding: 'utf-8' })