    const errorFunction = (errorBit, statusCode, msg, data) => {
        if (errorBit) return { is_erorr: errorBit, statusCode, message: msg, data }
        else return {is_erorr:errorBit, statusCode, message: msg, data}
    }
    module.exports = errorFunction