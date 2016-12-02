import moment from 'moment';

const t = require('tcomb-form-native');

export const validateEmail = t.refinement(t.String, (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.replace(/\s/g, '')); // eslint-disable-line
});

export const PhoneNumber = t.refinement(t.String, (phoneNumber) => {
    return /^\+[1-9]\d{7,15}$/.test(phoneNumber.replace(/\s/g, ''));
});

export const validateDate = t.refinement(t.Date, (date) => {
    const todayDate = new Date();
    const dayOfToday = moment(date).day();
    return date >= todayDate && dayOfToday !== 0;
});

export const validatePassword = t.refinement(t.String, (password) => {
    return /^([a-zA-Z0-9_-]){6,}$/.test(password.replace(/\s/g, ''));
});
