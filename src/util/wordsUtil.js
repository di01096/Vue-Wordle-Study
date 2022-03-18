const ConvertInputData = (e) => {
    let key = e.key
    if(key == "Backspace" || key == "Enter" || /[a-zA-Z<]/.test(key)) {
        return key
    }
    return ""
}
export {ConvertInputData}