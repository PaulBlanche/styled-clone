import * as React from 'react'
import * as crypto from 'crypto'
import { compile, serialize, stringify } from 'stylis'
import { css } from './css'
export * from './css'

const styles = new Set()

export function styled(type) {
    const BaseComponent = type

    return function template(templates, ...interpolations) {
        const componentHash = crypto.createHash('sha1')
        templates.forEach(segment => {
            componentHash.update(segment)
        })
        const componentClassName = `component-${componentHash.digest('hex').slice(0, 6)}`

        Component.className = componentClassName

        const styleMaker = css(templates, ...interpolations)

        return Component

        function Component(props) {
            const instanceStyleProperties = styleMaker(props)
            const instanceHash = crypto.createHash('sha1')
            instanceHash.update(instanceStyleProperties)
            const instanceClassName = `instance-${instanceHash.digest('hex').slice(0, 6)}`


            const wasStyleAlreadySet = styles.has(instanceClassName)
            if (!wasStyleAlreadySet) {
                styles.add(instanceClassName)
            }

            const style = serialize(compile(`.${instanceClassName} { ${instanceStyleProperties} }`), stringify)

            const filteredProps = {}
            for (const [key, value] of Object.entries(props)) {
                if (!key.startsWith('$')) {
                    filteredProps[key] = value
                }
            }

            return <>
                <BaseComponent {...filteredProps} className={mergeClassName(props.className, componentClassName, instanceClassName)} />
                {!wasStyleAlreadySet && <style dangerouslySetInnerHTML={{  __html: style }} />}
            </>
        }
    }
}

function mergeClassName(...classNames) {
    return classNames.filter(className => className !== undefined).join(' ')
}