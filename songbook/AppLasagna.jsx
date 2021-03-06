import React from 'react'

import thunkMiddleware from 'redux-thunk'
import {combineReducers, applyMiddleware, compose} from 'redux'
import persistState from 'redux-localstorage'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {IntlProvider, addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import sk from 'react-intl/locale-data/sk'
import messages from '../translations/messages.yml'

import {Container, container_reducer} from './container'
import {my_theme, my_theme_night} from './theme'

///// INIT /////

export const init = (store) => {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();

    addLocaleData([...en, ...sk])
}

///// MIDDLEWARE /////

export const middleware = compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(hashHistory),
        createLogger({collapsed: true})
    ),
    persistState(['settings', 'current_book'])
)

///// COMPONENT /////

export const AppLasagna = ({store, routes, settings}) => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={settings.night_mode ? my_theme_night : my_theme}>
            <IntlProvider locale={settings.language} messages={messages[settings.language]}>
                <Router history={syncHistoryWithStore(hashHistory, store)}>
                    <Route component={Container}>
                        {routes.map(props => <Route key={props.name} path={props.path} component={props.component} {...props}/>)}
                    </Route>
                </Router>
            </IntlProvider>
        </MuiThemeProvider>
    </Provider>
)
AppLasagna.propTypes = {
    store:    React.PropTypes.object.isRequired,
    routes:   React.PropTypes.array.isRequired,
    settings: React.PropTypes.object.isRequired,
}
