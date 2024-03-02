import { useState } from 'react';

import { BaseLayout } from '@/layouts/base-layout';
import { ImageInput } from '@/components/common/image-input';

const ColorsConverter = () => {
  const [image, setImage] = useState<string | null>(null);

  

  return (
    <BaseLayout>
      <ImageInput value={image} onChange={setImage} />

    </BaseLayout>
  );
}

export default ColorsConverter;
