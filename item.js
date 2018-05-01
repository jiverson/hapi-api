const { searchableItems } = require("./item-service")

exports.getAllItems = async () => {
    const result = await searchableItems()
    return result
}

// eslint-disable-next-line
exports.search = async (req, h) => {
    const {
        query: { q: forText },
        server: {
            methods: { getAllItems }
        }
    } = req
    const arr = forText.split(" ")
    const n = arr.length
    const results = await getAllItems()

    // Loop through results description and check against each search term separated by a space
    return results.filter(({ longDescription }) => {
        const notFound = arr.reduce((acc, curr) => {
            let tmp = acc
            if (longDescription.toLowerCase().includes(curr)) {
                tmp -= 1
            }
            return tmp
        }, n)

        return notFound <= 0
    })
}
