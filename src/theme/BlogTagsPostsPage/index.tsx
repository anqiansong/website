import React from 'react';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from "@docusaurus/core/lib/client/exports/useBaseUrl";


function pluralize(count, word) {
  return count > 1 ? `${word}s` : word;
}

function BlogTagsPostPage(props) {
  const { metadata, items, sidebar } = props;
  const { allTagsPath, name: tagName, count } = metadata;

  const i18nTitle = translate({
    id: 'blogtagpage.title',
    message: `下的博客`,
    description: 'blog tag page title',
  });

  const i18nTitleAlt = translate({
    id: 'blogtagpage.title.alt',
    message: ``,
    description: 'blog tag page title in alternate order',
  });

  const i18nDescription = translate({
    id: 'blogtagpage.description',
    message: `博客标签`,
    description: 'blog tag page description',
  });

  return (
    <Layout title={`${i18nTitleAlt} ${tagName} ${i18nTitle}`} description={`${i18nDescription} - "${tagName}"`} wrapperClassName='blog-wrapper'>
      <div className='container margin-vert--lg'>
        <div className='row blog-tags__page'>
          <main className='col col--12'>
            <h1>
              {tagName}： {count}{' '}
              <Translate id='blogtagpage.count.label' description='blog page count label'>
                篇
              </Translate>
            </h1>
            <Link href={allTagsPath}>
              <Translate id='blogtagpage.seeall.label' description='blog page see all label'>
                查看所有标签（分类）
              </Translate>
            </Link>
            <div className='margin-vert--xl'>
              {items.map(({ content: BlogPostContent }) => (
                <BlogPostItem
                  key={BlogPostContent.metadata.permalink}
                  frontMatter={BlogPostContent.frontMatter}
                  metadata={BlogPostContent.metadata}
                  truncated
                  assets={{authorsImageUrls:[useBaseUrl("@site/static/img/logo.webp")]}}
                >
                  <BlogPostContent />
                </BlogPostItem>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default BlogTagsPostPage;
