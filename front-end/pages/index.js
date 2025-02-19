import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Layout from "../components/Layout";
import HomeNotification from "../components/homePage/HomeNotification";
// Import Swiper styles
import HomeSlide from "@/components/homePage/HomeSlide";
import Banner1 from "@/public/assets/images/banner1.jpg";
import Banner2 from "@/public/assets/images/banner2.jpg";
import Keno1P from "@/public/assets/images/keno1p.png";
import Keno3P from "@/public/assets/images/keno3p.png";
import Keno5P from "@/public/assets/images/keno5p.png";
import XocDia1P from "@/public/assets/images/xocdia1p.png";
import XoSo3P from "@/public/assets/images/xoso3p.png";
import XoSo5P from "@/public/assets/images/xoso5p.png";
import XucXac1P from "@/public/assets/images/xucxac1p.png";
import XucXac3P from "@/public/assets/images/xucxac3p.png";
import Image from "next/image";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import SettingService from "@/services/admin/SettingService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LIST_SWIPER = [
  {
    desc: "Megalott",
    img: Banner1,
  },
  {
    desc: "Megalott",
    img: Banner2,
  },
];

const GameItem = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  background: "linear-gradient(124.32deg,#102d47 12.08%,#12304d 85.02%)",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
  "& .desc": {
    display: "flex",
    flexDirection: "column",

    "& .title-game": {
      color: theme.palette.text.primary,
      fontSize: "2rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    "& .desc-game": {
      color: theme.palette.text.primary,
      fontSize: "1.5rem",
    },
    "& .maintain": {
      color: "red",
      fontSize: "1.5rem",
    },
  },
  "& img": {
    height: "100%",
    width: "100%",
    maxWidth: "100px",
  },
}));

const Home = () => {
  const { t } = useTranslation("common");
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const res = await SettingService.getClient();
    setGames(res.data.data?.games ?? []);
  };

  useEffect(() => {
    getData();
  }, []);

  const LIST_GAME = [
    {
      title: t("LOTTERY 3M"),
      desc: t("Guess the number to win"),
      img: XoSo3P,
      link: "/games/xoso3p",
      active: games["xoso3P"] !== "inactive",
    },
    {
      title: t("LOTTERY 5M"),
      desc: t("Guess the number to win"),
      img: XoSo5P,
      link: "/games/xoso5p",
      active: games["xoso5P"] !== "inactive",
    },
    {
      title: t("KENO 1M"),
      desc: t("Guess the marbles to win"),
      img: Keno1P,
      link: "/games/keno1p",
      active: games["keno1P"] !== "inactive",
    },
    {
      title: t("KENO 3M"),
      desc: t("Guess the marbles to win"),
      img: Keno3P,
      link: "/games/keno3p",
      active: games["keno3P"] !== "inactive",
    },
    {
      title: t("KENO 5M"),
      desc: t("Guess the marbles to win"),
      img: Keno5P,
      link: "/games/keno5p",
      active: games["keno5P"] !== "inactive",
    },
    {
      title: t("DICE 1M"),
      desc: t("Guess the dice to win"),
      img: XucXac1P,
      link: "/games/xucxac1p",
      active: games["xucxac1P"] !== "inactive",
    },

    {
      title: t("DICE 3M"),
      desc: t("Guess the dice to win"),
      img: XucXac3P,
      link: "/games/xucxac3p",
      active: games["xucxac3P"] !== "inactive",
    },
    {
      title: t("DISH SHAKING 1M"),
      desc: t("Guess the marbles to win"),
      img: XocDia1P,
      link: "/games/xocdia1p",
      active: games["xocdia1P"] !== "inactive",
    },
  ];

  return (
    <>
      <Layout>
        <HomeSlide />

        <Box sx={{}}>
          <HomeNotification />
          <h2 className="title">Games</h2>
          {LIST_GAME.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (!item.active) {
                  toast.info(t("Game đang bảo trì"));
                  return;
                }
                router.push(item.link);
              }}
            >
              <GameItem>
                <Box className="desc">
                  <Typography className="title-game">{item.title}</Typography>
                  <Typography className="desc-game">{item.desc}</Typography>
                </Box>
                <div
                  style={{
                    position: "relative",
                    maxWidth: "10rem",
                    width: "100%",
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill={true}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </GameItem>
            </div>
          ))}
        </Box>
      </Layout>
    </>
  );
};

export default Home;
