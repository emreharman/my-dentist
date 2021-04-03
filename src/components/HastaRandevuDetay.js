import React from "react";
import { Link } from "react-router-dom";

const HastaRandevuDetay = (props) => {
  const hasta = props.location.hasta;
  const randevular = props.location.randevular;
  return (
    <div className="container">
      <h4 className="text-center mt-2">
        {hasta.name} {hasta.surname} Randevuları
      </h4>
      <table className="striped centered">
        <thead>
          <tr>
            <th>Randevu Tarihi</th>
            <th>Randevu Saati</th>
            <th>Şikayeti</th>
            <th>Uyglanan Tedavi</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {randevular.map((randevu) => {
            return (
              <tr key={randevu.id}>
                <td>
                  {randevu.tarih.gun}.{randevu.tarih.ay}.{randevu.tarih.yil}
                </td>
                <td>{randevu.saat}</td>
                <td>{randevu.sikayet}</td>
                <td>
                  {randevu.uygulananTedavi === ""
                    ? "Tedavi Girilmedi"
                    : randevu.uygulananTedavi}
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/randevu-duzenle",
                      randevu: randevu,
                      hasta: hasta,
                    }}
                    className="waves-effect waves-light btn-small light-blue lighten-3 ml-1"
                  >
                    Düzenle
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HastaRandevuDetay;
