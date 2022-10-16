# Conference Compass Assignment

A 2 tab App built using React Native and Expo to view conferences.

## To run:

```
npm install
npx expo start
```
Open Expo go on your device and connect to the local metro bundler server that hosts the app

## Description

There are two screens, the program and now screen.

On the "Program" screen, users have the ability to select a date (Tuesday, Wednesday, Thursday). Events on that date are shown in their sessions, where the user can scroll horizontally to change the selected Session. The selected session's title is shown at the top of the page. The user has the ability to filter by event locations, where all event's with matching location names will be shown.

The "Now" screen lists all events on the selected day, automatically scrolling to the first event that is occurring now. All events that are occurring now are highlighted.

### Mockup

![Alt text](ScreenShots/Mockup.png?raw=true "Mockup")

## Known Issues

- Session pagination doesn't reset to 0 when a day is changed.
- Filters re-render on press, resetting scroll

## Technologies used

- State Management: ZuStand
- Navigation: React Navigation
- Data and Time: Dayjs
