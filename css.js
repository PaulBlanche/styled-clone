export function css(templates, ...interpolations) {
    return (props) => {
        const css = [];
        for (let i = 0; i < templates.length; i++) {
            css.push(templates[i])

            let interpolated = interpolations[i]
            while(true) {
                if (interpolated === undefined) {
                    break;
                }
                if (isStyledComponentInterpolation(interpolated)) {
                    css.push(`.${interpolated.className}`)
                    break;
                } else if (isFunctionInterpolation(interpolated)) {
                    interpolated = interpolated(props)
                } else {
                    css.push(interpolated)
                    break
                }
            }
        }
        return css.join('');
    }
}

function isStyledComponentInterpolation(value)  {
    return ((typeof value === 'function' || (typeof value === 'object' && value !== null)) && 'className' in value)
}

function isFunctionInterpolation(value) {
    return (typeof value === 'function' && !('className' in value))
}