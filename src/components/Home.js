import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TodayRandevular from "./TodayRandevular";
import GelecekRandevular from "./GelecekRandevular";
import Loading from "./Loading";

const Home = () => {
  const [hastalar, setHastalar] = useState([]);
  const [hastalarFetched, setHastalarFetched] = useState(false);
  const [randevular, setRandevular] = useState([]);
  const [randevularFetched, setRandevularFetched] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleIsDeleted = () => {
    setIsDeleted(!isDeleted);
  };
  useEffect(() => {
    const hastalarURL = `http://localhost:8000/hastalar`;
    const randevularURL = `http://localhost:8000/randevular`;
    axios
      .get(hastalarURL)
      .then((res) => {
        setHastalar(res.data);
        setHastalarFetched(true);
      })
      .catch((err) => console.log(err));
    axios
      .get(randevularURL)
      .then((res) => {
        setRandevular(res.data);
        setRandevularFetched(true);
      })
      .catch((err) => console.log(err));
  }, [isDeleted]);
  return (
    <div>
      {hastalarFetched && randevularFetched ? (
        <>
          <div className="button-container mt-2 container">
            <Link
              to={{
                pathname: "/randevu-ekle",
                hastalar: hastalar,
                randevular: randevular,
              }}
              className="waves-effect waves-light btn red"
            >
              Randevu Ekle
            </Link>
          </div>
          <TodayRandevular
            hastalar={hastalar}
            randevular={randevular}
            handleIsDeleted={handleIsDeleted}
          />
          <GelecekRandevular
            hastalar={hastalar}
            randevular={randevular}
            handleIsDeleted={handleIsDeleted}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
