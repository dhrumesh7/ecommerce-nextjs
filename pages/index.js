import Head from "next/head";
import ProductListGrid from "../components/productList/productListGrid";
import Carousel from "../components/carousel";
import CategoryListGrid from "../components/productList/categoryList";
import { ContainerStyled } from "../components/Styled";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import siteMetadata from '../data/siteMetadata.json'
import { PageSeo } from "../components/SEO";

export default function Home({ newArrivals, topSellers, categories, banners }) {
  const topBanners = banners.find(banner => banner.type === 'top_banner');
  const secondBanners = banners.find(banner => banner.type === 'second_banner');

  const topSlider = topBanners.image.map(banner => {
    return {
      src: `${process.env.BASE_IMAGE}/banner/${topBanners._id}/${banner.url}`,
      link: '/collections/saree'
    }
  })?.sort((a, b) => a.order - b.order);

  const secondSlider = secondBanners.image.map(banner => {
    return {
      src: `${process.env.BASE_IMAGE}/banner/${secondBanners._id}/${banner.url}`,
      link: '/collections/saree'
    }
  })?.sort((a, b) => a.order - b.order);

  console.log(topSlider)
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <PageSeo
        title={'The Online Fashion Store'}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />

      <Carousel images={topSlider} />
      <ContainerStyled>
        <div data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-once="true">
          <ProductListGrid
            title={'NEW ARRIVAL'} products={newArrivals} />
        </div>
      </ContainerStyled>

      <div style={{ margin: "40px 0" }}>
        <Carousel images={secondSlider} />
        <ContainerStyled>
          <div data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true">
            <ProductListGrid title={'TOP SELLER'} products={topSellers} />
          </div>
          <div data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true">
            <CategoryListGrid title={'CATEGORY'} categories={categories} />
          </div>
        </ContainerStyled>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-once="true"
        style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px', margin: '50px 15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/free-delivery.png'} alt='' style={{ maxWidth: '100%' }} />
          <p style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }} >free shipping</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/quality-assurance.png'} alt='' style={{ maxWidth: '100%' }} />
          <p style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }} >Assured quality</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/credit-card.png'} alt='' style={{ maxWidth: '100%' }} />
          <p style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }} >Secure payment</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/insurance.png'} alt='' style={{ maxWidth: '100%' }} />
          <p style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }} > Purchase protection</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/discount.png'} alt='' style={{ maxWidth: '100%' }} />
          <p style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }} >Best price promise</p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let newArrivals = [];
  let topSellers = [];
  let categories = [];
  let banners = [];


  try {
    const bannerData = await fetch(
      `${process.env.BACKEND_URL}/banner`
    );

    const data = await fetch(
      `${process.env.BACKEND_URL}/products/home`
    );
    const bannerResponse = await bannerData.json();
    const response = await data.json();

    newArrivals = response?.data?.newArrivals;
    topSellers = response?.data?.topSellers;
    categories = response?.data?.categories;
    banners = bannerResponse?.data

  } catch (error) {
    console.log('err', error)
  }

  return {
    props: {
      newArrivals,
      topSellers,
      categories,
      banners
    },
    revalidate: 60
  }
}
