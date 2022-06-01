import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GelecekRandevular = ({ hastalar, randevular, handleIsDeleted }) => {
  const filteredRandevular = randevular.filter((randevu) => {
    if (
      randevu.tarih.gun > new Date().getDate() &&
      randevu.tarih.ay >= new Date().getMonth() + 1 &&
      randevu.tarih.yil >= new Date().getFullYear()
    ) {
      return true;
    }
  });
  const handleDelete = (randevu) => {
    axios
      .delete(`http://localhost:8000/randevular/${randevu.id}`)
      .then((res) => {
        console.log(res);
        handleIsDeleted();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h4 className="text-center mt-2">Gelecek Randevular</h4>
      <table className="striped centered">
        <thead>
          <tr>
            <th>Adı Soyadı</th>
            <th>Telefon</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Şikayet</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filteredRandevular.length > 0 ? (
            filteredRandevular.map((randevu) => {
              const filteredHasta = hastalar.find((hasta) => {
                if (hasta.id === randevu.hastaId) {
                  return hasta;
                }
              });
              return (
                <tr key={randevu.id}>
                  <td>
                    {filteredHasta.name} {filteredHasta.surname}
                  </td>
                  <td>{filteredHasta.telNo}</td>
                  <td>
                    {randevu.tarih.gun}.{randevu.tarih.ay}.{randevu.tarih.yil}
                  </td>
                  <td>{randevu.saat}</td>
                  <td>{randevu.sikayet}</td>
                  <td>
                    <button
                      className="waves-effect waves-light btn-small red"
                      onClick={() => handleDelete(randevu)}
                    >
                      Sil
                    </button>
                    <Link
                      to={{
                        pathname: "/randevu-duzenle",
                        randevu: randevu,
                        hasta: filteredHasta,
                      }}
                      className="waves-effect waves-light btn-small light-blue lighten-3 ml-1"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">Henüz Randevu Yok</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GelecekRandevular;
