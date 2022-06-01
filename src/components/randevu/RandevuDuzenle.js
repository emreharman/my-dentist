import React, { useState } from "react";
import axios from "axios";

const RandevuDuzenle = (props) => {
  const hasta = props.location.hasta;
  const randevu = props.location.randevu;
  const [sikayet, setSikayet] = useState(randevu.sikayet);
  const day = String(randevu.tarih.gun);
  const month = String(randevu.tarih.ay);
  const year = String(randevu.tarih.yil);
  const date = day + "." + month + "." + year;
  const [tarih, setTarih] = useState(date);
  const [saat, setSaat] = useState(randevu.saat);
  const [tedavi, setTedavi] = useState(randevu.uygulananTedavi);
  const [isSubmit, setIsSubmit] = useState(false);

  if (isSubmit) {
    props.history.push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const splitedDate = tarih.split("-");
    const yil = parseInt(splitedDate[0]);
    const ay = parseInt(splitedDate[1]);
    const gun = parseInt(splitedDate[2]);
    const putRandevu = {
      id: randevu.id,
      tarih: {
        gun: gun,
        ay: ay,
        yil: yil,
      },
      saat: saat,
      sikayet: sikayet,
      uygulananTedavi: tedavi,
      hastaId: hasta.id,
    };
    axios
      .put(`http://localhost:8000/randevular/${randevu.id}`, putRandevu)
      .then((res) => {
        console.log(res);
        setIsSubmit(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h4 className="text-center mt-2">Randevu Düzenle</h4>
      <form onSubmit={handleSubmit} className="mt-2 container">
        <div className="row">
          <div className="col s6">
            <label htmlFor="name">İsim</label>
            <input type="text" disabled value={hasta.name} />
          </div>
          <div className="col s6">
            <label htmlFor="surname">Soyisim</label>
            <input type="text" disabled value={hasta.surname} />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="telNo">Telefon</label>
            <input type="tel" disabled value={hasta.telNo} />
          </div>
          <div className="col s6">
            <label htmlFor="sikayet">Şikayet</label>
            <input
              type="text"
              value={sikayet}
              onChange={(e) => setSikayet(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="tarih">Tarih (Önceki tarih {tarih})</label>
            <input
              type="date"
              required
              value={tarih}
              onChange={(e) => setTarih(e.target.value)}
            />
          </div>
          <div className="col s6">
            <label htmlFor="saat">Saat</label>
            <input
              type="time"
              required
              value={saat}
              onChange={(e) => setSaat(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <label htmlFor="tedavi">Uygulanan Tedavi</label>
            <input
              type="text"
              value={tedavi}
              onChange={(e) => setTedavi(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row form-button-container">
          <button className="waves-effect waves-light btn red">Kaydet</button>
        </div>
        {isSubmit ? (
          <div className="row">
            <div
              class="card-panel red lighten-2 text-center"
              style={{ color: "white" }}
            >
              Kayıt Başarılı
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default RandevuDuzenle;
