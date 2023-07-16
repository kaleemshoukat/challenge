/**
 * Helper - Generate base url of app function
 * @returns baseURl
 */
exports.base_url= () => {
    const host = process.env.API_URL
    const port = process.env.API_PORT

    return `${host}:${port}`
}