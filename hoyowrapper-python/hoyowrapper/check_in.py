from requests import request
import random
import time
from constants import _constant_info
import asyncio

def check_in(game: str, cookie: str, lang: str = "en-us") -> dict:
    """
    Attempts daily check-in for the specified game given the users cookies.
    """
    if game not in _constant_info:
        raise ValueError(f"Invalid game: {game}")
    
    requestHeader = {
        'Cookie': cookie,
        'Origin': 'https://act.hoyolab.com',
        'Connection': 'keep-alive',
        'Referer': 'https://act.hoyolab.com/',
        'Accept-Encoding': 'gzip, deflate, br',
    }

    gameData = _constant_info[game]

    time.sleep(random.randint(1, 5))

    info = request("GET", f"{gameData['api_base']}/info?lang={lang}&act_id={gameData['act_id']}", headers=requestHeader).json()
    if info["retcode"] != 0:
        print(f"Failed to get info: {info['message']}")
        return
    
    rewards = request("GET", f"{gameData['api_base']}/home?lang={lang}&act_id={gameData['act_id']}", headers=requestHeader).json()
    
    if info["data"]["is_sign"]:
        obtained = rewards['data']['awards'][info['data']['total_sign_day'] - 1]
        resString = (f"Already checked-in today for {gameData['title']} \n"
              f"You received: {obtained['name']} x{obtained['cnt']} \n"
              f"Total check-in days: {info['data']['total_sign_day']}")
        print(resString)
        return
    
    if gameData["title"] == "Genshin Impact" and info["data"]["first_bind"]:
        print(f"Please manually check-in once for {gameData['title']}")
        return

    print(f"Checking-in for {gameData['title']}")

    time.sleep(random.randint(5, 10))

    response = request("POST", f"{gameData['api_base']}/sign?lang={lang}&act_id={gameData['act_id']}", headers=requestHeader).json()

    new_info = request("GET", f"{gameData['api_base']}/info?lang={lang}&act_id={gameData['act_id']}", headers=requestHeader).json()

    if new_info["retcode"] != 0:
        print(f"Failed to get info: {new_info['message']}")
        return
    
    if not new_info["data"]["is_sign"]:
        print(f"Failed to check-in: {response['message']}")
        return
    
    obtained_items = rewards['data']['awards'][new_info['data']['total_sign_day'] - 1]
    resString = (f"Successfully checked-in for {gameData['title']} \n"
              f"Rewards: {obtained_items['name']} x{obtained_items['cnt']} \n"
              f"Total check-in days: {info['data']['total_sign_day']}")
    print(resString)
    return
    
if __name__ == "__main__":
    from login import login
    #cookies = asyncio.run(login())
    cookies = "ltoken_v2=v2_CAISDGNlMXRidXdiMDB6axokNDNiY2QwMTYtYzlmMS00MzVjLThhNDQtZTVkYTkxNzdiNWFjILqk_rsGKOCW9VcwpYzAC0ILaGs0ZV9nbG9iYWw.OpJ_ZwAAAAAB.MEUCIDyJxis7Cna0eDAgev6KOvqsZunzUTzoR7HnV2HWeNMBAiEApiu9SfXIpeJjcTu1azYDjQR5Lw0r_bAhR9w7_FIA9zI; HYV_LOGIN_PLATFORM_LOAD_TIMEOUT={%22value%22:null}; ltuid_v2=24118821; ltmid_v2=10klbohy3q_hy; _ga_54PBK3QDF4=GS1.1.1736413735.1.0.1736413743.0.0.0; DEVICEFP=38d7f46d5306b; HYV_LOGIN_PLATFORM_OPTIONAL_AGREEMENT={%22content%22:[]}; _gat_gtag_UA_201411121_1=1; DEVICEFP_SEED_ID=854c7b0bcfaa3e2c; _gid=GA1.2.389882338.1736413737; _MHYUUID=1aa53733-faf8-48db-bba8-28f7aa0d5a98; _ga_T9HTWX7777=GS1.1.1736413735.1.0.1736413743.0.0.0; _ga=GA1.2.1550957374.1736413735; HYV_LOGIN_PLATFORM_TRACKING_MAP={%22sourceValue%22:%2276%22}; _HYVUUID=43bcd016-c9f1-435c-8a44-e5da9177b5ac; DEVICEFP_SEED_TIME=1736413734577; mi18nLang=en-us;"
    check_in("starrail", cookies)