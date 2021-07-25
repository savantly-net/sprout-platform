import { useMediaQuery } from '@chakra-ui/react';

export interface DeviceAttributes {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const useDevice = (): DeviceAttributes => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isTablet] = useMediaQuery('(max-width: 1024px)');
  const [isDesktop] = useMediaQuery('(min-width: 1025px)');

  return {isMobile, isTablet, isDesktop};
};

export default useDevice;