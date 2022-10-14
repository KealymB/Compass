# Conference Compass Assignment

A 2 tab App built using React Native and Expo to view conferences.

## To run:

npm install
npx expo start
connect to metro bundler using Expo Go app

## Known Issues

- Session pagination doesn't reset to 0 when a day is changed.
- Filters re-render on press, resetting scroll
- When fetching the devices time, doesn't take into account their time zone.

## Technologies used

- Animations: Moti
- State Management: ZuStand
- Navigation: React Navigation
- Data and Time: Dayjs

## How it was built

Designed the UI in Figma.
JSON data hosted in a Github repo to simulate API calls.
Implemented GitHub action to automatically push update to Expo Go Client
