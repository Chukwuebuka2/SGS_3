const express = require('express');
const authRoute = require('./auth.route');
const eventRoute = require('./event.route');
const attendeeRoute = require('./attendee.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  }, 
  {
    path: '/events',
    route: eventRoute
  },
  {
    path: '/attendees',
    route: attendeeRoute
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
