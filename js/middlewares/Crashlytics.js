import { Crashlytics } from 'react-native-fabric';
import sizeOf from 'js-sizeof';

const actions = [];

export default function crashlyticsLogger() {
    return (next) => {
        return (action) => {
            actions.push(action);
            if (actions.length > 20) {
                actions.shift();
            }

            actions.forEach((act, idx) => {
                let actionObject = JSON.stringify(act);
                if (act.type && sizeOf(actionObject) > 950) { // Crashlytics setString only allows for 1kb keypairs
                    actionObject = JSON.stringify({ type: act.type, payload: 'Too big for Crashlytics' });
                }

                Crashlytics.setString(`action${actions.length - idx}`, actionObject);
            });

            return next(action);
        };
    };
}
