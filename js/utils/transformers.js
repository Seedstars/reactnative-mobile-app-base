import moment from 'moment';

export const phoneNumberTransformer = {
    format: (value) => {
        return value;
    },
    parse: (phoneNumber) => {
        const phone = typeof phoneNumber !== 'undefined' ? phoneNumber : '';
        const internationalPhoneNumber = phone.startsWith('00') ? phone.replace(/^00/, '+') : phone;
        return internationalPhoneNumber.replace(/\s/g, '');
    }
};


export const dateFieldTransformer = {
    format: (value) => {
        return value ? moment(value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    },
    parse: (str) => {
        return str ? new Date(str) : null;
    }
};
