import { NextSeo, ArticleJsonLd, ProductJsonLd } from 'next-seo'
import siteMetadata from '../../data/siteMetadata.json'
import moment from "moment";

export const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.title,
        width: 1200,
        height: 600,
      },
    ],
  },
  //   twitter: {
  //     handle: siteMetadata.twitter,
  //     site: siteMetadata.twitter,
  //     cardType: 'summary_large_image',
  //   },
  //   additionalMetaTags: [
  //     {
  //       name: 'author',
  //       content: siteMetadata.author,
  //     },
  //   ],
}

export const PageSeo = ({ title, description, url }) => {
  return (
    <NextSeo
      title={`${title} – ${siteMetadata.title}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
      }}
    />
  )
}

export const ProductSeo = ({ title, summary, url, images = [], product }) => {
  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
        ? [images]
        : images

  const featuredImages = imagesArr.map((img) => {
    return {
      url: `${process.env.BASE_IMAGE}/product/${product?._id}/${img.url}}`,
      alt: title,
    }
  })
  console.log('featurd', featuredImages)
  return (
    <>
      <NextSeo
        title={`${title} – ${siteMetadata.title}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'website',
          url,
          title,
          description: summary,
          images: featuredImages,
        }}
      />
      <ProductJsonLd
        productName={product.title}
        images={featuredImages}
        description={summary}
        brand={siteMetadata.titleCompany}
        color={product.color[0]}
        manufacturerName={siteMetadata.titleCompany}
        manufacturerLogo={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`}
        material={[product.description?.fabric]}
        slogan={siteMetadata.slogan}
        releaseDate={moment(product.careatedAt).format()}
        // reviews={[
        //   {
        //     author: 'Jim',
        //     datePublished: '2017-01-06T03:37:40Z',
        //     reviewBody:
        //       'This is my favorite product yet! Thanks Nate for the example products and reviews.',
        //     name: 'So awesome!!!',
        //     reviewRating: {
        //       bestRating: '5',
        //       ratingValue: '5',
        //       worstRating: '1',
        //     },
        //     publisher: {
        //       type: 'Organization',
        //       name: 'TwoVit',
        //     },
        //   },
        // ]}
        // aggregateRating={{
        //   ratingValue: '4.4',
        //   reviewCount: '89',
        // }}
        offers={[
          {
            price: `${product.price}`,
            priceCurrency: "INR",
            // priceValidUntil: '2020-11-05',
            // itemCondition: 'https://schema.org/UsedCondition',
            // availability: 'https://schema.org/InStock',
            url: `${siteMetadata.siteUrl}/products/${product.slug}`,
            seller: {
              name: siteMetadata.titleCompany,
            },
          },
        ]}
      />
    </>
  )
}
