import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const HastaIslemleri = (props) => {
  const [hastalar, setHastalar] = useState([]);
  const [hastalarFetched, setHastalarFetched] = useState(false);
  const [randevular, setRandevular] = useState([]);
  const [randevularFetched, setRandevularFetched] = useState(false);
  const [isHastaDeleted, setIsHastaDeleted] = useState(false);
  const [isRandevularDeleted, setIsRandevularDeleted] = useState(false);

  if (isHastaDeleted && isRandevularDeleted) {
    setIsRandevularDeleted(false);
    setIsHastaDeleted(false);
    props.history.push("/");
  }
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
  }, [isHastaDeleted, isRandevularDeleted]);
  const handleDelete = (hasta, randevular) => {
    axios
      .delete(`http://localhost:8000/hastalar/${hasta.id}`)
      .then((res) => {
        setIsHastaDeleted(true);
        deleteRandevular(randevular);
      })
      .catch((err) => console.log(err));
  };
  const deleteRandevular = (randevular) => {
    randevular.map((randevu) => {
      axios
        .delete(`http://localhost:8000/randevular/${randevu.id}`)
        .then((res) => {
          setIsRandevularDeleted(true);
        })
        .catch((err) => console.log(err));
    });
  };
  return (
    <div>
      <h4 className="text-center mt-2">Hasta İşlemleri</h4>
      {hastalarFetched && randevularFetched ? (
        <>
          <table className="striped centered mt-2" style={{ padding: "20px" }}>
            <thead>
              <tr>
                <th>Adı Soyadı</th>
                <th>Telefon</th>
                <th>Doğum Tarihi</th>
                <th>Geldiği Randevu Sayısı</th>
                <th>Adres</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {hastalar.map((hasta) => {
                const filteredRandevular = randevular.filter((randevu) => {
                  if (randevu.hastaId === hasta.id) {
                    return true;
                  }
                });
                const adres = `${hasta.adres.aciklama} ${hasta.adres.ilce}/${hasta.adres.sehir}`;
                return (
                  <tr key={hasta.id}>
                    <td>
                      {hasta.name} {hasta.surname}
                    </td>
                    <td>{hasta.telNo}</td>
                    <td>
                      {hasta.dogumTarihi === ""
                        ? "Girilmedi"
                        : hasta.dogumTarihi}
                    </td>
                    <td>{filteredRandevular.length}</td>
                    <td style={{ fontSize: "0.7rem" }}>
                      {adres === " /" ? "Girilmedi" : adres}
                    </td>
                    <td>
                      <button
                        className="waves-effect waves-light btn-small red islemler-button"
                        onClick={() => handleDelete(hasta, filteredRandevular)}
                      >
                        Sil
                      </button>
                      <Link
                        to={{
                          pathname: "/hasta-randevu-detay",
                          randevular: filteredRandevular,
                          hasta: hasta,
                        }}
                        className="waves-effect waves-light btn-small orange lighten-3 ml-1 islemler-button"
                      >
                        Randevu Detay
                      </Link>
                      <Link
                        to={{
                          pathname: "/hasta-guncelle",
                          randevular: filteredRandevular,
                          hasta: hasta,
                        }}
                        className="waves-effect waves-light btn-small light-blue lighten-3 ml-1 islemler-button"
                      >
                        Güncelle
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default HastaIslemleri;
