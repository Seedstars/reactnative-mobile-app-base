import {
    Dimensions
} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Full Screen Container
export const CONTAINER_DISTANCE_TOP = 47;
export const CONTAINER_DISTANCE_SIDE = 32;
export const CONTAINER_WIDTH = SCREEN_WIDTH - (CONTAINER_DISTANCE_SIDE * 30);
