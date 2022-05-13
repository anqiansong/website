import { useEffect, useState } from 'react';

export default function useViews(item) {
  // Get all post views
  const title = item?.frontMatter?.title;

  const [views, setViews] = useState(0);

  useEffect(() => {
  }, []);

  return views;
}
