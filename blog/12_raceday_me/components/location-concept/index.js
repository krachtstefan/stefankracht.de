// this wrapper file is needed to make make use of dynamic imports inside a mdx file
// otherwise the rss creation script would throw an error
import dynamic from 'next/dynamic';

const LocationConcept = dynamic(() => import('./Location-concept'), {
  ssr: false,
});

let LocationConceptWrapper = () => {
  return <LocationConcept />;
};

export default LocationConceptWrapper;
