class Genshin {
    static #title = "Genshin Impact"
    static #api_base = "https://sg-hk4e-api.hoyolab.com/event/sol"
    static #act_id = "e202102251931481"
    static #url = "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481"
    static #chronicle = "https://sg-public-api.hoyolab.com/event/game_record/genshin/api"
    
    /**
     * Get an overview of the player's game data.
     * @param {string} server The server the player is on.
     * @param {number} uid The user id of the player being searched for.
     * @param {string} cookies User cookies to authenticate request.
     * @returns {Promise} An overview of the player's game data.
     */
    static async overview(server, uid, cookies) {
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/index?avatar_list_type=1&server=${server}&role_id=${uid}`, {
            method: 'GET',
            headers: requestHeader
        })

        const json = await response.json()

        return json
    }

    /**
     * Gets the player's character data for genshin impact.
     * @param {string} server The server the player is on.
     * @param {number} uid The user id of the player being searched for.
     * @param {string} cookies User cookies to authenticate request.
     * @returns {Promise} Data of all characters owned by the specified player.
     */
    static async characters(server, uid, cookies){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/character/list?server=${server}&role_id=${uid}`, {
            method: 'POST',
            headers: requestHeader
        })

        const json = await response.json()

        return json
    }

    /**
     * Get detailed information of a user's owned character.
     * @param {string} server The server the player is on.
     * @param {number} uid The user id of the player being searched for.
     * @param {number} character_id The character id of the character being searched for.
     * @param {string} cookies User cookies to authenticate request.
     * @returns {Promise} Detailed information of a user's owned character.
     */
    static async character_detailed(server, uid, character_id, cookies){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/character/detail?server=${server}&role_id=${uid}&character_id=${character_id}`, {
            method: 'POST',
            headers: requestHeader
        })

        const json = await response.json()

        return json
    }

    /**
     * Attempts daily check-in for the specified game given the users cookies.
     * @param {string} cookies User cookies to authenticate request.
     * @param {string} lang Language to use for the check-in response.
     * @returns {Promise} Check-in response.
     */
    static async check_in(cookies, lang = 'en-us'){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 4000))
        
        const info = await fetch(`${Genshin.#api_base}/info?lang=${lang}&act_id=${Genshin.#act_id}`, {
            method: 'GET',
            headers: requestHeader
        })
        const infoJson = await info.json()

        if(infoJson.retcode !== 0) return `Failed to get check-in info: ${infoJson.message}`

        if(info.data.first_bind === 1) return `Please check-in manually at least once`

        home = await fetch(`${Genshin.#api_base}/home?lang=${lang}&act_id=${Genshin.#act_id}`, {
            method: 'GET',
            headers: requestHeader
        })
        const homeJson = await home.json()

        if(homeJson.data.is_sign === 1){
            obtained_rewards = homeJson.data.awards[infoJson.data.total_sign_day - 1]
            return `Already checked in today for Genshin Impact.\n`,
            `You received: ${obtained_rewards.name} x${obtained_rewards.cnt}.\n`,
            `Total check-ins: ${infoJson.data.total_sign_day}.`
        }
        
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 4000))

        sign = await fetch(`${Genshin.#api_base}/sign?lang=${lang}&act_id=${Genshin.#act_id}`, {
            method: 'POST',
            headers: requestHeader
        })
        const signJson = await sign.json()

        new_info = await fetch(`${Genshin.#api_base}/info?lang=${lang}&act_id=${Genshin.#act_id}`, {
            method: 'GET',
            headers: requestHeader
        })
        const newInfoJson = await new_info.json()

        if(newInfoJson.retcode !== 0) return `Failed to get check-in info: ${newInfoJson.message}`
        if(newInfoJson.data.is_sign !== 0) return `Failed to check-in: ${signJson.message}`

        obtained_rewards = homeJson.data.awards[newInfoJson.data.total_sign_day - 1]
        return `Successfully checked in for Genshin Impact.\n`,
        `You received: ${obtained_rewards.name} x${obtained_rewards.cnt}.\n`,
        `Total check-ins: ${newInfoJson.data.total_sign_day}.`
    }

    /**
     * Get the player's spiral abyss data for genshin impact.
     * @param {string} server 
     * @param {number} uid 
     * @param {string} cookies 
     * @returns {Promise} Data of the player's spiral abyss progress.
     */
    static async act_calender(server, uid, cookies){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/act_calender`, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                "role_id": uid,
                "server": server,
                "lang": "en-us"
            })
        })

        console.log(response)

        const json = await response.json()

        return json
    }

    /**
     * Get the player's spiral abyss data for genshin impact.
     * @param {string} server 
     * @param {number} uid 
     * @param {string} cookies 
     */
    static async spiral_abyss(server, uid, cookies){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/spiralAbyss?server=${server}&role_id=${uid}&schedule_type=1`, {
            method: 'GET',
            headers: requestHeader
        })

        const json = await response.json()

        return json
    }

    /**
     * Get the player's imaginarium theatre data for genshin impact.
     * @param {string} server 
     * @param {number} uid 
     * @param {string} cookies 
     * @returns 
     */
    static async imaginarium_theatre(server, uid, cookies){
        let requestHeader = {
            'Cookie': cookies,
            'Origin': 'https://act.hoyolab.com',
            'Connection': 'keep-alive',
            'Referer': 'https://act.hoyolab.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-us,en;q=0.9',
            'x-rpc-language': 'en-us',
        }

        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        
        const response = await fetch(`${Genshin.#chronicle}/role_combat?server=${server}&role_id=${uid}&need_detail=false`, {
            method: 'GET',
            headers: requestHeader
        })

        const json = await response.json()

        return json
    }
}

export default Genshin