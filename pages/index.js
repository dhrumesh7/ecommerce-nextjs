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

export default function Home({ newArrivals, topSellers, categories }) {
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

      <Carousel images={[{ src: "saree-primary.webp", link: '/collections/saree' }]} />
      <ContainerStyled>
        <div data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-once="true">
          <ProductListGrid
            title={'NEW ARRIVAL'} products={newArrivals} />
        </div>
      </ContainerStyled>

      <div style={{ margin: "40px 0" }}>
        <Carousel images={[{ src: "/banner1.webp", link: '/collections/saree' }]} />
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
      <div style={{display : 'flex', justifyContent : 'space-evenly', gap: '10px', margin : '50px 15px'}}>
                <div style={{display : 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={'/cm.jpg'} alt='' style={{maxWidth: '100%'}} />
                  <p>Check</p>
                </div>
                <div style={{display : 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={'/cm.jpg'} alt='' style={{maxWidth: '100%'}} />
                  <p>Check</p>
                </div>
                <div style={{display : 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={'/cm.jpg'} alt='' style={{maxWidth: '100%'}} />
                  <p>Check</p>
                </div>
                <div style={{display : 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={'/cm.jpg'} alt='' style={{maxWidth: '100%'}} />
                  <p>Check</p>
                </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let newArrivals = [];
  let topSellers = [];
  let categories = [];

  try {
    const data = await fetch(
      `${process.env.BACKEND_URL}/products/home`
    );
    const response = await data.json();
    newArrivals = response?.data?.newArrivals;
    topSellers = response?.data?.topSellers;
    categories = response?.data?.categories;

  } catch (error) {
    console.log('err', error)
  }

  return {
    props: {
      newArrivals,
      topSellers,
      categories
    },
    revalidate: 60
  }
}
