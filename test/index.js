const Code = require("code")
const Lab = require("lab")

// Declare internals

const internals = {
    getAllItems: items =>
        new Promise(resolve => {
            resolve(items)
        })
}

// Test shortcuts

const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code

const server = require("../server.js")

describe("Basic search", () => {
    it("GET /search?q={term}", async () => {
        const searchItems = [
            { longDescription: "foo bar baz" },
            { longDescription: "bar buuz" },
            { longDescription: "bar buuz qux" }
        ]

        server.method("getAllItems", async () => {
            const result = await internals.getAllItems(searchItems)
            return result
        })

        const res1 = await server.inject({
            method: "GET",
            url: "/search?q=f"
        })
        expect(res1.statusCode).to.equal(400)

        const res2 = await server.inject({
            method: "GET",
            url: "/search?q=foo"
        })
        expect(res2.statusCode).to.equal(200)
        expect(res2.result).to.have.length(1)

        const res3 = await server.inject({
            method: "GET",
            url: "/search?q=bar buuz"
        })
        expect(res3.statusCode).to.equal(200)
        expect(res3.result).to.have.length(2)

        await server.stop()
    })
})
