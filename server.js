const Hapi = require("hapi")
const Joi = require("joi")
const Item = require("./item")
const Inert = require("inert")

const server = Hapi.server({
    host: "localhost",
    port: 8000
})

server.route({
    method: "GET",
    path: "/search",
    handler: Item.search,
    options: {
        validate: {
            query: {
                q: Joi.string()
                    .lowercase()
                    .min(3)
                    .max(1000)
            }
        }
    }
})

const init = async () => {
    await server.register(Inert)

    server.method("getAllItems", Item.getAllItems, {
        cache: {
            expiresIn: 600000, // 10 mins
            generateTimeout: 10000
        }
    })

    server.route({
        method: "GET",
        path: "/",
        handler: {
            file: "index.html"
        }
    })

    await server.start()
    return server
}

process.on("unhandledRejection", err => {
    console.log(err)
    process.exit(1)
})

if (!module.parent) {
    init()
        .then(({ info }) => {
            console.log(`Server running at:${info.uri}`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = server
