const { url } = require("../models/url");

async function shortenUrl(req,res) {
    const body = req.body;
    const longUrl = req.body.long_url;
    
    const shortUrl = generateShortUrl(longUrl);
    console.log(`shorturl: ${shortUrl}`);

    const getUrl = await url.findOne({
        longUrl: longUrl
    });

    if(getUrl) {
        return res.json({
            "data": getUrl.shortUrl,
            "message" : "already exists",
        });
    }
    
    const newUrl = await url.create({
        longUrl: longUrl,
        shortUrl: shortUrl,
        visitHistory: [],
    });

    return res.json({
        "data" : newUrl,
        "message" : "success",
    });
}

function generateShortUrl(longUrl) {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    const charactersLength = characters.length;

    for(let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function redirectToUrl(req, res) {
    const id = req.params.id;
    const entry = await url.findOneAndUpdate({
        shortUrl: id,
    }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        }
    }
    });

    console.log(entry);

    res.redirect(entry.longUrl);
}

module.exports = {
    shortenUrl,
    redirectToUrl,
};