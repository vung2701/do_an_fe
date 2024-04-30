import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, HashNavigation, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TypeSpotlight } from '../../../types';
import { concatLinkImageNoMedia } from '../../../types/utils';
import './styles.css';

const SpotlightItems = ({
  spotlight_image,
  spotlight_title,
  item_id,
  category
}: TypeSpotlight) => {
  return (
    <Box className="container-items">
      <Link to={category == 'Post' ? `posts/${item_id}` : `articles/${item_id}`}>
        <div className="content-items">
          <h2>{spotlight_title}</h2>
        </div>
        <div className="iamge-spotlight">
          <img
            loading="lazy"
            src={concatLinkImageNoMedia(spotlight_image)}
            alt="spot light"
          />
        </div>
      </Link>
    </Box>
  );
};

export default function Spotlight({ spotlight }: { spotlight: TypeSpotlight[] }) {
  return (
    <>
      <Box className="containerSpotlight">
        <Swiper
          spaceBetween={30}
          hashNavigation={{
            watchState: true
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation, HashNavigation]}
          className="swiperSpotlight"
        >
          {spotlight?.length > 0 &&
            spotlight?.map((item: TypeSpotlight) => (
              <SwiperSlide key={item?.item_id}>
                <SpotlightItems
                  item_id={item?.item_id}
                  spotlight_image={item?.spotlight_image}
                  spotlight_title={item?.spotlight_title}
                  category={item?.category}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </>
  );
}
