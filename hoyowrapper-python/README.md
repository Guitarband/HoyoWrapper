# HoyoWrapper

HoyoWrapper is a Python library designed to interact with HoYoverse's HoYoLab. It provides a simple and efficient way to access various endpoints and perform operations.

## Installation

To install HoyoWrapper, use pip:

```bash
pip install hoyowrapper
```

## Usage

Functions in HoyoWrapper are all asynchronous and need to be run using asyncio. Here is a basic example of how to use HoyoWrapper:

```python
from hoyowrapper import Tools, Genshin
import asyncio

user_cookies = asyncio.run(Tools.login())

# Example function call
response = asyncio.run(Genshin.check_in(user_cookies))
print(response)
```

## Available Functions

### `HoyoLab`

#### `get_user_info(self, user_id: str)`

Fetches information about a user.

- **Parameters:**
    - `user_id` (str): The ID of the user to fetch information for.
- **Returns:**
    - `dict`: A dictionary containing user information.

### `Genshin`

#### `act_calender(cookies: str) -> dict`

Retrieve the act calender for Genshin Impact.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the act calender.


#### `check_in(cookies: str, lang: str = "en-us") -> str`

Completes the daily check-in for Genshin Impact, giving rewards directly to the user's account

- **Parameters:**
    - `cookies` (str): The user's cookies, used to authenticate the request.
    - `lang` (str): The language to receive responses in.
- **Returns:**
    - `str`: A string containing the response from the check-in request.

#### `overview(server: str, uid: int, cookies: str) -> dict`

Retrieves an overview of the player's game data.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's game data.

#### `characters(server: str, uid: int, cookies: str) -> dict`

Retrieves data for every character owned by the specified player.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's character data.

#### `character_detailed(server: str, uid: int, character_id: int, cookies: str) -> dict`

Retrieves detailed information for a character owned by the user

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `character_id` (int) : The id of the character to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the character's data.

#### `spiral_abyss(server: str, uid: int, cookies: str) -> dict`

Get the player's spiral abyss data for genshin impact

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: Data of the player's spiral abyss progress.

#### `imaginarium_theatre(server: str, uid: int, cookies: str) -> dict`

Get the player's imaginarium theatre data for genshin impact

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: Data of the player's imaginarium theatre progress.

### `Star Rail`

#### `regions(cookies: str) -> dict`

Get a list of all regions for Honkai Star Rail.

- **Parameters:**
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's game data.

#### `act_calender(cookies: str) -> dict`

Retrieve the act calender for Honkai Star Rail.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the act calender.

#### `overview(server: str, uid: int, cookies: str) -> dict`

Retrieves an overview of the player's game data.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's game data.

#### `characters(server: str, uid: int, cookies: str) -> dict`

Retrieves data for every character owned by the specified player.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's character data.

#### `simulated_universe(server: str, uid: int, cookies: str) -> dict`

Retrieves data for divergent universe, simulated universe, and expansion module progress.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's progress data for simulated universe.

#### `treasures_lightward(server: str, uid: int, cookies: str) -> dict`

Retrieves data for forgotten hall, pure fiction, and apocalyptic shadow progress.

- **Parameters:**
    - `server` (str): The server name in which the account is saved
    - `uid` (int): The player id of the account to look for.
    - `cookies` (str): The user's cookies, used to authenticate the request.
- **Returns:**
    - `dict`: A dictionary containing the player's progress data for treasures lightward.

## Contributing

Contributions are welcome via pull requests. Please ensure your changes pass existing tests and follow the project's coding style and conventions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
