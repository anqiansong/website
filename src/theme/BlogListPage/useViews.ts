import { useEffect, useState } from 'react';

export default function useViews(items) {
  const titles = items.map(({ content }) => {
    return content?.frontMatter?.title;
  });
  const [views, setViews] = useState<any>([]);
  useEffect(() => {
  }, []);

  return views;
}
