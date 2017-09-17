# Cajita Caliente
### By: Claudia Vargas, Maria Monteiro, & Chris Kennelly

The back end of this project was quite a challenge. Building everything out in express for mongoDB was something that none of us had done before and ended up beaing a ton of fun (when it wasn't frustrating).

We still haven't figured out exactly how to download correctly, but we'll get it.

Must bundle install.

## Tech
- Express.js and MongoDB

## Routes

| Prefix                   | Verb   | URI Pattern                                           | Controller#Action  |
|--------------------------|--------|-------------------------------------------------------|--------------------|
| sign_up                  | POST   | /sign-up                                              | users#signup       |
| sign_in                  | POST   | /sign_in                                              | users#signin       |
|                          | DELETE | /sign_out/:id                                         | users#signout      |
|                          | PATCH  | /change_password/:id                                  | users#changepw     |
| Files                    | GET    | /files                                                | files#index        |
|                          | PATCH  | /files/:id                                            | files#update       |
|                          | DELETE | /files/:id                                            | files#destroy      |
|                          | POST   | /files                                                | files#create       |


## Planning
# ERD
- (https://i.imgur.com/H88iDzf.png)


## Links

- Back-end Repository: https://github.com/cajita-caliente/cajita-caliente-api
- Front-end Repository: https://github.com/cajita-caliente/cajita-caliente-frontend
- Back-end Deployed:
- Front-end Deployed:


[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
