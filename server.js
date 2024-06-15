const path = require('path');
const express = require('express');
const routes = require('./controllers');
require('dotenv').config();
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const expressHandlebars = require('express-handlebars');
const hbs = expressHandlebars.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); 

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000,
    }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

