import { useMediaQuery } from 'react-responsive';
import { mediaQuerySizes } from '../styles/mixins/media';

export const useDesktopOrHigher = () => useMediaQuery({ minWidth: mediaQuerySizes.tablet });
