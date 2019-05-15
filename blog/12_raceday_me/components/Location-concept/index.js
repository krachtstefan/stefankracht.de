import dynamic from 'next/dynamic';

const HelloBundle = dynamic(() => import('./Location-concept'), { ssr: false });

let Test = () => {
  return <HelloBundle />;
};

export default Test;
