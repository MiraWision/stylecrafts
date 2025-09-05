import React, { useMemo } from 'react';

import { getToolCrossLinks } from './tool-links';

import { CrossLinks } from './cross-links';

interface Props {
  toolKey: string;
  title?: string;
  dynamicData?: any;
  className?: string;
}

const ToolCrossLinks: React.FC<Props> = ({ 
  toolKey, 
  title = "Explore More Tools", 
  dynamicData,
  className 
}) => {
  const links = useMemo(() => getToolCrossLinks(toolKey, dynamicData), [toolKey, dynamicData]);
  
  if (!links || links.length === 0) return null;

  return (
    <CrossLinks
      title={title}
      links={links}
      className={className}
    />
  );
};

export { ToolCrossLinks };
