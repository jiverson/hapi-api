const requestProm = require("request-promise-native")
const async = require("async")

const RATE_LIMIT = 500
const ids = [
    14225185,
    14225186,
    14225188,
    14225187,
    39082884,
    30146244,
    12662817,
    34890820,
    19716431,
    42391766,
    35813552,
    40611708,
    40611825,
    36248492,
    44109840,
    23117408,
    35613901,
    42248076
]

const request = requestProm.defaults({
    baseUrl: "http://api.walmartlabs.com/v1/items",
    qs: { apiKey: "kjybrqfdgp3u4yv2qzcnjndj" },
    json: true,
    time: true,
    resolveWithFullResponse: true
})

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

async function getItem(byId) {
    const response = await request.get(`/${byId}`)
    const {
        timings: { end },
        body
    } = response

    // walmart api rate limit
    if (end <= RATE_LIMIT) {
        await timeout(RATE_LIMIT - Math.ceil(end))
    }

    return body
}

exports.searchableItems = () =>
    new Promise((resolve, reject) => {
        async.mapSeries(
            ids,
            async id => {
                const response = await getItem(id)
                return response
            },
            (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            }
        )
    })
