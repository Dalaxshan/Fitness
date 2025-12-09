import Image from 'next/image';
import LogoImage from 'public/trainyard-color-logo.png';

export const Logo = ({ width = 100 }) => {
  return (
    <Image
      alt='Trainyard Logo'
      priority={true}
      src={LogoImage}
      width={width}
    />
  );
};
