# timer4slrc

Small application build for `Sri Lanka Robotic Challenge 2021`.
This application is for sync Timer persons and Live stream persons with Lap timing of the completions.
After build This project produce two `.exe` applications a client and admin. both can be intall in any windows pc and `Two apps are realtime synced via firebase`.
UIs are build with `Reactjs` and `Electron` is used to build `.exe` setups.

**Only Windows builds have been tested**

## timer-admin

Admin application can be used to enter three lap times (One Competitor has three attempts in SLRC)

## timer-client

## Changelog

- v1.4.0
  - Push to remote
- v1.5.0
  - Bump dependencies, env config

## Setup Guide

- This project requires a firebase realtime databse, hence set it up and have the variables ready.
- Setup nodejs and yarn v1.22.22 if not already
  - Install nodejs with your preferred method
  - Make sure you have yarn v1.22.22 setup
    - `which yarn` should return the path of yarn
    - else enable yarn using `corepack enable`
- Navigate to respective directory `cd timer-admin` or `cd timer-client`
- Setup .env files with firebase credentials
- `yarn install`
- `yarn build`
- `yarn build-electron` or `yarn build-electron:unix` _*build script for unix systems*_
- `yarn package`

### Acknowledgements

- https://github.com/ThusharaSampath/slrc-timer-client-and-admin
- https://github.com/sahithyandev/slrc-timer-client-and-admin/tree/fix-client-build
