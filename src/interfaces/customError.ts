interface CustomError extends Error {
    statusCode?: number,
    statusText?: string
}

export { CustomError }